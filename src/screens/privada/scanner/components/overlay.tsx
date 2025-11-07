import theme from "@/theme";
import * as React from "react";
import { Dimensions, View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export interface OverlayProps extends SvgProps {
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export function Overlay({ topContent, bottomContent, ...props }: OverlayProps) {
  // previne que o overlay cubra a tela inteira (o +2 é uma prática comum)
  const width = WIDTH + 2;
  const height = HEIGHT + 2;

  const holeWidth = 311;
  const holeHeight = 226;
  const holeRadius = 21;

  const holeX = (width - holeWidth) / 2;
  // 💡 AJUSTE PRINCIPAL AQUI: Define a posição Y do topo do furo.
  // 50 é um valor de padding para afastar do topo (pode ajustar).
  const HOLE_TOP_PADDING = 80; 
  const holeY = HOLE_TOP_PADDING; // Começa a 80px do topo.

  const holePath = `
    M${holeX + holeRadius} ${holeY}
    H${holeX + holeWidth - holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX + holeWidth} ${holeY + holeRadius
    }
    V${holeY + holeHeight - holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX + holeWidth - holeRadius} ${holeY + holeHeight
    }
    H${holeX + holeRadius}
    A${holeRadius} ${holeRadius} 0 0 1 ${holeX} ${holeY + holeHeight - holeRadius
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
    A${cornerRadius} ${cornerRadius} 0 0 1 ${borderX + borderWidth} ${borderY + cornerRadius
    }
    V${borderY + cornerLength}

    M${borderX + borderWidth} ${borderY + borderHeight - cornerLength}
    V${borderY + borderHeight - cornerRadius}
    A${cornerRadius} ${cornerRadius} 0 0 1 ${borderX + borderWidth - cornerRadius
    } ${borderY + borderHeight}
    H${borderX + borderWidth - cornerLength}

    M${borderX + cornerLength} ${borderY + borderHeight}
    H${borderX + cornerRadius}
    A${cornerRadius} ${cornerRadius} 0 0 1 ${borderX} ${borderY + borderHeight - cornerRadius
    }
    V${borderY + borderHeight - cornerLength}
  `;

  // Calcula a altura da área acima do scanner
  const topAreaHeight = holeY + (borderY - holeY) + borderPadding; 
  // Calcula a altura da área abaixo do scanner
  const bottomAreaHeight = height - (holeY + holeHeight);


  return (
    <Svg
      width={width}
      height={height}
      viewBox={`1 1 ${width} ${height}`}
      {...props}
      // O Svg precisa estar em posição absoluta e preencher a tela inteira,
      // mas seus filhos (View) devem se comportar como esperado.
      style={{ position: 'absolute' }} 
    >
      {/* A View que contém o topContent precisa ter a altura exata 
        da área acima do furo para que o conteúdo comece no topo.
      */}
      <View
        style={{
          height: topAreaHeight,
          width: width, // Garante que a View ocupe toda a largura
          position: 'absolute',
          top: 0,
        }}
      >
        {topContent}
      </View>
      
      {/* A View que contém o bottomContent precisa ser posicionada 
        imediatamente abaixo do furo.
      */}
      <View
        style={{
          height: bottomAreaHeight,
          width: width, // Garante que a View ocupe toda a largura
          marginTop: holeY + holeHeight,
          position: 'absolute',
          top: 0, // Posiciona em relação ao topo do Svg
        }}
      >
        {bottomContent}
      </View>

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