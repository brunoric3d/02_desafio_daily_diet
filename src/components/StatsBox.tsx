import styled, { css } from "styled-components/native"

type Props = {
  stat: number;
  title: string;
  color: string;
}

export function StatsBox({ stat, title, color }: Props) {
  return (
    <Container color={color}>
      <Stat>{stat.toString()}</Stat>
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled.View<{ color: string }>`
flex:1;
width: 100%;
height: 100%;
background-color: ${({ color }) => color};
align-items: center;
justify-content: center;
border-radius: 8px;
margin-bottom: 10px;
`

const Stat = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_1};
  `}
  margin-bottom: 10px;
`;

const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_2};
    text-align: center;
`}
`
