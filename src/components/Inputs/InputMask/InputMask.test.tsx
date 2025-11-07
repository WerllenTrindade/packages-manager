import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { InputMask } from ".";

jest.mock("@/utils/masks", () => ({
  Mask: {
    format: jest.fn((mask: string, text: string) => {
      if (mask === "cpf") {
        return text.replace(/(\d{3})(?=\d)/g, "$1.");
      }
      return `masked-${text}`;
    }),
  },
}));

describe("InputMask", () => {
  it("deve renderizar o componente", () => {
    const { getByPlaceholderText } = render(
      <InputMask placeholder="Digite algo" />
    );
    expect(getByPlaceholderText("Digite algo")).toBeTruthy();
  });

  it("deve chamar onChangeText normalmente quando mask não é fornecida", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <InputMask placeholder="Digite algo" onChangeText={onChangeTextMock} />
    );

    const input = getByPlaceholderText("Digite algo");
    fireEvent.changeText(input, "1234");

    expect(onChangeTextMock).toHaveBeenCalledWith("1234");
  });

  it("deve usar defaultValue normalmente quando mask não é fornecida", () => {
    const { getByDisplayValue } = render(
      <InputMask placeholder="Digite algo" defaultValue="5678" />
    );

    expect(getByDisplayValue("5678")).toBeTruthy();
  });
});
