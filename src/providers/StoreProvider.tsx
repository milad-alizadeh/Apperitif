import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Dispatch, FC, SetStateAction, createContext, useContext } from 'react'
import { defaultJiggerSize, defaultUnitSystem } from '~/constants'
import { clearPersistedState, usePersistedState } from '~/hooks/usePeristedState'
import { JiggerSize, UnitSystem } from '~/types'

interface StoreContextType {
  doubleRecipe: boolean
  feedbackShown: boolean
  eventCount: Record<string, any>
  myBarPopoverDismissed: boolean
  selectedJiggerSize: JiggerSize
  selectedUnitSystem: UnitSystem

  setDoubleRecipe: Dispatch<SetStateAction<boolean>>
  setFeedbackShown: Dispatch<SetStateAction<boolean>>
  setMyBarPopoverDismissed: Dispatch<SetStateAction<boolean>>
  setSelectedJiggerSize: Dispatch<SetStateAction<JiggerSize>>
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
  setEventCount: Dispatch<SetStateAction<Record<string, any>>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
  // AsyncStorage.clear()
  // clearPersistedState()

  const [feedbackShown, setFeedbackShown] = usePersistedState('feedbackShown', false)
  const [eventCount, setEventCount] = usePersistedState('eventCount', {
    recipeView: {},
    ingredientAdd: 0,
  })

  const [selectedUnitSystem, setSelectedUnitSystem] = usePersistedState(
    'selectedUnitSystem',
    defaultUnitSystem,
  )
  const [selectedJiggerSize, setSelectedJiggerSize] = usePersistedState(
    'selectedJiggerSize',
    defaultJiggerSize,
  )

  const [doubleRecipe, setDoubleRecipe] = usePersistedState('doubleRecipe', false)

  const [myBarPopoverDismissed, setMyBarPopoverDismissed] = usePersistedState(
    'myBarPopoverDismissed',
    false,
  )

  return (
    <StoreContext.Provider
      value={{
        doubleRecipe,
        eventCount,
        feedbackShown,
        myBarPopoverDismissed,
        selectedJiggerSize,
        selectedUnitSystem,
        setDoubleRecipe,
        setEventCount,
        setFeedbackShown,
        setMyBarPopoverDismissed,
        setSelectedJiggerSize,
        setSelectedUnitSystem,
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
