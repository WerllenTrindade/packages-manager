import Feather from "@expo/vector-icons/Feather";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Search } from ".";

describe("Search", () => {
  it("deve renderizar o ícone padrão quando nenhum for passado", () => {
    const { getByTestId } = render(<Search testID="search-input" />);
    const icon = getByTestId("search-icon") || null;

    expect(icon).toBeTruthy();
  });

  it("deve renderizar um ícone customizado quando passado", () => {
    const CustomIcon = () => <Feather name="arrow-left" size={20} color="red" testID="custom-icon" />;
    const { getByTestId, queryByTestId } = render(<Search icon={<CustomIcon />} />);
    
    expect(getByTestId("custom-icon")).toBeTruthy();
    expect(queryByTestId("search-icon")).toBeNull();
  });

  it("deve atualizar o valor do input quando digitado", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Search placeholder="Buscar" onChangeText={onChangeText} />
    );

    const input = getByPlaceholderText("Buscar");
    fireEvent.changeText(input, "React Native");

    expect(onChangeText).toHaveBeenCalledWith("React Native");
  });

it("deve aplicar estilos customizados ao container", () => {
  const { getByTestId } = render(
    <Search containerStyle={{ backgroundColor: "red" }} />
  );

  const container = getByTestId("search-container");
  expect(container.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ backgroundColor: "red" })])
  );
});

});
