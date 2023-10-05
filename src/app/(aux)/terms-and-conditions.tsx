import { useQuery } from '@apollo/client'
import { SimplePage } from '~/components'
import { GET_CONTENT } from '~/graphql/queries'

export default function TermsAndConditions() {
  const { data } = useQuery(GET_CONTENT, {
    variables: { name: 'terms-and-conditions' },
  })

  const pageContent = data?.appContentCollection?.edges?.[0].node.content
  const pageContentParsed = data ? JSON.parse(pageContent) : { title: '', content: '' }

  return (
    pageContentParsed && (
      <SimplePage title={pageContentParsed.title} content={pageContentParsed.content} />
    )
  )
}
