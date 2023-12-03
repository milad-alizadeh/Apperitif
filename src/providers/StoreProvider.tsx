import React, { Dispatch, FC, SetStateAction, createContext, useContext, useEffect } from 'react'
import { defaultJiggerSize, defaultUnitSystem } from '~/constants'
import { clearPersistedState, usePersistedState } from '~/hooks'
import { JiggerSize, UnitSystem } from '~/types'

interface StoreContextType {
  selectedUnitSystem: UnitSystem
  selectedJiggerSize: JiggerSize
  doubleRecipe: boolean
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
  setSelectedJiggerSize: Dispatch<SetStateAction<JiggerSize>>
  setDoubleRecipe: Dispatch<SetStateAction<boolean>>
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

  return (
    <StoreContext.Provider
      value={{
        selectedUnitSystem,
        setSelectedUnitSystem,
        selectedJiggerSize,
        setSelectedJiggerSize,
        doubleRecipe,
        setDoubleRecipe,
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
