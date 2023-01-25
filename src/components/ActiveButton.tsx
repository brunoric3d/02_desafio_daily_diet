import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type Props = {
  title: string;
  type: 'PRIMARY' | 'SECONDARY';
  pressed: null | boolean;
  onPress: () => void;
}

export function ActiveButton({ title, type, pressed, onPress }: Props) {


  return (
    <Container type={type} pressed={pressed} onPress={onPress}>
      <Circle type={type} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}


const Circle = styled.View`
  margin-right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 20px;
  background-color: ${({ theme, type }) => type === 'PRIMARY' ?
    theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK}
`;

const Title = styled.Text`
${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_2};
`}

`


const Container = styled(TouchableOpacity) <Props>`
  background-color: ${({ theme, pressed, type }) => (pressed) ?
    type === 'PRIMARY' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT :
    theme.COLORS.GRAY_6};
  margin-bottom: 20px;
  width: 100%;
  flex: 0 1 auto;
  border-width:1px;
  height: 46px;
  border-radius: 6px;
  border-color: ${({ theme, pressed, type }) => (pressed) ?
    type === 'PRIMARY' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK :
    theme.COLORS.GRAY_6};;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

