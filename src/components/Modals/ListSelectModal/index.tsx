
import theme from "@/theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Contain, Container, Title } from "./styles";

interface DataProps {
  closeModal: () => void;
  title: string;
  selectItem: (item: any) => void;
  arrItems: any[];
}

export function ListSelectModal({
  closeModal,
  selectItem,
  title,
  arrItems,
}: DataProps) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Modal animationType="slide" transparent statusBarTranslucent>
        <Pressable style={{ flex: 1 }} onPress={closeModal}>
          <Container>
            <Contain>
              {/* Traço superior simulando BottomSheet */}
              <View style={{ alignItems: "center", paddingVertical: 10 }}>
                <View
                  style={{
                    width: 80,
                    // height: 4,
                    borderRadius: 10,
                    backgroundColor: "#6D737F",
                  }}
                />
              </View>

              {/* Título */}
              <Title>{title}</Title>

              {/* Lista */}
              <FlatList
                showsVerticalScrollIndicator={false}
                data={arrItems}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <>
                    <TouchableOpacity
                      onPress={() => selectItem(item)}
                      style={{
                        paddingVertical: 15,
                      }}
                    >
                      <Text style={{
                        fontFamily: theme.fonts.interMedium_500,
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 40,
                      }}>{item?.label}</Text>
                    </TouchableOpacity>

                    {/* Adiciona a linha separadora entre itens, exceto o último */}
                    {index < arrItems.length - 1 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "#E0E0E0",
                        }}
                      />
                    )}
                  </>
                )}
                ListEmptyComponent={
                  <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <AntDesign name="exclamation-circle" size={24} color="gray" />
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: "gray",
                        textAlign: "center",
                      }}
                    >
                      Nenhuma opção disponível no momento.
                    </Text>
                  </View>
                }
                contentContainerStyle={{
                  paddingBottom: 15,
                }}
              />
            </Contain>
          </Container>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}
