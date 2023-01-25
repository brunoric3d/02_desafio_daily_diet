import styled from "styled-components/native";
import LogoImage from '@assets/logo.png'
import { ImageSourcePropType } from 'react-native'

type Props = {
  photo: ImageSourcePropType;
}

export function Header({ photo }: Props) {
  return (
    <Container>
      <Logo source={LogoImage} />
      <ProfileIcon source={photo} />
    </Container>
  )
}
const Container = styled.View`
  height: 40px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;

`


const Logo = styled.Image`
  width: 82px;
  height: 37px;
  

`

const ProfileIcon = styled.Image`
width: 40px;
height: 40px;
border-radius: 100px;
border-width: 3px;
border-color: ${({ theme }) => theme.COLORS.GRAY_2};
  `