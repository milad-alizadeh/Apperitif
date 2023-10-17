import { exec } from 'child_process'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Command } from 'commander'
import * as dotenv from 'dotenv'
import util from 'util'
import app from './app.config'
import eas from './eas.json'

dotenv.config({ path: `.env.local` })

// https://github.com/expo/sentry-expo/issues/319#issuecomment-1434954552
const promisifiedExec = util.promisify(exec)

const uploadAndroidSourceMap = async (updates: any) => {
  const appVersion = app().version

  const androidVersionCode = app().android?.versionCode
  const androidPackageName = app().android?.package
  const androidUpdateId = updates.find((update: any) => update.platform === 'android').id
  await promisifiedExec(`mv ./dist/bundles/android*.map ./dist/bundles/index.android.bundle`)
  const release = await promisifiedExec(`
        export SENTRY_AUTH_TOKEN=${process.env.SENTRY_AUTH_TOKEN} && \
        cross-env ./node_modules/@sentry/cli/bin/sentry-cli \
        releases \
        --org ${process.env.EXPO_PUBLIC_SENTRY_ORG} \
        --project ${process.env.EXPO_PUBLIC_SENTRY_PROJECT} \
        files ${androidPackageName}@${appVersion}+${androidVersionCode} \
        upload-sourcemaps \
        --dist ${androidUpdateId} \
        --rewrite \
        dist/bundles/index.android.bundle dist/bundles/android-*.map`)
  if (release.stderr) {
    console.error(release.stderr)
  } else {
    console.log(release.stdout)
  }
}

const uploadIosSourceMap = async (updates: any) => {
  const appVersion = app().version

  const iosBuildNumber = app().ios?.buildNumber
  const iosBundleID = app().ios?.bundleIdentifier
  const iosUpdateId = updates.find((update: any) => update.platform === 'ios').id
  await promisifiedExec(`mv ./dist/bundles/ios*.map ./dist/bundles/main.jsbundle`)
  console.log('iosUpdateId', app())
  const release = await promisifiedExec(`
        export SENTRY_AUTH_TOKEN=${process.env.SENTRY_AUTH_TOKEN} && \
        cross-env ./node_modules/@sentry/cli/bin/sentry-cli \
        releases \
        --org ${process.env.EXPO_PUBLIC_SENTRY_ORG} \
        --project ${process.env.EXPO_PUBLIC_SENTRY_PROJECT} \
        files ${iosBundleID}@${appVersion}+${iosBuildNumber} \
        upload-sourcemaps \
        --dist ${iosUpdateId} \
        --rewrite \
        dist/bundles/main.jsbundle dist/bundles/ios-*.map`)
  if (release.stderr) {
    console.error(release.stderr)
  } else {
    console.log(release.stdout)
  }
}

const program = new Command()
  .requiredOption('-p, --profile  [value]', 'EAS profile')
  .action(async (options) => {
    if (!Object.keys(eas.build).includes(options.profile)) {
      console.error('Profile must be includes in : ', Object.keys(eas.build))
    }
    const easBuild = eas.build[options.profile]
    const { channel } = easBuild

    const channelUpdates = await promisifiedExec(
      `eas update:list --branch ${channel} --non-interactive --json`,
    )
    if (channelUpdates.stderr) {
      console.error(channelUpdates.stderr)
    }

    // With update of web using now Metro, channelUpdates' creates 2 updates
    // Seemly web doesn't contain runtime and thus it is publishing
    // multiple update groups with the following message:
    // 👉 Since multiple runtime versions are defined, multiple update groups have been published.
    // For this reason the first element with 'android, ios' platforms will be found and the group gotten from it
    // TODO: As I understand sentry-expo doesn't work similarly for web with expo-router as Metro is used.
    const groupID = JSON.parse(channelUpdates.stdout).currentPage.find(
      (currentPage: any) => currentPage.platforms === 'android, ios',
    ).group
    const updates = await promisifiedExec(`eas update:view ${groupID} --json`)
    if (updates.stderr) {
      console.error(updates.stderr)
    }

    await uploadAndroidSourceMap(JSON.parse(updates.stdout))
    await uploadIosSourceMap(JSON.parse(updates.stdout))
  })

program.parse(process.argv)
