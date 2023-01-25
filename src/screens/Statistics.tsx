import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css, useTheme } from "styled-components/native";
import { BackButton } from "@components/BackButton";
import { StatsBox } from "@components/StatsBox";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { mealsGetAll } from "@storage/meal/mealsGetAll";
import { Alert } from "react-native";

export function Statistics() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);


  const navigation = useNavigation();

  function ConsecutiveHealthyMeals() {
    let counter = 0;
    let max = 0;
    meals.forEach(item => {

      item.healthy ? counter++ : counter = 0;
      if (counter > max) max = counter;
    });
    return counter;
  }

  async function fetchMeals() {
    try {
      setIsLoading(true);
      const data = await mealsGetAll();

      setMeals(data);
    } catch (error) {
      Alert.alert('Refeições', 'Não foi possível carregar as refeições');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const isFocused = useIsFocused();

  useFocusEffect(useCallback(() => {
    fetchMeals()

  }, []))


  return (
    <Container>
      <HeaderContainer>
        <BackButtonContainer>
          <BackButton
            color={theme.COLORS.GREEN_DARK}
            onPress={() => { navigation.goBack() }}
          />
        </BackButtonContainer>
        <Percentage>{((meals.filter(item => item.healthy).length / meals.length) * 100).toFixed(2).toString()}%</Percentage>
        <Subtitle>das refeições dentro da dieta</Subtitle>
      </HeaderContainer>
      <StatsContainer>
        <Title>Estatísticas gerais</Title>
        <StatsRowsSection>
          <StatsBox
            color={theme.COLORS.GRAY_6}
            stat={ConsecutiveHealthyMeals()}
            title='melhor sequência de pratos dentro da dieta'
          />
          <StatsBox
            color={theme.COLORS.GRAY_6}
            stat={meals.length}
            title='refeições registradas'
          />
        </StatsRowsSection>
        <StatsColumnsSection>
          <StatsBox
            color={theme.COLORS.GREEN_LIGHT}
            stat={meals.filter(item => item.healthy).length}
            title='refeições dentro da dieta'
          />
          <VerticalGap />
          <StatsBox
            color={theme.COLORS.RED_LIGHT}
            stat={meals.filter(item => !item.healthy).length}
            title='refeições fora da dieta'
          />
        </StatsColumnsSection>
      </StatsContainer>
    </Container>


  )
}

const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GREEN_LIGHT};
  flex-direction:column;
  
`

const HeaderContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GREEN_LIGHT};
  align-items: center;
  padding:24px;
  padding-top: 30px;
  width:100%;
  height:160px;
`
const BackButtonContainer = styled.View`
  position: absolute;
  top:24px;
  left:30px;
`
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

const StatsContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  border-radius: 20px;
  margin-top: -30px;
  padding:24px;
  padding-top: 30px;
  height: 100%;
`
const Title = styled.Text`
${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_1};
  `}
`

const StatsRowsSection = styled.View`
margin-top: 30px;
flex-direction: column;
height: 250px;
width: 100%;
`

const StatsColumnsSection = styled.View`
flex-direction: row;
height: 130px;
justify-content: space-between;
`

const VerticalGap = styled.View`
  height: 100%;
  width: 12px;
` 