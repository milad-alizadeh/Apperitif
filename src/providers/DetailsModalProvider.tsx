import React, { Dispatch, FC, SetStateAction, createContext, useContext, useState } from 'react'

interface DetailsModalContextType {
  currentEquipmentId: string
  currentIngredientId: string
  setCurrentEquipmentId: Dispatch<SetStateAction<string>>
  setCurrentIngredientId: Dispatch<SetStateAction<string>>
}

const DetailsModalContext = createContext<DetailsModalContextType | undefined>(undefined)

export const DetailsModalProvider: FC<{ children: any }> = ({ children }) => {
  const [currentIngredientId, setCurrentIngredientId] = useState<string | null>(null)
  const [currentEquipmentId, setCurrentEquipmentId] = useState<string | null>(null)

  return (
    <DetailsModalContext.Provider
      value={{
        currentEquipmentId,
        currentIngredientId,
        setCurrentEquipmentId,
        setCurrentIngredientId,
      }}
    >
      {children}
    </DetailsModalContext.Provider>
  )
}

export const useDetailsModal = () => {
  const context = useContext(DetailsModalContext)
  if (!context) {
    throw new Error('useDetailsModal must be used within a DetailsModalProvider')
  }
  return context
}
