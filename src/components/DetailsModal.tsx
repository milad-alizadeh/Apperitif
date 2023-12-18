import { useGlobalSearchParams, usePathname } from 'expo-router'
import { useEffect, useRef } from 'react'
import { BottomSheet, BottomSheetRef } from '~/components/BottomSheet'
import { useStore } from '~/providers'
import { EquipmentDetails } from './EquipmentDetails'
import { IngredientDetails } from './IngredientDetails'

export const DetailsModal = () => {
  const modalRef = useRef<BottomSheetRef>(null)
  const params = useGlobalSearchParams()
  const pathname = usePathname()
  const { currentEquipmentId, currentIngredientId, setCurrentEquipmentId, setCurrentIngredientId } =
    useStore()

  useEffect(() => {
    if (currentIngredientId || currentEquipmentId) {
      modalRef?.current?.show()
    }
  }, [currentIngredientId, currentEquipmentId])

  return (
    <BottomSheet
      ref={modalRef}
      onHide={() => {
        setCurrentIngredientId(null)
        setCurrentEquipmentId(null)
      }}
    >
      {currentIngredientId && (
        <IngredientDetails ingredientId={currentIngredientId} modalRef={modalRef} />
      )}
      {currentEquipmentId && <EquipmentDetails equipmentId={currentEquipmentId} />}
    </BottomSheet>
  )
}
