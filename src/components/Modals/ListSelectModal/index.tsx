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
import { s } from "./styles";

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
        <Pressable style={s.overlay} onPress={closeModal}>
          <View style={s.modalContainer}>
            <View style={s.handleContainer}>
              <View style={s.handle} />
            </View>

            <Text style={s.title}>{title}</Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={arrItems}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity onPress={() => selectItem(item)} style={s.optionButton}>
                    <Text style={s.optionText}>{item?.label}</Text>
                  </TouchableOpacity>

                  {index < arrItems.length - 1 && <View style={s.separator} />}
                </>
              )}
              ListEmptyComponent={
                <View style={s.emptyContainer}>
                  <AntDesign name="exclamation-circle" size={24} color="gray" />
                  <Text style={s.emptyText}>
                    Nenhuma opção disponível no momento.
                  </Text>
                </View>
              }
              contentContainerStyle={s.listContent}
            />
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}
