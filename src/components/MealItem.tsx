import styled, { css } from "styled-components/native"
import { Text, TouchableOpacity, View } from "react-native"
import { format } from 'date-fns';


type Props = {
  time: string;
  name: string;
  healthy: boolean
  onPress: () => void
}


export function MealItem({ time, name, healthy, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Container2>
        <Time>{format(new Date(time), 'hh:mm')}</Time>
        <Separator />
        <Name>{name}</Name>
      </Container2>
      <Healthy healthy={healthy} />
    </Container>
  )
}

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_5};
  border-width: 1px;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 5px 0;

`
const Container2 = styled.View`
  flex-direction: row;
  align-items: center;
  `

const Separator = styled.View`
  width: 2px;
  height: 100%;
  margin: 0 10px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_4};
`

const Time = styled.Text`
${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_1};
  `}

`;

const Name = styled.Text`
${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_1};
  `}
`;

const Healthy = styled.View<Props>`
width: 15px;
height: 15px;
background-color: ${({ theme, healthy }) => healthy ?
    theme.COLORS.GREEN_MID : theme.COLORS.RED_MID};
border-radius: 50px
  `