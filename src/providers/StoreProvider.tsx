import React, { Dispatch, FC, SetStateAction, createContext, useContext, useState } from 'react'
import { defaultJiggerSize, defaultUnitSystem } from '~/constants'
import { usePersistedState } from '~/hooks/usePeristedState'
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
  shouldShowFeedback: boolean
  totalMatchInfoBoxDismissed: boolean

  setCurrentIngredientId: Dispatch<SetStateAction<string>>
  setDoubleRecipe: Dispatch<SetStateAction<boolean>>
  setFeedbackShown: Dispatch<SetStateAction<boolean>>
  setMyBarPopoverDismissed: Dispatch<SetStateAction<boolean>>
  setPartialMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
  setSelectedJiggerSize: Dispatch<SetStateAction<JiggerSize>>
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
  setShouldShowFeedback: Dispatch<SetStateAction<boolean>>
  setTotalMatchInfoBoxDismissed: Dispatch<SetStateAction<boolean>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
  const [currentIngredientId, setCurrentIngredientId] = useState<string | null>(null)
  const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null)
  const [shouldShowFeedback, setShouldShowFeedback] = useState<boolean>(false)
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
        shouldShowFeedback,
        totalMatchInfoBoxDismissed,
        setDoubleRecipe,
        setFeedbackShown,
        setMyBarPopoverDismissed,
        setPartialMatchInfoBoxDismissed,
        setSelectedJiggerSize,
        setSelectedUnitSystem,
        setShouldShowFeedback,
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
