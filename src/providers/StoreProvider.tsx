import React, { Dispatch, FC, SetStateAction, createContext, useContext, useEffect } from 'react'
import { defaultJiggerSize, defaultUnitSystem } from '~/constants'
import { clearPersistedState, usePersistedState } from '~/hooks'
import { JiggerSize, UnitSystem } from '~/types'

interface StoreContextType {
  doubleRecipe: boolean
  partialMatchInfoBoxDismissed: boolean
  selectedJiggerSize: JiggerSize
  selectedUnitSystem: UnitSystem
  totalMatchInfoBoxDismissed: boolean
  myBarPopoverDismissed: boolean
  setDoubleRecipe: Dispatch<SetStateAction<boolean>>
  setMyBarPopoverDismissed: Dispatch<SetStateAction<boolean>>
  setPartialMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
  setSelectedJiggerSize: Dispatch<SetStateAction<JiggerSize>>
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
  setTotalMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
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
