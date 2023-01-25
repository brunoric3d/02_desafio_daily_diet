import styled, { css, useTheme } from "styled-components/native"
import { Plus, Trash, Pencil } from 'phosphor-react-native'

type IconTypes = 'ADD' | 'EDIT' | 'DELETE';

type Props = {
  name: string;
  type: 'SOLID' | 'OUTLINE';
  icon?: IconTypes,
  showIcon?: boolean;
  onPress: () => void;
}

export function ButtonIcon({ name, showIcon = false, type, icon, onPress }: Props) {
  const theme = useTheme();

  const icons = {
    ADD: <Plus type={type} size={20} color={
      type === 'SOLID' ? theme.COLORS.WHITE : theme.COLORS.GRAY_1
    } style={{ marginRight: 10 }} />,
    EDIT: <Pencil type={type} size={20} color={
      type === 'SOLID' ? theme.COLORS.WHITE : theme.COLORS.GRAY_1
    } style={{ marginRight: 10 }} />,
    DELETE: <Trash type={type} size={20} color={
      type === 'SOLID' ? theme.COLORS.WHITE : theme.COLORS.GRAY_1
    } style={{ marginRight: 10 }} />,
  }
  return (
    <Container onPress={onPress} type={type} >
      {showIcon &&
        icons[icon]
      }

      <Title type={type}>{name}</Title>
    </Container>
  )
}

const Container = styled.TouchableOpacity<Props>`
height: 50px;
background-color: ${({ theme, type }) =>
    type === 'SOLID' ? theme.COLORS.GRAY_2 : theme.COLORS.WHITE};
border-radius: 6px;
border-color: ${({ theme }) => theme.COLORS.GRAY_2};
border-width: 1px;
justify-content: center;
align-items: center;
flex-direction: row;
padding-left: 30px;
padding-right: 30px;
`

const Title = styled.Text<Props>`
 ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${({ theme, type }) =>
      type === 'SOLID' ? theme.COLORS.WHITE : theme.COLORS.GRAY_1};
  `}
`
