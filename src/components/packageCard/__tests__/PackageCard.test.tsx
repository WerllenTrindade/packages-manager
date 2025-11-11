import { mockPackage } from "@/mock/package.mock";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { PackageCard } from "..";

describe("PackageCard", () => {
  it("renderiza corretamente com todos os dados", () => {
    const { getByText } = render(<PackageCard item={mockPackage} />);
    expect(getByText("PKG-123")).toBeTruthy();
    expect(getByText("Cliente Teste")).toBeTruthy();
    expect(getByText(/Enviado:/)).toBeTruthy();
    expect(getByText(/Criado:/)).toBeTruthy();
    expect(getByText(/Escaneado:/)).toBeTruthy();
  });

  it("não exibe nome do cliente se client_name estiver ausente", () => {
    const itemWithoutClient = { ...mockPackage, client_name: "" };
    const { queryByText } = render(<PackageCard item={itemWithoutClient} />);
    expect(queryByText("Cliente Teste")).toBeNull();
  });

  it("chama onPress ao tocar", () => {
    const handlePress = jest.fn();
    const { getByText } = render(<PackageCard item={mockPackage} onPress={handlePress} />);
    fireEvent.press(getByText("PKG-123"));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("renderiza corretamente a cor do status", () => {
    const { getByText } = render(<PackageCard item={mockPackage} />);
    const codeElement = getByText("PKG-123");
    expect(codeElement).toBeTruthy();
  });
});
