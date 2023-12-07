import { SimplePage } from '~/components'
import { useStore } from '~/providers'

export default function PrivacyPolicyScreen() {
  const { appContent } = useStore()
  console.log('appContent', appContent)
  const pageContent = appContent?.privacy_policy ?? { title: '', content: '' }

  return pageContent && <SimplePage title={pageContent.title} content={pageContent.content} />
}
