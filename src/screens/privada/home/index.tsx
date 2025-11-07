import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PackageCard } from "@/components/packageCard";
import { Search } from "@/components/Search";
import { s } from "./styles";
import { useHome } from "./useHome";

export function Home() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const {
    search,
    isOpenScan,
    setSearch,
    filteredPackages,
    refreshing,
    onRefresh,
  } = useHome();

  const renderItem = ({ item }: any) => <PackageCard item={item} />;

  return (
    <View style={[s.container, { paddingTop: top }]}>
      <View style={{ paddingBottom: 15 }}>
        <Text style={s.headerText}>Pacotes</Text>

        <View style={s.searchContainer}>
          <View style={s.searchWrapper}>
            <Search
              placeholder="Buscar por código do pacote"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity
            style={s.scanButton}
            onPress={isOpenScan}
          >
            <MaterialCommunityIcons name="qrcode-scan" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.listContainer}>
        <FlatList
          data={filteredPackages || []}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingBottom: bottom}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={s.emptyText}>Nenhum pacote encontrado</Text>
          }
        />
      </View>
    </View>
  );
}
