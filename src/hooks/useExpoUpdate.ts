import * as Updates from 'expo-updates'

export const useExpoUpdate = () => {
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
      console.log('update error', event)
      alert('update error')
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      // Handle no update available
      console.log('no update available', event)
      alert('no update available')
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      // Handle update available
      console.log('update available', event)
      alert('update available')
    }
  }
  Updates.useUpdateEvents(eventListener)
}
