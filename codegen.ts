import { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.local` })
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL + '/graphql/v1'
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const config: CodegenConfig = {
  schema: [
    {
      [supabaseUrl]: {
        headers: {
          apikey: supabaseAnonKey,
        },
      },
    },
    './src/graphql/localState.graphql',
  ],
  documents: ['./src/**/!(*.d).{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
