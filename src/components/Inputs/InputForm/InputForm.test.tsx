import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputForm } from ".";

const Wrapper = (props: any) => {
  const methods = useForm({ defaultValues: { test: "" } });
  return (
    <FormProvider {...methods}>
      <InputForm name="test" control={methods.control} {...props} />
    </FormProvider>
  );
};

describe("InputForm", () => {
  it("deve renderizar o título corretamente", () => {
    const { getByText } = render(<Wrapper title="Teste" require />);
    expect(getByText("Teste*")).toBeTruthy();
  });

  it("deve atualizar o valor ao digitar", () => {
    const { getByPlaceholderText } = render(
      <Wrapper title="Teste" placeholder="Digite algo" />
    );

    const input = getByPlaceholderText("Digite algo");
    fireEvent.changeText(input, "Novo valor");
    expect(input.props.value).toBe("Novo valor");
  });

  it("deve limpar o valor quando clearable=true e valor preenchido", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Wrapper title="Teste" placeholder="Digite algo" clearable />
    );

    const input = getByPlaceholderText("Digite algo");
    fireEvent.changeText(input, "Valor");
    expect(input.props.value).toBe("Valor");

    const clearButton = getByTestId("clear-button");
    fireEvent.press(clearButton);
    expect(input.props.value).toBe("");
  });

  it("deve alternar secureTextEntry quando houver eye button", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Wrapper title="Senha" placeholder="Senha" secureTextEntry />
    );

    const input = getByPlaceholderText("Senha");
    const eyeButton = getByTestId("eye-button");

    expect(input.props.secureTextEntry).toBe(true);

    fireEvent.press(eyeButton);
    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(eyeButton);
    expect(input.props.secureTextEntry).toBe(true);
  });
});
