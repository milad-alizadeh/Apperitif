import { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.local` })

const config: CodegenConfig = {
  schema: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/graphql/v1`,
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
