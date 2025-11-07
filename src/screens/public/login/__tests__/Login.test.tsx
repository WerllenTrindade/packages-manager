// import { fireEvent, render } from '@testing-library/react-native';
// import React from 'react';
// import { SignIn } from '..';

// jest.mock('expo-router', () => ({
//   router: {
//     navigate: jest.fn(),
//   },
// }));

// jest.mock('@/hooks/use-auth', () => ({
//   useAuth: () => ({
//     isLoadingLogin: false,
//     isLoadingRedirect: false,
//   }),
// }));

// beforeAll(() => {
//   jest.spyOn(console, 'error').mockImplementation((msg) => {
//     if (typeof msg === 'string' && msg.includes('act(...)')) return;
//     console.error(msg);
//   });
// });

// describe('Login Screen', () => {
//   it('renderiza os inputs corretamente', () => {
//     const { getByPlaceholderText } = render(<SignIn />);

//     expect(getByPlaceholderText('Email ou nome de usúario')).toBeTruthy();
//     expect(getByPlaceholderText('*******')).toBeTruthy();
//   });

//   it('permite digitar nos inputs', () => {
//     const { getByPlaceholderText } = render(<SignIn />);

//     const userInput = getByPlaceholderText('Email ou nome de usúario');
//     const passwordInput = getByPlaceholderText('*******');

//     fireEvent.changeText(userInput, 'usuario@teste.com');
//     fireEvent.changeText(passwordInput, '123456');

//     expect(userInput.props.value).toBe('usuario@teste.com');
//     expect(passwordInput.props.value).toBe('123456');
//   });

//   it('aciona o botão de login', () => {
//     const { getByText } = render(<SignIn />);
//     const loginButton = getByText('Acessar minha conta');

//     fireEvent.press(loginButton);
//   });

//   it('navega para recuperação de senha', () => {
//     const { getByText } = render(<SignIn />);
//     const recoverLink = getByText('Esqueceu sua senha?');

//     fireEvent.press(recoverLink);
//     expect(require('expo-router').router.navigate).toHaveBeenCalledWith('/(auth)/recover-email');
//   });

//   it('navega para criação de conta', () => {
//     const { getByText } = render(<SignIn />);
//     const createAccountLink = getByText('Crie Conta');

//     fireEvent.press(createAccountLink);
//     expect(require('expo-router').router.navigate).toHaveBeenCalledWith('/(auth)/register');
//   });
// });
