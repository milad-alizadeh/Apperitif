import { View } from 'react-native'
import { Accordion, Header, Screen } from '~/components'
import { useAnalytics } from '~/hooks'
import { useStore } from '~/providers'

export default function FAQsScreen() {
  const { capture } = useAnalytics()
  const { appContent } = useStore()

  const pageContent = appContent.faqs ?? { title: '', content: '', faqs: [] }

  return (
    pageContent && (
      <Screen preset="scroll" safeAreaEdges={['top', 'bottom']}>
        <Header title={pageContent.title} styleClassName="mb-6" backButton />
        <View className="px-6">
          <Accordion
            content={pageContent.faqs}
            onTitlePress={(question) => {
              capture('faqs:faqs_question_press', { question })
            }}
          />
        </View>
      </Screen>
    )
  )
}
