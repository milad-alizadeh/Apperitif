// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button } from '../Button'

export const GoogleAuthentication = function GoogleAuthentication() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const signIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices()
    //   await GoogleSignin.signIn()
    //   const userInfo = await GoogleSignin.getTokens()
    //   return userInfo
    // } catch (error) {
    //   Alert.alert(error)
    // }
  }

  return (
    <View>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
        // disabled={isSigninInProgress}
      /> */}
    </View>
  )
}
