import { useDebounce } from "@/contexts/hooks/use-debounce";
import { usePackagesService } from "@/services/package/local/packageLocalService";
import { PackageTypes } from "@/types/package";
import { PrivateNavigation, ROUTES_PRIVATE } from "@/utils/routers";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useHome() {
   const {navigate} = useNavigation<PrivateNavigation>();
  const { getAllPackage } = usePackagesService();
  const [packages, setPackages] = useState<PackageTypes[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const loadPackages = useCallback(async () => {
    try {
      const allPackages = await getAllPackage();
      setPackages(allPackages || []);
    } catch (err) {
      console.error("Erro ao carregar pacotes:", err);
    }
  }, [getAllPackage]);

  useEffect(() => {
    loadPackages();
  }, [loadPackages]);

  const filteredPackages = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return packages.filter((pkg) => pkg.code?.toLowerCase().includes(term));
  }, [packages, debouncedSearch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPackages();
    setRefreshing(false);
  }, [loadPackages]);

  const isOpenScan = () => {
navigate(ROUTES_PRIVATE.SCANNER)
  }

  return {
    packages,
    search,
    setSearch,
    refreshing,
    filteredPackages,
    loadPackages,
    onRefresh,
    isOpenScan
  };
}
