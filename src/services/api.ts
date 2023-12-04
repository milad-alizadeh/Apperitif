import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist'
import 'react-native-url-polyfill/auto'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '~/config'
import { Database } from '../types/supabase'
import { LargeSecureStoreAdapter } from './storage'

const URI = `${SUPABASE_URL}/graphql/v1`

console.log('URI', URI)

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
      const authorization = accessToken ? `Bearer ${accessToken}` : ''

      return {
        headers: {
          ...headers,
          authorization,
          apikey: SUPABASE_ANON_KEY,
        },
      }
    })

    const cache = new InMemoryCache()

    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    })

    this.apolloClient = new ApolloClient({
      link: this.authLink.concat(this.httpLink), // Chain it with the httpLink
      cache,
    })
  }

  createSupabaseClient() {
    this.supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: LargeSecureStoreAdapter as any,
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

export const api = new Api()
