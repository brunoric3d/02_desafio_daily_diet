import styled, { css } from "styled-components/native"
import { ArrowUpRight, IconProps } from "phosphor-react-native";

type Props = {
  percentage: number;

}

export function HighlightStats({ percentage }: Props) {

  return (
    <Container percentage={percentage}>
      <Icon percentage={percentage} />
      <Percentage>{percentage}%</Percentage>
      <Subtitle>das refeições dentro da dieta</Subtitle>
    </Container>
  )
}


//////////////****************STYLYING****************//////////////


const Container = styled.View<Props>`
  width:100%;
  height:102px;
  background-color: ${({ theme, percentage }) => percentage > 50 ?
    theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

const Percentage = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_1};
  `}
`;

const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_2};
  `}
`

const Icon = styled(ArrowUpRight).attrs<Props>(({ theme, percentage }) => ({
  size: 24,
  color: percentage > 50 ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
})) <Props>`
position: absolute;
right: 8px;
top: 8px;

`