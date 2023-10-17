import { exec } from 'child_process'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Command } from 'commander'
import * as dotenv from 'dotenv'
import util from 'util'
import app from './app.config'
import eas from './eas.json'

dotenv.config({ path: `.env.local` })

const APP_VARIANT = process.env.APP_VARIANT
const BUNDLE_ID = `ai.bubblewrap.apperitif${APP_VARIANT ? `.${APP_VARIANT}` : ''}`

// https://github.com/expo/sentry-expo/issues/319#issuecomment-1434954552
const promisifiedExec = util.promisify(exec)

const uploadAndroidSourceMap = async (updates: any) => {
  const appVersion = app().version

  const androidVersionCode = app().android?.versionCode || 50
  const androidUpdateId = updates.find((update: any) => update.platform === 'android').id
  //   await promisifiedExec(`mv dist/bundles/android-*.hbc dist/bundles/index.android.bundle`)
  const release = await promisifiedExec(`
        export APP_VARIANT=${APP_VARIANT} \
        export SENTRY_AUTH_TOKEN=${process.env.SENTRY_AUTH_TOKEN} && \
        cross-env ./node_modules/@sentry/cli/bin/sentry-cli \
        releases \
        --org ${process.env.EXPO_PUBLIC_SENTRY_ORG} \
        --project ${process.env.EXPO_PUBLIC_SENTRY_PROJECT} \
        files ${BUNDLE_ID}@${appVersion}+${androidVersionCode} \
        upload-sourcemaps \
        --dist ${androidUpdateId} \
        --rewrite \
        dist/bundles/index.android.bundle dist/bundles/android-9263048ccc9db0e5ff878939f4aa1c9f.map`)

  if (release.stderr) {
    console.error(release.stderr)
  } else {
    console.log(release.stdout)
  }
}

const uploadIosSourceMap = async (updates: any) => {
  const appVersion = app().version

  const iosBuildNumber = app().ios?.buildNumber || 50
  const iosUpdateId = updates.find((update: any) => update.platform === 'ios').id
  //   await promisifiedExec(`mv dist/bundles/ios-*.hbc dist/bundles/main.jsbundle`)
  console.log('iosUpdateId', app())
  const release = await promisifiedExec(`
        export APP_VARIANT=${APP_VARIANT} \
        export SENTRY_AUTH_TOKEN=${process.env.SENTRY_AUTH_TOKEN} && \
        cross-env ./node_modules/@sentry/cli/bin/sentry-cli \
        releases \
        --org ${process.env.EXPO_PUBLIC_SENTRY_ORG} \
        --project ${process.env.EXPO_PUBLIC_SENTRY_PROJECT} \
        files ${BUNDLE_ID}@${appVersion}+${iosBuildNumber} \
        upload-sourcemaps \
        --dist ${iosUpdateId} \
        --rewrite \
        dist/bundles/main.jsbundle dist/bundles/ios-37a27518d1c25fc5fce5076547bd39c7.map`)
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
