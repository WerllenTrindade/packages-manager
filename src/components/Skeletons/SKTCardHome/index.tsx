import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export function PackageCardSkeleton() {
  const contentWidth = width - 32; 
  const paddingRight = 16;
  const offsetRight = 16;

  return (
    <View style={s.card}>
      <View style={s.gradientPlaceholder} />

      <View style={s.content}>
        <ContentLoader
          speed={1.2}
          width={contentWidth}
          height={90}
          backgroundColor="#E5E7EB"
          foregroundColor="#F3F4F6"
        >
          <Rect x="0" y="4" rx="4" ry="4" width="100" height="16" />
          <Rect
            x={contentWidth - 50 - paddingRight - offsetRight}
            y="4"
            rx="4"
            ry="4"
            width="50"
            height="16"
          />

          <Rect x="0" y="32" rx="4" ry="4" width="140" height="14" />
          <Rect
            x={contentWidth - 50 - paddingRight - offsetRight}
            y="32"
            rx="4"
            ry="4"
            width="50"
            height="14"
          />

          <Rect x="0" y="56" rx="4" ry="4" width="160" height="12" />

          <Rect x="0" y="76" rx="4" ry="4" width="100" height="10" />
          <Rect
            x={contentWidth - 100 - paddingRight - offsetRight}
            y="76"
            rx="4"
            ry="4"
            width="100"
            height="10"
          />
        </ContentLoader>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingRight: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    flexDirection: "row",
    overflow: "hidden",
  },
  gradientPlaceholder: {
    backgroundColor: "#E5E7EB",
    width: 12,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 16,
    justifyContent: "center",
  },
});
