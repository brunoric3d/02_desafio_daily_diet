import { groupBy } from 'lodash';
import { Header } from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import profilePhoto from '@assets/profile.jpeg'
import { HighlightStats } from "@components/HighlightStats";
import { ButtonIcon } from "@components/ButtonIcon";
import { Alert, Keyboard, SectionList, TouchableHighlight, TouchableOpacity } from "react-native";
import { MealItem } from "@components/MealItem";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Meal } from "@storage/meal/mealDTO";
import { mealsGetAll } from "@storage/meal/mealsGetAll";
import { format } from 'date-fns';

export function Home() {


  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [sectionMeals, setSectionMeals] = useState([]);

  const navigation = useNavigation();

  function handleShowMeal(id: any) {
    navigation.navigate('showMeal', { id })
  }

  function CreateSections(arr) {
    const obj = arr.map((x) => x);

    for (let i = 0; i < obj.length; i++) {
      const date = format(new Date(obj[i].date), 'dd.MM.yy')
      obj[i].date = date
    }


    const map = {};
    const finalArr = [];

    obj.map((item) => {
      const { date, ...rest } = item;

      if (!map[item.date]) {
        map[item.date] = true;
        finalArr.push({ date, data: [rest] });
      } else {
        const index = finalArr.findIndex(
          (i) => i.date === item.date
        );

        finalArr[index] = {
          date: finalArr[index].date,
          data: [...finalArr[index].data, rest],
        };
      }
    });

    return finalArr;
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

  }, [isFocused]))

  useEffect(() => {
    const sect = CreateSections(meals);
    setSectionMeals(sect);

  }, [meals])

  return (
    <Container>
      {isLoading ? <></> :
        <>
          <Header photo={profilePhoto} />
          {meals.length >= 1 &&
            <TouchableOpacity
              onPress={() => { navigation.navigate('statistics') }}>
              <HighlightStats
                percentage={((meals.filter(item => item.healthy).length / meals.length) * 100).toFixed(2).toString()}
              />
            </TouchableOpacity>
          }



          <Title>Refeições</Title>
          <ButtonIcon
            type="SOLID"
            showIcon icon="ADD"
            name="Nova refeição"
            onPress={() => {
              navigation.navigate('newMeal', { id: 'new' });
            }}
          />
          {meals &&
            <>
              <SectionList style={{ marginTop: 20 }}
                sections={sectionMeals.reverse()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MealItem
                    time={item.time}
                    name={item.name}
                    healthy={item.healthy}
                    onPress={() => handleShowMeal(item.id)}
                  />
                )}
                renderSectionHeader={({ section: { date } }) => (
                  <MealSectionHeader >{date}</MealSectionHeader>
                )}
              />
            </>}
        </>
      }

    </Container>
  )
}

const Container = styled(SafeAreaView)`
  flex:1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_7};
  padding: 24px;
`
const Title = styled.Text`
  margin-top: 40px;
  margin-bottom:10px;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_1};
  `}
`
const MealSectionHeader = styled.Text`
margin-top: 20px;
margin-bottom: 10px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_1};
  `}
`