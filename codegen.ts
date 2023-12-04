import { CodegenConfig } from '@graphql-codegen/cli'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '~/config'

const config: CodegenConfig = {
  schema: [
    {
      [`${SUPABASE_URL}/graphql/v1`]: {
        headers: {
          apikey: SUPABASE_ANON_KEY,
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
