import styled, { css, useTheme } from "styled-components/native";
import { Gap } from "@components/Gap";
import { ButtonIcon } from "@components/ButtonIcon";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Image, Text } from "react-native";

import Sucess from "@assets/sucess.png";
import Failure from "@assets/failure.png";

type RouteParams = {
  healthy: string;
}

export function MealCreatedFeedback() {
  const theme = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const { healthy } = route.params as RouteParams;

  return (

    <Container>
      <Content>
        <Title healthy={healthy}>{healthy ? 'Continue assim!' : 'Que pena!'}</Title>
        <Message >{healthy ?
          <>
            Você continua<Text style={{ fontWeight: "bold", }}> dentro da dieta</Text>
            . Muito bem!
          </> :
          <>
            Você <Text style={{ fontWeight: "bold", }}>saiu da dieta </Text>
            dessa vez, mas continue se esforçando e não desista!
          </>
        }
        </Message>
        <Image source={healthy ? Sucess : Failure} />
        <ButtonsContainer>
          <ButtonIcon
            name="Ir para a página inicial"
            type='SOLID'
            onPress={() => { navigation.navigate('home') }} />
        </ButtonsContainer>

      </Content>


    </ Container>


  )
}

const Container = styled.View`
      flex:1;
      `

const Title = styled.Text`
   margin-bottom: 20px;
      ${({ theme, healthy }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${healthy ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
  `}
      `

const Content = styled.View`
      background-color: ${({ theme }) => theme.COLORS.WHITE};
      align-items: center;
      border-radius: 20px;
      padding:25px;
      justify-content: center;
      flex:1;
      `

const ButtonsContainer = styled.View`
margin-top: 30px;
flex-direction: column;
`


const Message = styled.Text`
      margin-bottom: 30px;

      ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_2};
    text-align: center;
`}

      `
const MealName = styled.Text`
 margin-bottom: 5px;

${({ theme }) => css`
font-size: ${theme.FONT_SIZE.LG}px;
font-family: ${theme.FONT_FAMILY.BOLD};
color: ${theme.COLORS.GRAY_1}`};
`;
const MealDescription = styled.Text`
 margin-bottom: 20px;

${({ theme }) => css`
font-size: ${theme.FONT_SIZE.SM}px;
font-family: ${theme.FONT_FAMILY.REGULAR};
color: ${theme.COLORS.GRAY_2}`};
`;
const MealDateTitle = styled.Text`
  margin-bottom: 5px;

  ${({ theme }) => css`
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.GRAY_1}`};
`;

const MealDate = styled.Text`
  margin-bottom: 20px;

  ${({ theme }) => css`
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.GRAY_2}`};
`;

const MealTagContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_6};
  width: 170px;
  border-radius: 100px;
  height: 34px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const MealTagCircle = styled.View`
  margin-right: 10px;
  background-color: ${({ theme, healthy }) =>
    healthy ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
  width: 10px;
  height: 10px;
  border-radius: 100px;
`;
const MealTagTitle = styled.Text``;
