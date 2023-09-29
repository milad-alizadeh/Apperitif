import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import 'react-native-url-polyfill/auto'
import { Database } from '../../types/supabase'

const ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const URI = `${SUPABASE_URL}/graphql/v1`

class Api {
  supabase: SupabaseClient<Database>
  storage: SupabaseClient<Database>['storage']
  apolloClient: ApolloClient<NormalizedCacheObject>
  authLink: ApolloLink
  httpLink: ApolloLink

  constructor() {
    this.init()
  }

  async init() {
    this.createSupabaseClient()
    await this.initializeApolloClient()
  }

  async initializeApolloClient() {
    this.httpLink = createHttpLink({
      uri: URI,
    })

    this.authLink = setContext(async (_, { headers }) => {
      const response = await this.supabase.auth.getSession()
      const accessToken = response?.data?.session?.access_token
      const authorization = `Bearer ${accessToken ?? ANON_KEY}`
      return {
        headers: {
          ...headers,
          authorization,
        },
      }
    })

    this.apolloClient = new ApolloClient({
      link: this.authLink.concat(this.httpLink), // Chain it with the httpLink
      cache: new InMemoryCache(),
    })
  }

  createSupabaseClient() {
    this.supabase = createClient<Database>(SUPABASE_URL, ANON_KEY, {
      auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
    this.storage = this.supabase.storage
  }

  uploadImage(filename: string, file: FormData) {
    return this.storage.from('images').upload(filename, file)
  }
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
}

export const api = new Api()
