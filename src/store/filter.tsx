import { makeVar } from '@apollo/client'

export const selectedFiltersVar = makeVar<string[]>([])
export const searchQueryVar = makeVar<string>('')
export const draftSelectedFiltersVar = makeVar<string[]>([])

export const clearFilters = (draft: boolean) => {
  searchQueryVar('')
  if (draft) {
    draftSelectedFiltersVar([])
  } else {
    selectedFiltersVar([])
  }
}

export const setupDraftFilters = () => {
  draftSelectedFiltersVar(selectedFiltersVar())
}

export const toggleFilter = (filterId: string, draft: boolean) => {
  if (filterIsChecked(filterId, draft)) {
    removeFilter(filterId, draft)
  } else {
    addFilter(filterId, draft)
  }
}

export const addFilter = (id: string, draft: boolean) => {
  if (draft) {
    draftSelectedFiltersVar([...draftSelectedFiltersVar(), id])
  } else {
    selectedFiltersVar([...selectedFiltersVar(), id])
  }
}

export const removeFilter = (id: string, draft: boolean) => {
  if (draft) {
    draftSelectedFiltersVar(draftSelectedFiltersVar().filter((filterId: string) => filterId !== id))
  } else {
    selectedFiltersVar(selectedFiltersVar().filter((filterId: string) => filterId !== id))
  }
}

export const applyFilters = (draftSelectedFilters) => {
  selectedFiltersVar(draftSelectedFilters)
}

export const filterIsChecked = (filterId: string, draft: boolean) => {
  if (draft) {
    return draftSelectedFiltersVar().includes(filterId)
  } else {
    return selectedFiltersVar().includes(filterId)
  }
}
