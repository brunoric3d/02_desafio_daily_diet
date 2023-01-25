import { BackButton } from "@components/BackButton";
import { useCallback, useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components/native";
import { Gap } from "@components/Gap";
import { ButtonIcon } from "@components/ButtonIcon";
import { ConfirmationModal } from "@components/ConfirmationModal";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { mealGetOne } from '@storage/meal/mealGetOne'
import { Meal } from "@storage/meal/mealDTO";
import { mealRemove } from "@storage/meal/mealRemove";
import { format } from 'date-fns';

type RouteParams = {
  id: string;
}

export function ShowMeal() {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [meal, setMeal] = useState({
    id: '',
    name: '',
    description: 'asdasasdasd',
    date: 50,
    time: 50,
    healthy: false,
  });
  const [modalVisible, setModalVisible] = useState(false);


  const navigation = useNavigation();

  function handleEditMeal() {
    navigation.navigate('newMeal', { id: meal.id })
  }

  async function handleRemoveMeal() {
    try {
      await mealRemove(meal.id);
      navigation.navigate('home');
    } catch (error) {
      console.log(error);
    }

  }
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function handleShowMeal() {
    let newMeal;
    setIsLoading(true);
    try {
      newMeal = await mealGetOne(id);
    } catch (error) {
      console.log(error);
    }
    setMeal(newMeal as Meal);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    handleShowMeal()
  }, []))

  return (
    <>{isLoading ? <></> :
      <Container healthy={meal.healthy} >
        <HeaderContainer healthy={meal.healthy}>
          <TitleContainer>
            <BackButtonContainer>
              <BackButton color={theme.COLORS.GRAY_3} onPress={() => { navigation.goBack() }} />
            </BackButtonContainer>
            <Title>Refeição</Title>
            <BackButtonContainer>
            </BackButtonContainer>
          </TitleContainer>

        </HeaderContainer>
        <Content>
          <FormContainer>
            <MealName>{meal.name}</MealName>
            <MealDescription>{meal.description}</MealDescription>
            <MealDateTitle>Data e hora</MealDateTitle>
            <MealDate>{`${format(new Date(meal.date), 'dd.MM.yyyy')} às ${format(new Date(meal.time), 'hh:mm')}`}</MealDate>
            <MealTagContainer>
              <MealTagCircle healthy={meal.healthy} />
              <MealTagTitle>
                {meal.healthy ? 'dentro da dieta' : 'fora da dieta'}
              </MealTagTitle>
            </MealTagContainer>


          </FormContainer>
          <ButtonsContainer>
            <ButtonIcon name="Editar refeição" type='SOLID' showIcon icon='EDIT' onPress={() => { handleEditMeal() }} />
            <Gap y={10} />
            <ButtonIcon name="Excluir refeição" type='OUTLINE' showIcon icon='DELETE' onPress={() => { setModalVisible(true) }} />
          </ButtonsContainer>

        </Content>

        <ConfirmationModal
          message="Deseja realmente excluir o registro da refeição?"
          visible={modalVisible}
          setVisible={() => setModalVisible}
          onCancel={() => setModalVisible(false)}
          onConfirm={() => handleRemoveMeal()}
        />
      </ Container>
    }</>

  )
}

const Container = styled.View`
      background-color:${({ theme, healthy }) =>
    healthy ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
      flex:1;
      `

const Title = styled.Text`
      ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_1};
  `}
      `

const HeaderContainer = styled.View`
      align-items: center;
      padding:24px;
      padding-top: 30px;
      width:100%;
      height:110px;
      justify-content: center;
      background-color:${({ theme, healthy }) =>
    healthy ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
      `
const BackButtonContainer = styled.View`
      width: 50px;

      `


const Content = styled.View`
      background-color: ${({ theme }) => theme.COLORS.WHITE};
      align-items: center;
      border-radius: 20px;
      padding:24px;
      padding-top: 30px;
      justify-content: space-between;
      flex:1;
      `
const TitleContainer = styled.View`
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
      height: 50px;
      `

const FormContainer = styled.View`
      width:100%;
      flex-direction: column;
      `
const ButtonsContainer = styled.View`
width:100%;
flex-direction: column;
`


const Label = styled.Text`
      margin-bottom: 5px;

      ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_2};
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
