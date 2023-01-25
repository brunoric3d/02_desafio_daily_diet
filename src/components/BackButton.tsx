import { ArrowLeft } from "phosphor-react-native"
import styled from "styled-components/native"

type Props = {
  color: string;
  onPress: () => void;
}

export function BackButton({ onPress, color }: Props) {
  return (
    <Container onPress={onPress}>
      <Icon color={color} />
    </Container>

  )
}
const Container = styled.TouchableOpacity`
align-items: center;
justify-content: center;
flex: 1;
`
const Icon = styled(ArrowLeft).attrs(({ color }) => ({
  color: color,
  size: 24
}))``