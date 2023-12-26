import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
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

    const [sectionsData, setSectionsData] = useState<SectionDataType[][]>([])
    const [sectionsHeader, setSectionsHeader] = useState<SectionHeaderType[]>([])
    const [ingredientsInMyBar, setIngredientsInMyBar] = useState<Ingredient[]>([])

    useEffect(() => {
      if (!myBarData) return

      let newSectionsData = []
      let newSectionsHeader = []
      let newIngredientsInMyBar = []

      for (let category of myBarData?.myBarCollection?.edges) {
        const { node } = category

        if (!my_bar?.hidden_category_ids?.includes(node?.id)) {
          const data = JSON.parse(node?.data)

          newIngredientsInMyBar = newIngredientsInMyBar.concat(data)
          newSectionsData.push(data)
          newSectionsHeader.push({
            title: node?.title,
            count: node?.count,
            id: node?.title,
          })
        }
      }

      setIngredientsInMyBar(newIngredientsInMyBar)
      setSectionsData(newSectionsData)
      setSectionsHeader(newSectionsHeader)
    }, [myBarData, my_bar?.hidden_category_ids])

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
