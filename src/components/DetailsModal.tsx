import { useEffect, useRef } from 'react'
import { BottomSheet, BottomSheetRef } from '~/components/BottomSheet'
import { useStore } from '~/providers'
import { EquipmentDetails } from './EquipmentDetails'
import { IngredientDetails } from './IngredientDetails'

export const DetailsModal = () => {
  const modalRef = useRef<BottomSheetRef>(null)
  const { currentEquipmentId, currentIngredientId, setCurrentEquipmentId, setCurrentIngredientId } =
    useStore()

  useEffect(() => {
    if (currentIngredientId || currentEquipmentId) {
      modalRef?.current?.show()
    }
  }, [currentIngredientId, currentEquipmentId])

  const onClosed = () => {
    setCurrentIngredientId(null)
    setCurrentEquipmentId(null)
    modalRef?.current?.hide()
  }

  return (
    <BottomSheet ref={modalRef}>
      {currentIngredientId && (
        <IngredientDetails ingredientId={currentIngredientId} onClosed={onClosed} />
      )}
      {currentEquipmentId && <EquipmentDetails equipmentId={currentEquipmentId} />}
    </BottomSheet>
  )
}
