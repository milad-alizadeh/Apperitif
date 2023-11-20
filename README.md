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
- [EAS CLI - Expo build tool](https://docs.expo.dev/eas-update/getting-started/)
- [Yarn - JavaScript Package Manager](https://formulae.brew.sh/formula/yarn)
- [Fast Lane - Build & Releasing Apps](https://formulae.brew.sh/formula/fastlane)
- [Cocoa Pods - Dependency manager for Swift](https://formulae.brew.sh/formula/cocoapods)

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

Create an [EAS Development Build](https://docs.expo.dev/develop/development-builds/create-a-build/), a binary bundle for installation on your iOS simulator. In simpler terms every app on any phone is a single file (binary) that can be installed on the device (or simulator). The development bundle communicates with the [Expo Dev Server](https://docs.expo.dev/more/expo-cli/#develop) for real-time code reflection. To create a development build, run:

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

Upon successful installation, the app icon should appear in the simulator. Open the app and select `http://localhost:8081` to start. If you are using a physical device, chances are the dev server might be automatically detected. In that case you need to click enter manually and replace the `localhost` with the IP of your Mac on the network. `e.g https://192.168.0.64:8081`

## Setup on iPhone

Running the build on an iPhone requires creating a separate development build. The steps are similar to the simulator setup:

1. [Create a Development Build for iPhone](#create-a-development-build-iphone)
2. [Install EAS profile on your device](#install-eas-profile-on-your-device)
3. [Install the Development Build using Xcode](#install-the-development-build-using-xcode)

### Create a Development Build (iPhone)

Create a development build for iPhone with:

```
yarn run build:dev:ios
```

This also takes 5-15 minutes. Upon success, `development.ipa` will be in the `./artifact` folder.

**Note:** During the process you might face an error. `Error: Distribution certificate with fingerprint *************** hasn't been imported successfully`. This is to do with your machine missing the new ""Apple Worldwide Developer Relations Certification Authority". To install download it [here](https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer) and install this certificate. Once done you should no longer get this error

**Note:** Make sure you have iOS Simulators in Xcode before runnning the build command as it will fail without.

### Install EAS profile on your device

In order for development build to work on an iPhone it needs to be signed by Expo to install EAS profile run:

```
yarn add:test-device
```

Choose to login to the Apple Account and choose the first option `Website - generates a registration URL to be opened on your devices`. You then will recieve a QR code which you can scan with your phone and install the profile. Once the profile is installed you should a confirmation message and then move to the next section

### Install the Development Build using Xcode

Once the build is finished you should recieve a QR code in the terminal. Scan it with your Phone and you're asked to install the app. Confirm and the build should install on your phone

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
yarn run build:run:android-emulator
```

For virtual devices, drag and drop `development.apk` into the running emulator.

Once the build is finished you should recieve a QR code in the terminal. Scan it with your Phone and you're asked to install the app. Confirm and the build should install on your phone

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
7. Manually Submit the app for review on Android & iOS store.

**Note:** The production environment is separate from staging and uses a different backend.

## EAS Update (JavaScript Updates)

EAS Update, also part of Expo Application Services, allows for expedited updates of non-native code changes. It's a powerful tool for pushing quick updates directly to users' devices without going through the standard app store review process. This mean the user does not need to download a new version of the from app store. This feature is particularly useful for bug fixes, performance improvements, and small feature enhancements that don't involve native code changes.

The process for using EAS Update is:

1. Review and test code changes locally.
2. Create a PR against `staging`.
3. Once merged, an EAS Update package is sent to devices.
4. Repeat the process for the `production` branch.

**Note**: EAS updates do not require updating the `version` in `app.config.js`.

### When to Use EAS Build vs EAS Update

Use EAS Build for major changes, particularly those involving native code or significant feature additions. EAS Update is ideal for minor changes and bug fixes that don't require a full build process. This ensures users always have access to the latest version of the app, even for small updates. EAS updates only trigger upon app launch.

# Project Structure and Tools

This project follows a standard [Expo](https://docs.expo.dev/get-started/create-a-project/) structure, resulting in opinionated code that facilitates consistency and ease of understanding throughout the development process.

- [Navigation](#navigation)
- [State Management & APIs](#state-management-and-apis)
- [Authentication](#authentication)
- [Styling](#styling)

## Navigation

We use [Expo Router](https://docs.expo.dev/routing/introduction/) for navigation and routing. This offers a Next.js-like folder-based structure, simplifying navigation significantly. All main routes are located in the `src/app` folder. Our setup closely follows Expo's standard conventions. For more details on using Expo Router, refer to their [guide](https://docs.expo.dev/routing/introduction/).

## Testing

Our project incorporates two types of testing:

- Unit tests with [Jest](https://jestjs.io/)
- End-to-End (E2E) tests with [Maestro](https://maestro.mobile.dev/).

Unit tests are conducted for each component. These tests run automatically whenever code is pushed to the `staging`, `staging-build`, `production`, and `production-build` branches. The build process halts if any unit test fails. To run unit tests locally, execute:

```
yarn test:unit
```

E2E tests, currently not integrated into the CI/CD pipeline (WIP), can be run locally using:

```
yarn test:e2e
```

**Note:** Ensure Maestro is installed before running E2E tests. Follow the [Maestro installation guide](https://maestro.mobile.dev/getting-started/installing-maestro) for setup instructions.

## State Management and APIs

For network communication with the server, we use [Apollo Client](https://www.apollographql.com/docs/react/) and [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction). Queries and mutations are managed in the `src/graphql` folder. As we use TypeScript, it's necessary to regenerate types whenever a query or mutation is added, changed, or deleted. Type checking is facilitated by [Codegen](https://www.apollographql.com/tutorials/lift-off-part1/09-codegen), allowing for end-to-end type safety with minimal effort. To generate types after any changes, run:

```
yarn run generate:gql
```

To automatically watch for changes and generate types, use:

```
yarn run generate:gql:watch
```

Local state management is also done using Apollo client to remove the need of using another state management library such as Redux or Mobx.

The store files are found in `src/store`. For more information on how to use local state management with Apollo please refer to this [guide](https://www.apollographql.com/docs/react/local-state/local-state-management/).

In certain cases where there is limitation with the graphQL database we are using Supabase client to fetch data

## Authentication

This app uses [Supabase Auth](https://supabase.com/docs/guides/auth) to handle user authentications. There are several ways to authenticate the user:

- [Login with Apple](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- [Login with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [One-time using email](https://supabase.com/docs/guides/auth/passwordless-login/auth-email-otp)

Each of these are handled by components are located in `src/components/Authentication`. The necessary setup and keys are located in Supabase Auth dashboard.

There's also a `SessionProvider` component in `src/providers/SessionProvider`. This allows supabase to check whether a user is logged in already and if so fetch the current session (not asking the user to login again). If the session is expired then the user will be redirected.

The user token is saved in [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) and the setup can be found in `src/sevices/api`.

## Styling

The styling in the entier application leverages [Nativewind](https://www.nativewind.dev/). NativeWind uses [Tailwind CSS](https://tailwindcss.com/) as scripting language to create a universal style system for React Native.
The scope of why to use Tailwind is outside of this guide but you can read through why [utility-based styling](https://tailwindcss.com/docs/utility-first) is a good idea and much less verbose than traditional CSS/StyleSheet.

A simple example of how to use this in a component is

```
import { Text, View } from "react-native";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-slate-800">Styling just works! 🎉</Text>
    </View>
  );
};
```

Please refer [NativeWind guide](https://www.nativewind.dev/overview/) on how to use it within the project.
