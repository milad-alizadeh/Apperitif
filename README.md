# Setup instructions

## Dependencies

- [Xcode - iOS Simulators](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [Android Studio - Android Emulator](https://developer.android.com/studio)
- [Node.js > 18 - Running the Expo Dev Server](https://formulae.brew.sh/formula/node)
- [Git - Version Control](https://formulae.brew.sh/formula/git)
- [EAS CLI - Building the Project Locally](https://docs.expo.dev/eas-update/getting-started/)
- [Yarn - JavaScript Package Manager](https://formulae.brew.sh/formula/yarn)

## Running the Project Locally

This project is developed with [Expo](https://expo.dev/home), an ecosystem for creating and developing native apps based on [React Native](https://reactnative.dev/).

### Installing the Project and Its Packages

After installing all the tools listed in the dependencies section, you will need to clone the project from GitHub using Git and install the necessary packages. Execute the following commands in your terminal, one at a time:

```
git clone https://github.com/milad-alizadeh/Apperitif.git
cd Apperitif
yarn
```

### Running on an iOS Simulator

To run the project on an iOS simulator, follow these steps:

1. [Create a Development Build](#create-a-development-build)
2. [Set up the iOS Simulator (First Time Setup)](#setup-ios-simulator-first-time-setup)
3. [Install the Development Build](#install-the-development-build)
4. [Run the Expo Dev Server](#run-expo-dev-server)

#### Create a Development Build

First, create an [EAS Development Build](https://docs.expo.dev/develop/development-builds/create-a-build/). This is essentially a binary bundle that can be installed like a regular iOS app on your iOS simulator. The development bundle communicates with the [Expo Dev Server](https://docs.expo.dev/more/expo-cli/#develop), allowing immediate reflection of code changes in the Simulator. Run the following command to create a development build:

```
yarn run build:dev:ios-simulator
```

This process may take 5-15 minutes, depending on your machine's speed. If successful, you will find a new file `development-simulator.tar.gz` in the `./artifact` folder.

#### Set up the iOS Simulator (First Time Setup)

Open Xcode (if you haven't already) and accept the terms. Access the simulator by selecting `Xcode -> Open Developer Tool -> Simulator` from the Xcode Menu. Choose a specific device simulator (e.g., iPhone 15 Pro) by navigating to `File -> Open Simulator -> iPhone 15 Pro` (or another device of your choice).

#### Install the Development Build

With the simulator ready, install the Development Build on it by running the following command:

```
yarn build:run:dev:ios-simulator
```

Upon successful installation, you should see the app icon in the simulator. Opening the app will display a page with instructions to start a local development server.

#### Run the Expo Dev Server

Finally, connect the installed app to the Expo Dev Server, enabling real-time reflection of code changes in the simulator or a physical device. Start the dev server with the command:

```
yarn run start
```

Now, open the simulator app and select `http://localhost:8081`. And Voilà!
