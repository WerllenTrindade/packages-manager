import React from "react";
import { View } from "react-native";
import { PackageCardSkeleton } from ".";

export function PackageCardSkeletonList() {
  const skeletons = Array.from({ length: 5});

  return (
    <View>
      {skeletons.map((_, index) => (
        <PackageCardSkeleton key={index} />
      ))}
    </View>
  );
}
