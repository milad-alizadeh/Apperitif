import { useQuery } from '@apollo/client'
import { SimplePage } from '~/components'
import { GET_CONTENT } from '~/graphql/queries'

export default function PrivacyPolicy() {
  const { data, loading } = useQuery(GET_CONTENT, {
    variables: { name: 'privacy-policy' },
    fetchPolicy: 'cache-and-network',
  })

  const pageContent = data?.appContentCollection?.edges?.[0]?.node.content
  const pageContentParsed = data ? JSON.parse(pageContent) : { title: '', content: '' }

  return (
    pageContentParsed && (
      <SimplePage
        title={pageContentParsed.title}
        loading={loading}
        content={pageContentParsed.content}
      />
    )
  )
}
