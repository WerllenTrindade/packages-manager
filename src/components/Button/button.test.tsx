import { fireEvent, render } from '@testing-library/react-native';
import { Button } from './index';

describe("Button Component", () => {
    const functionMock = jest.fn();

    it("Renderização", () => {
        const { getByText } = render(<Button description="Click aqui" onPress={functionMock} />);
        expect(getByText("Click aqui")).toBeTruthy();
    });

    it("Click", () => {
        const { getByTestId } = render(<Button description="Click aqui" onPress={functionMock} />);
        fireEvent.press(getByTestId('ui-button-test'));
        expect(functionMock).toHaveBeenCalled();
    });
});