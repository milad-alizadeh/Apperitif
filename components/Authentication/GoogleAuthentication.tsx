import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { useState } from 'react'

export const GoogleAuthentication = function GoogleAuthentication({}) {
  const [userInfo, setUserInfo] = useState(null)
  // Somewhere in your code
  const signIn = async () => {
    try {
      console.log('GoogleSignin', GoogleSignin)
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() => signIn()}
      // disabled={isSigninInProgress}
    />
  )
}
