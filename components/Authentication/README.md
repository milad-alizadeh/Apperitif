# Installation

## expo-apple-authentication for native signin

```
npx expo install expo-apple-authentication
```

##

To enable the Sign In with Apple capability in your app, set the ios.usesAppleSignIn property to true in your project's app config:

```
{
  "ios": {
    "usesAppleSignIn": true
  },
  "expo": {
    "plugins": ["expo-apple-authentication"]
  }
}
```
