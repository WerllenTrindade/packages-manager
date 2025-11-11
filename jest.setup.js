/* eslint-env jest */
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
/* eslint-disable no-undef */
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

