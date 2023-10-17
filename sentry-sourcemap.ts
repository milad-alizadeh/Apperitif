import { exec } from 'child_process'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Command } from 'commander'
import * as dotenv from 'dotenv'
import util from 'util'
import app from './app.config'
import eas from './eas.json'

dotenv.config({ path: `.env.local` })

const APP_VARIANT = process.env.APP_VARIANT
const BUNDLE_ID = `ai.bubblewrap.apperitif${
  APP_VARIANT === 'staging' || APP_VARIANT === 'development' ? `.${APP_VARIANT}` : ''
}`

const promisifiedExec = util.promisify(exec)
const uploadAndroidSourceMap = async (androidUpdateId: string, androidVersionCode: string) => {
  const appVersion = app().version

  console.log('androidUpdateId', androidUpdateId)
  console.log('androidVersionCode', androidVersionCode)

  await promisifiedExec(`
    if find dist/bundles/ -name "android-*.hbc" -print | grep -q .; then
      mv dist/bundles/android-*.hbc dist/bundles/index.android.bundle
    fi`)

  const release = await promisifiedExec(`
        cross-env ./node_modules/@sentry/cli/bin/sentry-cli \
        releases \
        --org ${process.env.EXPO_PUBLIC_SENTRY_ORG} \
        --project ${process.env.EXPO_PUBLIC_SENTRY_PROJECT} \
        files ${BUNDLE_ID}@${appVersion}+${androidVersionCode} \
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

const uploadIosSourceMap = async (iosUpdateId: string, iosBuildNumber: string) => {
  const appVersion = app().version

  console.log('iosUpdateId', iosUpdateId)
  console.log('iosBuildNumber', iosBuildNumber)

  await promisifiedExec(`
    if find dist/bundles/ -name "ios-*.hbc" -print | grep -q .; then
        mv dist/bundles/ios-*.hbc dist/bundles/main.jsbundle
    fi`)
  const release = await promisifiedExec(`
        cross-env ./node_modules/@sentry/cli/bin/sentry-cli \
        releases \
        --org ${process.env.EXPO_PUBLIC_SENTRY_ORG} \
        --project ${process.env.EXPO_PUBLIC_SENTRY_PROJECT} \
        files ${BUNDLE_ID}@${appVersion}+${iosBuildNumber} \
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

const getBuildNumber = async (platform: string, channel: string) => {
  const buildNumber = await promisifiedExec(
    `eas build:version:get -p ${platform} --profile ${channel} --non-interactive --json`,
  )
  if (buildNumber.stderr) {
    console.error(buildNumber.stderr)
  }

  if (platform === 'ios') {
    return JSON.parse(buildNumber.stdout).buildNumber
  } else {
    return JSON.parse(buildNumber.stdout).versionCode
  }
}

const program = new Command()
  .requiredOption('-p, --profile [value]', 'EAS profile')
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

    const groupID = JSON.parse(channelUpdates.stdout).currentPage.find(
      (currentPage: any) => currentPage.platforms === 'android, ios',
    ).group
    const updates = await promisifiedExec(`eas update:view ${groupID} --json`)
    if (updates.stderr) {
      console.error(updates.stderr)
    }

    const parsedUpdates = JSON.parse(updates.stdout)
    const androidUpdateId = parsedUpdates.find((update: any) => update.platform === 'android').id
    const androidVersionCode = await getBuildNumber('android', channel)
    const iosUpdateId = parsedUpdates.find((update: any) => update.platform === 'ios').id
    const iosBuildNumber = await getBuildNumber('ios', channel)

    await uploadAndroidSourceMap(androidUpdateId, androidVersionCode)
    await uploadIosSourceMap(iosUpdateId, iosBuildNumber)
  })

program.parse(process.argv)
