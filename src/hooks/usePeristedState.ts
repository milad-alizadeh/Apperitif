import {
  MMKV,
  useMMKVBoolean,
  useMMKVNumber,
  useMMKVObject,
  useMMKVString,
} from 'react-native-mmkv'
import { Dispatch, SetStateAction } from 'react'

export const usePersistedState = <T>(key: string, initialValue: T) {
  let useStorageHook:
    | typeof useMMKVString
    | typeof useMMKVNumber
    | typeof useMMKVBoolean
    | typeof useMMKVObject

  if (typeof initialValue === 'string') {
    useStorageHook = useMMKVString
  } else if (typeof initialValue === 'number') {
    useStorageHook = useMMKVNumber
  } else if (typeof initialValue === 'boolean') {
    useStorageHook = useMMKVBoolean
  } else {
    useStorageHook = useMMKVObject as typeof useMMKVObject
  }

  const [value, setValue] = useStorageHook<T>(key, initialValue as any)

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>]
}

