import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ActivityIndicator, Image, ImageStyle, TouchableOpacity, View } from 'react-native'

import { api } from '../services/api'
import { Icon } from './Icon'

export interface ImageUploadRef {
  upload: () => Promise<{ data: any; error: any }>
}

interface ImageUploadProps {
  style?: ImageStyle
}

const ImageUpload = forwardRef(({ style }: ImageUploadProps, ref) => {
  const [imageURI, setImageURI] = useState(null)
  const [loading, setLoading] = useState(false)

  useImperativeHandle(
    ref,
    (): ImageUploadRef => ({
      async upload() {
        return await uploadFromURI()
      },
    }),
  )

  /**
   * Requests camera and camera roll permissions on iOS devices.
   */
  const getPermission = async () => {
    if (Constants.platform.ios) {
      setLoading(true)
      const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (cameraRollStatus.status !== 'granted') {
        alert('Sorry, we need these permissions to make this work!')
      }
      setLoading(false)
    }
  }

  /**
   * Requests permission to access the device's camera roll and launches the image picker.
   * Sets the selected image URI as the component's state.
   */
  const pickImage = async () => {
    await getPermission()

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    })

    if (result.canceled) return
    const uri = result.assets[0].uri
    setImageURI(uri)
  }

  /**
   * Uploads the selected image to the server using the image URI.
   * Returns an object with the uploaded data and any errors that occurred.
   */
  const uploadFromURI = async (): Promise<
    { data: { path: string }; error: null } | { data: null; error: string }
  > => {
    const uri = imageURI
    if (!uri) {
      alert('No image selected')
      return { data: null, error: 'No image selected' }
    }
    setLoading(true)
    // get the extension
    const ext = uri.split('.').pop()
    // get the filename
    const filename = uri.split('/').pop()

    const formData = new FormData()

    formData.append('files', {
      uri,
      name: filename,
      type: `image/${ext}`,
    } as any)

    const { data, error } = await api.uploadImage(filename, formData)

    if (error) {
      setLoading(false)
      alert('Upload failed')
      return { data: null, error: error.message }
    } else {
      setLoading(false)
      return { data, error: null }
    }
  }

  return (
    <TouchableOpacity
      onPress={pickImage}
      activeOpacity={0.9}
      className="w-full aspect-square justify-center items-center bg-neutral-100 rounded-2xl overflow-hidden"
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="w-full h-full justify-center items-center">
          {imageURI ? (
            <Image source={{ uri: imageURI }} style={[$image, style]} />
          ) : (
            <Icon icon="image" size="large" />
          )}
        </View>
      )}

      {imageURI && (
        <Icon
          icon="close"
          containerClassName="bg-white rounded-full absolute top-2 right-2"
          onPress={() => setImageURI(null)}
        />
      )}
    </TouchableOpacity>
  )
})

ImageUpload.displayName = 'ImageUpload'

export { ImageUpload }

const $image: ImageStyle = {
  width: '100%',
  height: '100%',
}
