import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

type persistable = string | number | boolean | object

export const clearPersistedState = () => {
  storage.clearAll()
}

export const usePersistedState = <T extends persistable>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const readValue = (): T => {
    switch (typeof initialValue) {
      case 'string':
        return (storage.getString(key) ?? initialValue) as T
      case 'number':
        return (storage.getNumber(key) ?? initialValue) as T
      case 'boolean':
        return (storage.getBoolean(key) ?? initialValue) as T
      default:
        const storedValue = storage.getString(key)
        return storedValue ? JSON.parse(storedValue) : initialValue
    }
  }

  const [value, setValue] = useState<T>(readValue)

  useEffect(() => {
    switch (typeof value) {
      case 'string':
        storage.set(key, value as string)
        break
      case 'number':
        storage.set(key, value as number)
        break
      case 'boolean':
        storage.set(key, value as boolean)
        break
      default:
        storage.set(key, JSON.stringify(value))
        break
    }
  }, [key, value])

  return [value, setValue]
}

export default usePersistedState
