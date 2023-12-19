import { useEffect, useRef } from 'react'
import { BottomSheet, BottomSheetRef } from '~/components/BottomSheet'
import { useDetailsModal } from '~/providers'
import { EquipmentDetails } from './EquipmentDetails'
import { IngredientDetails } from './IngredientDetails'

export const DetailsModal = () => {
  const modalRef = useRef<BottomSheetRef>(null)
  const { currentEquipmentId, currentIngredientId, setCurrentEquipmentId, setCurrentIngredientId } =
    useDetailsModal()

  useEffect(() => {
    if (currentIngredientId || currentEquipmentId) {
      modalRef?.current?.show()
    }
  }, [currentIngredientId, currentEquipmentId])

  const onClosed = () => {
    modalRef?.current?.hide()
  }

  return (
    <BottomSheet
      ref={modalRef}
      onHide={() => {
        setCurrentIngredientId(null)
        setCurrentEquipmentId(null)
      }}
    >
      {currentIngredientId && (
        <IngredientDetails ingredientId={currentIngredientId} onClosed={onClosed} />
      )}
      {currentEquipmentId && <EquipmentDetails equipmentId={currentEquipmentId} />}
    </BottomSheet>
  )
}
