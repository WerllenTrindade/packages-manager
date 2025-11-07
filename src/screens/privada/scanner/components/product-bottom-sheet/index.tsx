// import ShoppingBag from "@/assets/shopping-bag.svg";
// import { CampaignTag } from "@/feature/ProductView/_components/CampaignTag";
// import { FetchProductByGtinQuery, useAddItemToOrderMutation } from "@/graphql/generates";
// import { useActiveOrder } from "@/hooks/active-order";
// import {
//   CustomBottomSheetModal
// } from "@/ui/custom-bottom-sheet-modal";
// import { QuantityPicker } from "@/ui/quantity-picker";
// import { errorApiHandler } from "@/utils/error-api-handler";
// import { getInitialQuantityByMeasurement } from "@/utils/get-initial-quantity-by-measurement";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import { useRouter } from "expo-router";
// import React, { forwardRef, useCallback, useState } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { Dialog, Button as PaperButton, Portal, Text } from "react-native-paper";
// import Toast from "react-native-toast-message";
// import {
//   AddButton,
//   AddButtonText,
//   CancelButton,
//   CancelButtonText,
//   Container,
//   FooterContainer,
//   ProductCode,
//   ProductImage,
//   ProductInfoContainer,
//   ProductName
// } from "./styles";
// import { filterProductWithSearch } from "./util";

// export interface ProductBottomSheet {
//   productGtin: string | null;
//   product: FetchProductByGtinQuery["fetchProductByGtin"];
//   onClose: () => void;
// }
// export const ProductBottomSheet = forwardRef<
//   BottomSheetModal,
//   ProductBottomSheet
// >(({ productGtin, product, onClose }, ref) => {

//   // Produto filtrado (uma única variante escolhida)
//   const productInitial = filterProductWithSearch(product);
//   const customVariant = productInitial?.customVariants?.[0];
//   console.log('customVariant ', customVariant)
//   // Quantidade inicial baseada na variante filtrada
//   const quantityInitial = getInitialQuantityByMeasurement({
//     currentMeasurementCode: customVariant?.measureCode,
//     minQuantity: customVariant?.customFields?.minimumQuantity || 1,
//     multipleQuantity: customVariant?.customFields?.multiple || 1,
//     standardMeasurementCode: customVariant?.customFields?.measurementCode,
//   });


//   const [quantity, setQuantity] = useState(Number(getInitialQuantityByMeasurement({
//     currentMeasurementCode: customVariant?.measureCode,
//     minQuantity: customVariant?.customFields?.minimumQuantity || 1,
//     multipleQuantity: customVariant?.customFields?.multiple || 1,
//     standardMeasurementCode: customVariant?.customFields?.measurementCode,
//   })));
//   const { refetchOrder, activeOrder } = useActiveOrder();
//   const [addItemToOrder, { loading: isLoading }] = useAddItemToOrderMutation();
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const router = useRouter();

//   const handleAddToCart = async () => {
//     if (!customVariant?.id) return;

//     const quantityNumber = Number(quantity);

//     if (quantityNumber > customVariant.realStockLevel) {
//       Toast.show({
//         type: "error",
//         text1: `Quantidade indisponível em estoque. Máximo: ${customVariant.realStockLevel}`,
//         visibilityTime: 3000,
//         position: "bottom",
//       });
//       return;
//     }

//     const variables = {
//       productVariantId: customVariant.id,
//       quantity: quantityNumber,
//            customFields: {
//           measureCode: Number(customVariant?.measureCode) || 1,
//         },
//       activeOrderInput: {
//         orderToken: {
//           channelId: customVariant.channelId || "",
//           orderType: activeOrder?.customFields?.paymentConditionType,
//         },
   
//       },
//     };

//     console.log('variables ', variables)

//     addItemToOrder({
//       variables,
//       onCompleted: (response) => {
//         if (response.addItemToOrder.__typename === "Order") {
//           refetchOrder();
//           setShowSuccessDialog(true);
//           return;
//         }
//         const errorMessage = errorApiHandler(response.addItemToOrder);
//         if (errorMessage) {
//           Toast.show({
//             type: "error",
//             text1: `${errorMessage.message}`,
//             visibilityTime: 3000,
//             position: "bottom",
//           });
//         }
//       },
//       onError: () => {
//         Toast.show({
//           type: "error",
//           text1: `Ocorreu um erro ao adicionar o produto ao carrinho`,
//           visibilityTime: 3000,
//           position: "bottom",
//         });
//       },
//     });
//   };

//   const handleGoToCart = () => {
//     onClose();
//     setShowSuccessDialog(false);
//     router.push("/cart");
//   };

//   const handleContinueScanning = () => {
//     setShowSuccessDialog(false);
//     onClose();
//   };

//   const hasStock = Boolean(customVariant?.realStockLevel && customVariant.realStockLevel > 0);

//   const handleQuantityChange = useCallback(async (newQuantity: number) => {
//     setQuantity(newQuantity);
//     return true;
//   }, []);

//   return (
//     <CustomBottomSheetModal
//       ref={ref}
//       onClose={() => {
//         onClose();
//       }}
//       enableDynamicSizing={false}
//       snapPoints={[300, "80%"]}
//     >
//       <View style={{flex: 1}}>

//       <Container>
//         {!hasStock && (
//           <View style={{ position: "absolute", top: 10, left: 20, zIndex: 3 }}>
//             <CampaignTag company="Sem estoque" variant="color_no_stock" />
//           </View>
//         )}
//         <ProductImage
//           resizeMode="contain"
//           source={
//             productInitial?.featuredAsset?.preview
//               ? { uri: productInitial.featuredAsset.preview }
//               : require("@/assets/no-image.png")
//           }
//         />
//         <ProductInfoContainer>
//           <ProductName numberOfLines={3}>{productInitial?.name}</ProductName>
//           {productGtin && <ProductCode>{productGtin}</ProductCode>}
//           <QuantityPicker
//             value={quantity.toString()}
//             onQuantityChange={handleQuantityChange}
//             minQuantity={customVariant?.customFields?.minimumQuantity || 1}
//             multiple={customVariant?.customFields?.multiple || 1}
//             inStock={hasStock}
//             editable
//             maxStock={customVariant?.realStockLevel}
//           />

//      <FooterContainer>
//           <CancelButton onPress={onClose}>
//             <CancelButtonText>Cancelar</CancelButtonText>
//           </CancelButton>
//           <AddButton
//             disabled={isLoading || !hasStock}
//             onPress={handleAddToCart}
//           >
//             {isLoading ? <ActivityIndicator color="#FFF" /> : <ShoppingBag color='#FFF' width={24} height={24} />}
//             <AddButtonText>Adicionar</AddButtonText>
//           </AddButton>
//         </FooterContainer>          
//         </ProductInfoContainer>
              
//       </Container>
      
//       <Portal>
//         <Dialog visible={showSuccessDialog} onDismiss={() => setShowSuccessDialog(false)}>
//           <Dialog.Title style={{ fontSize: 20 }}>Produto adicionado com sucesso</Dialog.Title>
//           <Dialog.Content>
//             <Text>Deseja ir para o carrinho?</Text>
//           </Dialog.Content>
//           <Dialog.Actions>
//             <PaperButton onPress={handleContinueScanning}>Continuar escaneando</PaperButton>
//             <PaperButton onPress={handleGoToCart}>Ir para o carrinho</PaperButton>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>

//       </View>

//     </CustomBottomSheetModal>
//   );
// });
