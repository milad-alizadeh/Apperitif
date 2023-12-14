import { usePathname } from 'expo-router'
import * as StoreReview from 'expo-store-review'
import { FC, useEffect, useRef, useState } from 'react'
import { APP_VARIANT } from '~/config'
import { useAnalytics } from '~/hooks'
import { useStore } from '~/providers'
import { api } from '~/services'
import { captureError } from '~/utils/captureError'
import { Prompt, PromptProps, PromptRef } from './Prompt'
import { TextField } from './TextField'

export const Feedback: FC = () => {
  const { capture, getDistinctId } = useAnalytics()
  const { setFeedbackShown, feedbackShown } = useStore()
  const prompt = useRef<PromptRef>(null)
  const [comment, setComment] = useState('')
  const [currentStep, setCurrentStep] = useState('feedbackRequest')
  const pathname = usePathname()

  const checkUserCritera = async (userId: string) => {
    const { data, error } = await api.supabase.functions.invoke('check-user-criteria', {
      body: {
        userId,
        environment: APP_VARIANT ? 'staging' : 'production',
      },
    })

    if (error) {
      captureError(error)
    } else {
      if (data.showFeedbackWidget) {
        prompt.current?.show()
        capture('user_feedback:feedback_request')
        setFeedbackShown(true)
      }
    }

    return data
  }

  // Track the location in your analytics provider here.
  useEffect(() => {
    if (!getDistinctId) return
    if ((pathname === '/recipe' || pathname === '/add-ingredients') && !feedbackShown) {
      checkUserCritera(getDistinctId())
    }
  }, [pathname, getDistinctId])

  const steps: Record<string, PromptProps> = {
    feedbackRequest: {
      title: 'Happy with our app?',
      description: "We'd love to hear your thoughts! Your feedback helps us improve.",
      confirmText: 'Yes! 👍',
      cancelText: 'Not really 👎',
      async onConfirm() {
        prompt.current?.hide()
        capture('user_feedback:feedback_submit', { is_positive: true })

        // If the feedback is positive, ask for a store review
        if (await StoreReview.hasAction()) {
          StoreReview.requestReview()
          capture('user_feedback:store_review_request')
        }
      },
      onCancel() {
        capture('user_feedback:feedback_submit', { is_positive: false })

        // If the feedback is negative, ask for a comment
        setCurrentStep('commentRequest')
      },
      onDismiss() {
        capture('user_feedback:feedback_dismiss')
      },
    },
    commentRequest: {
      title: 'Could you tell us how we can improve?',
      description: 'We would love to hear your feedback',
      confirmText: 'Submit',
      cancelText: 'Cancel',
      onConfirm() {
        capture('user_feedback:comment_submit', { comment })
        setCurrentStep('thankYou')
      },
      onCancel() {
        prompt.current?.hide()
        capture('user_feedback:comment_dismiss')
      },
      onDismiss() {
        capture('user_feedback:comment_dismiss')
      },
      children: (
        <TextField
          label="Can you tell us more?"
          multiline
          styleClassName="h-24 mb-6 z-20"
          numberOfLines={8}
          onChange={setComment}
          keyboardType="name-phone-pad"
          returnKeyType="default"
        />
      ),
    },
    thankYou: {
      title: 'Thank you for your feedback!',
      description: 'We will use it to improve our app.',
      confirmText: 'Ok',
      showCancel: false,
      onConfirm() {
        prompt.current?.hide()
      },
    },
  }

  return (
    <Prompt ref={prompt} {...steps[currentStep]}>
      {steps[currentStep]?.children}
    </Prompt>
  )
}
