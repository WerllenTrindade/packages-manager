import { fonts } from "@/themes/fonts";
import { fontDimensions } from '@/utils';
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  width: 100%;
  background-color: rgba(0,0,0,0.6);
  z-index: 2px;
`;

export const Contain = styled.View`
  width: 100%;
  background-color: #f0f2f5;
  padding: 0 20px;
  max-height: 90%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Line = styled.View`
height: 1px; 
background-color: #706f7021;
`

export const Title = styled.Text`
    font-family: ${fonts.robotoBold};
    font-size: ${fontDimensions(18)}px;
    color: #330266;
    padding: 25px 0 15px;
    font-weight: 600;
`