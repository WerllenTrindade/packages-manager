import { PackageCard } from "@/components/packageCard";
import { Search } from "@/components/Search";
import { PackageCardSkeletonList } from "@/components/Skeletons/SKTCardHome/PackageCardSkeletonList";
import { PackageTypes } from "@/types/package";
import { PrivateNavigation, ROUTES_PRIVATE } from "@/utils/routers";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "./styles";
import { useHome } from "./useHome";

export function Home() {
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation<PrivateNavigation>();
  const {
    search,
    isOpenScan,
    setSearch,
    filteredPackages,
    refreshing,
    isLoadingCard,
    onRefresh,
    handleSignOut
  } = useHome();

  const renderItem = useCallback(
    ({ item }: { item: PackageTypes }) => (
      <PackageCard
        onPress={() =>
          navigate(ROUTES_PRIVATE.PACKAGE_DETAILS, {
            code: item.code,
          })
        }
        item={item}
      />
    ),
    [navigate]
  );

  return (
    <View style={[s.container, { paddingTop: top }]}>
      <StatusBar barStyle={"light-content"} />
      <View style={{ paddingBottom: 15 }}>
        <View style={s.headerContain}>
          <Text style={s.headerText}>Pacotes</Text>
        <TouchableOpacity onPress={handleSignOut} style={{alignItems: "baseline"}}>
          <FontAwesome name="sign-out" size={28} color="white" />
        </TouchableOpacity>
        </View>

        <View style={s.searchContainer}>
          <View style={s.searchWrapper}>
            <Search
              placeholder="Buscar por código do pacote"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity style={s.scanButton} onPress={isOpenScan}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.listContainer}>
        {
          isLoadingCard ?
          <PackageCardSkeletonList/>
          :
             <FlatList
          data={filteredPackages || []}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: bottom }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={s.emptyText}>Nenhum pacote encontrado</Text>
          }
        />
        }
     
      </View>
    </View>
  );
}
