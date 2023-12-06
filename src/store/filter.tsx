import { makeVar } from '@apollo/client'

export interface Filter {
  id: string
  name: string
  parentId?: string
}

export const selectedFiltersVar = makeVar<Filter[]>([])
export const searchQueryVar = makeVar<string>('')
export const draftSelectedFiltersVar = makeVar<Filter[]>([])

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

export const toggleFilter = (filter: Filter, draft: boolean) => {
  if (filterIsChecked(filter, draft)) {
    removeFilter(filter, draft)
  } else {
    addFilter(filter, draft)
  }
}

export const addFilter = (filter: Filter, draft: boolean) => {
  if (draft) {
    draftSelectedFiltersVar([...draftSelectedFiltersVar(), filter])
  } else {
    selectedFiltersVar([...selectedFiltersVar(), filter])
  }
}

export const removeFilter = (currentFilter: Filter, draft: boolean) => {
  if (draft) {
    draftSelectedFiltersVar(
      draftSelectedFiltersVar().filter((filter) => filter.id !== currentFilter.id),
    )
  } else {
    selectedFiltersVar(selectedFiltersVar().filter((filter) => filter.id !== currentFilter.id))
  }
}

export const applyFilters = (draftSelectedFilters: Filter[]) => {
  selectedFiltersVar(draftSelectedFilters)
}

export const filterIsChecked = (currentFilter: Filter, draft: boolean) => {
  if (draft) {
    return draftSelectedFiltersVar().find((filter) => filter.id === currentFilter.id)
  } else {
    return selectedFiltersVar().find((filter) => (filter.id = currentFilter.id))
  }
}
