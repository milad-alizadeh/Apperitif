import { useQuery } from '@apollo/client'
import { View } from 'react-native'
import { Accordion, Header, Screen } from '~/components'
import { GET_CONTENT } from '~/graphql/queries'

export default function FAQs() {
  const { data } = useQuery(GET_CONTENT, {
    variables: { name: 'faqs' },
  })

  const pageContent = data?.appContentCollection?.edges?.[0].node.content
  const pageContentParsed = data ? JSON.parse(pageContent) : { title: '', content: '' }

  return (
    pageContent && (
      <Screen preset="scroll" safeAreaEdges={['top', 'bottom']}>
        <Header backButton />
        <Header title={pageContentParsed.title} styleClassName="mb-6" />
        <View className="px-6">
          <Accordion content={pageContentParsed.faqs} />
        </View>
      </Screen>
    )
  )
}
