import React, { Dispatch, FC, SetStateAction, createContext, useContext } from 'react'
import { usePersistedState } from '~/hooks'
import { UnitSystem } from '~/types'

interface StoreContextType {
  selectedUnitSystem: UnitSystem
  setSelectedUnitSystem: Dispatch<SetStateAction<UnitSystem>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider: FC<{ children: any }> = ({ children }) => {
  const [selectedUnitSystem, setSelectedUnitSystem] = usePersistedState<UnitSystem>(
    'selectedUnitSystem',
    UnitSystem.METRIC,
  )

  return (
    <StoreContext.Provider value={{ selectedUnitSystem, setSelectedUnitSystem }}>
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
