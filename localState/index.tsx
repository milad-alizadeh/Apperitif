import { makeVar } from '@apollo/client'

const selectedFiltersVar = makeVar([])
const searchQueryVar = makeVar('')
const draftSelectedFiltersVar = makeVar([])

// Define Views
const filterIsChecked = (filterId: string) => {
  return draftSelectedFiltersVar().includes(filterId)
}
