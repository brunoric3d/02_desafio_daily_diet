import { TextInput, TextInputProps, TouchableHighlight, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native"

type Props = TextInputProps & TouchableOpacityProps & {
  label: string;
  onPress?: () => void;
  size?: number
}

export function LabeledTextInput({ label, onPress, size, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <Label>{label}</Label>
      <Input size={size} {...rest} />

    </Container>
  )
}

const Container = styled(TouchableOpacity)`
  margin-bottom: 20px;
  width: 100%;
  flex: 0 1 auto;
`

const Label = styled.Text`
margin-bottom: 5px;

${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_2};
`}

`
const Input = styled(TextInput) <Props>`
border-width:1px;
height: ${({ size }) => size ? size : 46}px;
border-radius: 6px;
border-color: ${({ theme }) => theme.COLORS.GRAY_5};
padding: 10px;
color: black;
`