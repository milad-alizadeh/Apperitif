import { useMutation, useQuery } from '@apollo/client'
import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'
import { SectionDataType, SectionHeaderType } from '~/components'
import { DELETE_FROM_MY_BAR } from '~/graphql/mutations/deleteFromMyBar'
import { GET_MY_BAR } from '~/graphql/queries'
import { useAppContent } from '~/providers'
import { captureError } from '~/utils/captureError'

interface Ingredient {
  id: string
  name: string
}

export const useFetchMyBar = () => {
  try {
    const { my_bar } = useAppContent()
    const {
      data: myBarData,
      loading: myBarLoading,
      refetch: myBarRefetch,
      error: myBarError,
    } = useQuery(GET_MY_BAR)

    const isFocused = useIsFocused()

    useEffect(() => {
      if (isFocused) {
        // Refetch the data when the tab gains focus
        myBarRefetch()
      }
    }, [isFocused, myBarRefetch])

    let sectionsData: SectionDataType[][] = []
    let sectionsHeader: SectionHeaderType[] = []
    let ingredientsInMyBar: Ingredient[] = []

    for (let category of myBarData?.myBarCollection?.edges) {
      const { node } = category

      if (!my_bar?.hidden_category_ids?.includes(node?.id)) {
        const data: Ingredient[] = JSON.parse(node?.data)

        ingredientsInMyBar = ingredientsInMyBar.concat(data)

        sectionsData.push(data)
        sectionsHeader.push({
          title: node?.title,
          count: node?.count,
          id: node?.title,
        })
      }
    }

    const [deleteFromMyBar] = useMutation(DELETE_FROM_MY_BAR)

    return {
      deleteFromMyBar,
      myBarError,
      myBarLoading,
      myBarRefetch,
      sectionsData,
      sectionsHeader,
      ingredientsInMyBar,
    }
  } catch (error) {
    captureError(error)
  }
}
