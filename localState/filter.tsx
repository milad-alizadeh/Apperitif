import { makeVar } from '@apollo/client'

export const selectedFiltersVar = makeVar([])
export const searchQueryVar = makeVar('')
export const draftSelectedFiltersVar = makeVar([])

export const clearFilters = (draft: boolean = false) => {
  searchQueryVar('')
  if (draft) {
    draftSelectedFiltersVar([])
  } else {
    selectedFiltersVar([])
  }
}

export const toggleFilter = (filterId: string, draft: boolean = false) => {
  if (filterIsChecked(filterId)) {
    removeFilter(filterId, draft)
  } else {
    addFilter(filterId, draft)
  }
}

export const addFilter = (id: string, draft: boolean = false) => {
  if (draft) {
    draftSelectedFiltersVar([...draftSelectedFiltersVar(), id])
  } else {
    selectedFiltersVar([...selectedFiltersVar(), id])
  }
}

export const removeFilter = (id: string, draft: boolean = false) => {
  if (draft) {
    draftSelectedFiltersVar(draftSelectedFiltersVar().filter((filterId: string) => filterId !== id))
  } else {
    selectedFiltersVar(selectedFiltersVar().filter((filterId: string) => filterId !== id))
  }
}

export const applyFilters = () => {
  selectedFiltersVar(draftSelectedFiltersVar())
}

export const filterIsChecked = (filterId: string, draft: boolean = false) => {
  if (draft) {
    return draftSelectedFiltersVar().includes(filterId)
  } else {
    return selectedFiltersVar().includes(filterId)
  }
}
