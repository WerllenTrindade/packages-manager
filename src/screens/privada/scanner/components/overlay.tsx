import theme from "@/theme";
import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function Overlay() {
  const width = WIDTH + 2;
  const height = HEIGHT + 2;

  const holeWidth = 311;
  const holeHeight = 226;
  const holeRadius = 21;

  const holeX = (width - holeWidth) / 2;
  const HOLE_TOP_PADDING = 60;
  const holeY = HOLE_TOP_PADDING;
  const holePath = `
    M${holeX + holeRadius} ${holeY}
    H${holeX + holeWidth - holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX + holeWidth} ${
    holeY + holeRadius
  }
    V${holeY + holeHeight - holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX + holeWidth - holeRadius} ${
    holeY + holeHeight
  }
    H${holeX + holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX} ${
    holeY + holeHeight - holeRadius
  }
    V${holeY + holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX + holeRadius} ${holeY}
    Z
  `;

  const borderPadding = 20;
  const cornerLength = 28;
  const cornerRadius = 21;

  const borderX = holeX - borderPadding;
  const borderY = holeY - borderPadding;
  const borderWidth = holeWidth + borderPadding * 2;
  const borderHeight = holeHeight + borderPadding * 2;

  const cornerPath = `
    M${borderX} ${borderY + cornerLength}
    V${borderY + cornerRadius}
    A${cornerRadius} ${cornerRadius} 0 0 1 ${borderX + cornerRadius} ${borderY}
    H${borderX + cornerLength}

    M${borderX + borderWidth - cornerLength} ${borderY}
    H${borderX + borderWidth - cornerRadius}
    A${cornerRadius} ${cornerRadius} 0 0 1 ${borderX + borderWidth} ${
    borderY + cornerRadius
  }
    V${borderY + cornerLength}

    M${borderX + borderWidth} ${borderY + borderHeight - cornerLength}
    V${borderY + borderHeight - cornerRadius}
    A${cornerRadius} ${cornerRadius} 0 0 1 ${
    borderX + borderWidth - cornerRadius
  } ${borderY + borderHeight}
    H${borderX + borderWidth - cornerLength}

    M${borderX + cornerLength} ${borderY + borderHeight}
    H${borderX + cornerRadius}
    A${cornerRadius} ${cornerRadius} 0 0 1 ${borderX} ${
    borderY + borderHeight - cornerRadius
  }
    V${borderY + borderHeight - cornerLength}
  `;

  const topAreaHeight = holeY + (borderY - holeY) + borderPadding;

  return (
    <Svg width={width} height={height} viewBox={`1 1 ${width} ${height}`}>
 

      <Path
        fill="rgba(0, 0, 0, 0.8)"
        fillRule="evenodd"
        d={`
            M0 0 H${width + 2} V${height + 2} H0 Z
            ${holePath}
          `}
      />
      <Path d={holePath} stroke="white" strokeWidth={4} fill="none" />
      <Path
        d={cornerPath}
        stroke={theme.colors.gray[600]}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
