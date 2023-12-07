import { useQuery } from '@apollo/client'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import React, { Dispatch, FC, SetStateAction, createContext, useContext } from 'react'
import { defaultJiggerSize, defaultUnitSystem } from '~/constants'
import { GET_CONTENT } from '~/graphql/queries'
import { clearPersistedState, usePersistedState } from '~/hooks'
import { JiggerSize, UnitSystem } from '~/types'
import { captureError } from '~/utils/captureError'

interface StoreContextType {
  appContent: Record<string, any>
  doubleRecipe: boolean
  myBarPopoverDismissed: boolean
  partialMatchInfoBoxDismissed: boolean
  selectedJiggerSize: JiggerSize
  selectedUnitSystem: UnitSystem
  totalMatchInfoBoxDismissed: boolean
  setDoubleRecipe: Dispatch<SetStateAction<boolean>>
  setMyBarPopoverDismissed: Dispatch<SetStateAction<boolean>>
  setPartialMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
  setSelectedJiggerSize: Dispatch<SetStateAction<JiggerSize>>
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
  setTotalMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
  const { data, error } = useQuery(GET_CONTENT, {
    fetchPolicy: 'cache-and-network',
  })

  if (error) {
    captureError(error.message)
  }

  clearPersistedState()
  const appContent = mapValues(keyBy(data.appContentCollection.edges, 'node.name'), (e) =>
    JSON.parse(e.node.content),
  )

  const [selectedUnitSystem, setSelectedUnitSystem] = usePersistedState(
    'selectedUnitSystem',
    defaultUnitSystem,
  )
  const [selectedJiggerSize, setSelectedJiggerSize] = usePersistedState(
    'selectedJiggerSize',
    defaultJiggerSize,
  )

  const [doubleRecipe, setDoubleRecipe] = usePersistedState('doubleRecipe', false)
  const [totalMatchInfoBoxDismissed, setTotalMatchInfoBoxDismissed] = usePersistedState(
    'totalMatchInfoBoxDismissed',
    false,
  )
  const [partialMatchInfoBoxDismissed, setPartialMatchInfoBoxDismissed] = usePersistedState(
    'partialMatchInfoBoxDismissed',
    false,
  )

  const [myBarPopoverDismissed, setMyBarPopoverDismissed] = usePersistedState(
    'myBarPopoverDismissed',
    false,
  )

  return (
    <StoreContext.Provider
      value={{
        appContent,
        doubleRecipe,
        myBarPopoverDismissed,
        partialMatchInfoBoxDismissed,
        selectedJiggerSize,
        selectedUnitSystem,
        totalMatchInfoBoxDismissed,
        setDoubleRecipe,
        setMyBarPopoverDismissed,
        setPartialMatchInfoBoxDismissed,
        setSelectedJiggerSize,
        setSelectedUnitSystem,
        setTotalMatchInfoBoxDismissed,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
