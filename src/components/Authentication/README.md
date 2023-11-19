# Installation

## Dependencies

- [Xcode - iOS Simulators](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [Android Studio - Android Emulator](https://developer.android.com/studio)
- [Node.js > 18 - Running Expo Dev Server](https://formulae.brew.sh/formula/node)
- [Git - Version control](https://formulae.brew.sh/formula/git)
- [EAS CLI - Building the project on local machine)](https://docs.expo.dev/eas-update/getting-started/)
- [Yarn - JavaScript package manager](https://formulae.brew.sh/formula/yarn)

## Running the project on local machine

This project is written in [Expo](https://expo.dev/home) which is an eco system around creating and developing native apps based on [React Native](https://reactnative.dev/).

### Installing the project and its packages

After installing all the tools in the dependencies section you need to clone the project from Github using Git and install the necessary packages. To do this run the following commands (one at a time) in the terminal.

```
git clone https://github.com/milad-alizadeh/Apperitif.git
cd Apperitif
yarn
```

### Running on iOS Simulator

In order to run the project on an iOS simulator we need to follow a few steps.

1. [Create a development build](#create-a-development-build)
2. [Setup iOS Simulator (first time setup)](#setup-ios-simulator-first-time-setup)
3. [Install the Development Build](#install-the-development-build)
4. [Run Expo Dev Server](#run-expo-dev-server)

#### Create a Development Build

To run the project on we first need to create an [EAS Development build](https://docs.expo.dev/develop/development-builds/create-a-build/)
. This is basically a binary bundle that can be installed like a regular iOS app on your iOS simulator. The development bundle can then communicate with the [Expo Dev Server](https://docs.expo.dev/more/expo-cli/#develop) which allows any changes to the code to reflect immediately in the Simulator.
To create a development build run the command:

```
yarn run build:dev:ios-simulator
```

This can take between 5-15 min depending on how fast your machine is. If successful you will see a new file `development-simulator.tar.gz` in `./artifact` folder.

#### Setup iOS Simulator (first time setup)

Now let's get our iOS Simulator ready. Open Xcode if you have haven't already and accept the terms. You can now access the simulator by clicking on the Xcode Menu on the top left of the screen `Xcode -> Open Developer Tool -> Simulator`. You have the option of selecting a specific device simulator (e.g iPhone 15 pro). This is can be found in `File -> Open Simulator -> iPhone 15 pro` (or any other device you want to test this on).

#### Install the Development Build

Once you have the simulator ready we can now install our Development Build on it. To do so run the following command:

```
yarn build:run:dev:ios-simulator
```

If susccessful you should now see the app icon in the simulator. If you open the app you should see a page that instructs you to start a local development server.

#### Run Expo Dev Server

The final step is to connect our installed app to the Expo Dev Server. This allows us to view any changes we make in the code in real time in the simulator/phydical device. To run the dev server run the command:

```
yarn run start
```

Now open the simulator app and you should see an item in the list `http://localhost:8081`. Click and the app should work as expected now!
