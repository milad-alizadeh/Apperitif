**Table of Contents**

- [Dependencies](#dependencies)
- [Setting Up the Project Locally](#setting-up-the-project-locally)
- [Deployments (CI/CD)](#deployments-ci-cd)
- [Project Structure (WIP)](#project-structure-wip)

# Dependencies

- [Xcode - iOS Simulators](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [Android Studio - Android Emulator](https://developer.android.com/studio)
- [Node.js > 18 - Running the Expo Dev Server](https://formulae.brew.sh/formula/node)
- [Git - Version Control](https://formulae.brew.sh/formula/git)
- [EAS CLI - Building the Project Locally](https://docs.expo.dev/eas-update/getting-started/)
- [Yarn - JavaScript Package Manager](https://formulae.brew.sh/formula/yarn)

# Setting Up the Project Locally

This project is developed using [Expo](https://expo.dev/home), an ecosystem for creating and developing native apps based on [React Native](https://reactnative.dev/).

## Installing the Project and Its Packages

After installing all tools listed in the dependencies section, clone the project from GitHub using Git and install the necessary packages. Execute the following commands in your terminal, one at a time:

```
git clone https://github.com/milad-alizadeh/Apperitif.git
cd Apperitif
yarn
```

## Running the Expo Dev Server

Start the development server, which enables real-time communication with the app, allowing immediate reflection of code changes. To start the dev server, run:

```
yarn run start
```

## Setup for iOS Simulator

To run the project on an iOS simulator, follow these steps:

1. [Create a Development Build](#create-a-development-build)
2. [Set up the iOS Simulator (First-time Setup)](#set-up-the-ios-simulator-first-time-setup)
3. [Install the Development Build](#install-the-development-build)

### Create a Development Build

Create an [EAS Development Build](https://docs.expo.dev/develop/development-builds/create-a-build/), a binary bundle for installation on your iOS simulator. The development bundle communicates with the [Expo Dev Server](https://docs.expo.dev/more/expo-cli/#develop) for real-time code reflection. To create a development build, run:

```
yarn run build:dev:ios-simulator
```

This may take 5-15 minutes, depending on your machine's speed. If successful, a new file `development-simulator.tar.gz` will appear in the `./artifact` folder.

### Set up the iOS Simulator (First-time Setup)

Open Xcode, accept the terms, and access the simulator by selecting `Xcode -> Open Developer Tool -> Simulator`. Choose a specific device simulator, such as `iPhone 15 Pro`, via `File -> Open Simulator -> iPhone 15 Pro`.

### Install the Development Build

Install the Development Build on the simulator with:

```
yarn build:run:dev:ios-simulator
```

Upon successful installation, the app icon should appear in the simulator. Open the app and select `http://localhost:8081` to start.

## Setup on iPhone

Running the build on an iPhone requires creating a separate development build. The steps are similar to the simulator setup:

1. [Create a Development Build for iPhone](#create-a-development-build-iphone)
2. [Install the Development Build using Xcode](#install-the-development-build-using-xcode)

### Create a Development Build (iPhone)

Create a development build for iPhone with:

```
yarn run build:dev:ios
```

This also takes 5-15 minutes. Upon success, `development.ipa` will be in the `./artifact` folder.

### Install the Development Build using Xcode

Install the build on an iPhone using Xcode. Ensure the iPhone is connected to your Mac and both are signed in with the same Apple ID. Enable developer mode on your iPhone as per [Expo's guide](https://docs.expo.dev/guides/ios-developer-mode/).

To install:

1. In Xcode, go to `Window -> Devices and Simulators`.
2. Select your iPhone on the left pane (optionally enable "Connect via network").
3. Click `+`, navigate to `development.ipa`, and install. The app should now appear on your iPhone.

## Setup on Android (Physical & Emulator)

For Android, the same development build works for both emulators and physical devices:

1. [Create a Development Build (Android)](#create-a-development-build-android)
2. [Set up Android Emulator (AKA Virtual Device)](#set-up-android-emulator-aka-virtual-device)
3. [Install the Development Build (Android)](#install-the-development-build-android)

### Create a Development Build (Android)

Create a development build for Android with:

```
yarn run build:dev:android
```

Upon success, `development.apk` will be in the `./artifact` folder.

### Set up Android Emulator (AKA Virtual Device)

For a virtual device:

1. Open Android Studio and select `... -> Virtual Device Manager`.
2. Click `Create Device` and choose, for example, `Pixel 7` with `API 34`.

For a physical device:

1. Connect the device to your Mac.
2. Enable USB debugging and [developer mode](https://developer.android.com/studio/debug/dev-options).

### Install the Development Build (Android)

Install the build on Android with:

```
yarn run build:run:android
```

For virtual devices, drag and drop `development.apk` into the running emulator.

# Deployments (CI/CD)

## Creating Production Builds

The deployment process uses GitHub Actions and EAS build for CI/CD, submitting builds to Apple Connect and Google Play. EAS Build is a part of Expo Application Services (EAS), which automates the process of compiling and deploying React Native apps to iOS and Android platforms. This tool is crucial for producing final production-ready binaries that can be distributed through app stores.

For ease of testing, there are separate environments: `staging` and `production`. The process is:

1. Review and test code changes locally on the Development Build.
2. Increment the `version` number in `app.config.js` and commit.
3. Create a pull request (PR) against `staging-build`.
4. Once merged, builds are triggered for both platforms using EAS Build and submitted for testing.
5. After staging tests, create a PR from `staging-build` to `production-build`.
6. Once approved, the same process repeats for the production app.
7. Submit the app for review on Android & iOS.

**Note:** The production environment is separate from staging and uses a different backend.

## EAS Update (JavaScript Updates)

EAS Update, also part of Expo Application Services, allows for expedited updates of non-native code changes. It's a powerful tool for pushing quick updates directly to users' devices without going through the standard app store review process. This feature is particularly useful for bug fixes, performance improvements, and small feature enhancements that don't involve native code changes.

The process for using EAS Update is:

1. Review and test code changes locally.
2. Create a PR against `staging`.
3. Once merged, an EAS Update package is sent to devices.
4. Repeat the process for the `production` branch.

**Note**: EAS updates do not require updating the `version` in `app.config.js`.

### When to Use EAS Build vs EAS Update

Use EAS Build for major changes, particularly those involving native code or significant feature additions. EAS Update is ideal for minor changes and bug fixes that don't require a full build process. This ensures users always have access to the latest version of the app, even for small updates. EAS updates only trigger upon app launch.

# Project Structure (WIP)
