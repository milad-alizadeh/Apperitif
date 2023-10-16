import * as Updates from 'expo-updates'
import { FC, useRef } from 'react'
import { Alert } from 'react-native'
import { Prompt, PromptRef } from './Prompt'

export const EasUpdate: FC = () => {
  const promptRef = useRef<PromptRef>(null)

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`)
    }
  }

  const eventListener = (event) => {
    if (event.type === Updates.UpdateEventType.ERROR) {
      // Handle error
      Alert.alert(
        'App update error',
        'There was an error updating the app. Please restart the app.',
      )
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      promptRef.current?.show()
    }
  }
  Updates.useUpdateEvents(eventListener)

  return (
    <Prompt
      ref={promptRef}
      title="Update Available"
      description="A new version of the app is available. Would you like to update now?"
      confirmText="Update"
      cancelText="Not Now"
      onConfirm={onFetchUpdateAsync}
    />
  )
}
