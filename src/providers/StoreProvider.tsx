import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Dispatch, FC, SetStateAction, createContext, useContext, useState } from 'react'
import { defaultJiggerSize, defaultUnitSystem } from '~/constants'
import { clearPersistedState, usePersistedState } from '~/hooks/usePeristedState'
import { JiggerSize, UnitSystem } from '~/types'

interface StoreContextType {
  currentEquipmentId: string
  currentIngredientId: string
  doubleRecipe: boolean
  feedbackShown: boolean
  myBarPopoverDismissed: boolean
  partialMatchInfoBoxDismissed: boolean
  selectedJiggerSize: JiggerSize
  selectedUnitSystem: UnitSystem
  setCurrentEquipmentId: Dispatch<SetStateAction<string>>
  totalMatchInfoBoxDismissed: boolean

  setCurrentIngredientId: Dispatch<SetStateAction<string>>
  setDoubleRecipe: Dispatch<SetStateAction<boolean>>
  setFeedbackShown: Dispatch<SetStateAction<boolean>>
  setMyBarPopoverDismissed: Dispatch<SetStateAction<boolean>>
  setPartialMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
  setSelectedJiggerSize: Dispatch<SetStateAction<JiggerSize>>
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
  setTotalMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
  // AsyncStorage.clear()
  // clearPersistedState()

  const [currentIngredientId, setCurrentIngredientId] = useState<string | null>(null)
  const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null)
  const [feedbackShown, setFeedbackShown] = usePersistedState('feedbackShown', false)

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
        currentEquipmentId,
        currentIngredientId,
        doubleRecipe,
        feedbackShown,
        myBarPopoverDismissed,
        partialMatchInfoBoxDismissed,
        selectedJiggerSize,
        selectedUnitSystem,
        setCurrentEquipmentId,
        setCurrentIngredientId,
        totalMatchInfoBoxDismissed,
        setDoubleRecipe,
        setFeedbackShown,
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
