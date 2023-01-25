import { BackButton } from "@components/BackButton";
import { LabeledTextInput } from "@components/LabeledTextInput";
import { JSXElementConstructor, ReactElement, useCallback, useEffect, useReducer, useState } from "react";
import { Platform, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css, useTheme } from "styled-components/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Gap } from "@components/Gap";
import { ActiveButton } from "@components/ActiveButton";
import { ButtonIcon } from "@components/ButtonIcon";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { mealCreate } from "@storage/meal/mealCreate";
import { format } from 'date-fns';
import uuid from 'react-native-uuid'
import { mealGetOne } from "@storage/meal/mealGetOne";
import { useForm, Controller, ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn } from 'react-hook-form';
import { Meal } from "@storage/meal/mealDTO";
import { mealUpdate } from "@storage/meal/mealUpdate";

type RouteParams = {
  id?: string;
}


export function NewMeal() {
  const theme = useTheme();

  const [screenMode, setScreenMode] = useState('');
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState<boolean>(false);


  const uid = uuid.v4();

  const { setValue, getValues, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      id: uid,
      name: "",
      description: "",
      time: new Date(),
      date: new Date(),
      healthy: false,
    }
  });


  function onDateChange(event, selectedDate) {

    const currentDate = selectedDate;
    setShow(false);
    mode === 'date' ?
      setValue('date', currentDate) : setValue('time', currentDate)

  };

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  function showMode(currentMode: string) {
    setShow(true);
    setMode(currentMode);
  };

  function showDatepicker() {
    showMode('date');
  };

  function showTimepicker() {
    showMode('time');
  };


  async function handleSubmitNewMeal(data: Meal) {
    console.log(data)

    try {
      await mealCreate(data)
    } catch (error) {
      throw error;
    }
    navigation.navigate('mealCreatedFeedback', { healthy: getValues('healthy') })

  }

  async function handleSubmitEditMeal(data: Meal) {

    try {
      await mealUpdate(data)
    } catch (error) {
      throw error;
    }
    navigation.navigate('home')
  }


  const fetchMeal = async () => {
    return await mealGetOne(id)
  }

  useEffect(() => {
    (async () => {
      if (id === 'new') {
        setScreenMode('new');
      } else {
        setScreenMode('edit');
        const singleMeal = await fetchMeal();
        reset(singleMeal)
      }
    })();
    return () => { }
  }, [])


  return (

    <Container>
      <HeaderContainer>
        <TitleContainer>
          <BackButtonContainer>
            <BackButton
              color={theme.COLORS.GRAY_3}
              onPress={() => { navigation.goBack() }} />
          </BackButtonContainer>
          <Title>{screenMode === 'edit' ? 'Editar refeição' : 'Nova refeição'}</Title>
          <BackButtonContainer>
          </BackButtonContainer>
        </TitleContainer>

      </HeaderContainer>
      <Content>
        <FormContainer>
          <Controller
            control={control}
            render={
              ({ field: { onChange, onBlur, value } }) => (
                <LabeledTextInput
                  label="Nome"
                  disabled
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                />

              )
            }
            name={"name"}
          />
          <Controller
            control={control}
            render={
              ({ field: { onChange, onBlur, value } }) => (
                <LabeledTextInput
                  label="Descrição"
                  disabled
                  size={120}
                  multiline
                  textAlignVertical="top"
                  onChangeText={value => onChange(value)}
                  value={value}
                  onBlur={onBlur}
                />
              )
            }
            name={"description"}
          />
          <DateContainer>

            <Controller
              control={control}
              render={
                () => (
                  <LabeledTextInput
                    label="Data"
                    editable={false}
                    onPress={() => showDatepicker()}
                    value={format(new Date(getValues('date')), 'dd/MM/yy')}
                  />)}
              name={"date"}
            />
            <Gap x={20} />
            <Controller
              control={control}
              render={
                () => (
                  <LabeledTextInput
                    label="Hora"
                    editable={false}
                    onPress={() => showTimepicker()}
                    value={format(new Date(getValues('time')), 'hh:mm')}
                  />)}
              name={"time"}
            />

          </DateContainer>
          <Switch>
            <Label>Dentro da dieta?</Label>
            <Controller
              control={control}
              render={
                ({ field: { onChange } }) => (
                  <SwitchFormContainer>

                    <ActiveButton
                      title="Sim"
                      type={"PRIMARY"}
                      onPress={() => onChange(true)}
                      pressed={getValues('healthy')}
                    />
                    <Gap x={10} />
                    <ActiveButton
                      title="Não"
                      type={"SECONDARY"}
                      onPress={() => onChange(false)}
                      pressed={!getValues('healthy')}
                    />
                  </SwitchFormContainer>

                )
              }
              name={"healthy"}
            />

          </Switch>
        </FormContainer>

        <SubmitButtonContainer>
          <ButtonIcon
            name="Cadastrar refeição"
            type="SOLID"
            showIcon={false}
            onPress={handleSubmit(data => screenMode === 'edit' ?
              handleSubmitEditMeal(data) : handleSubmitNewMeal(data)
            )}
          />
        </SubmitButtonContainer>

      </Content>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mode === 'date' ? new Date(getValues('date')) : new Date(getValues('time'))}
          mode={mode}
          is24Hour={true}
          onChange={onDateChange}
        />
      )}

    </Container>

  )
}

const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS.GRAY_5};
  flex:1;
`
const SubmitButtonContainer = styled.View`
width:100%;
flex-direction: column;
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
const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const FormContainer = styled.View`
  width:100%;
  flex-direction: column;
`


const Switch = styled.View`
`

const SwitchFormContainer = styled.View`
flex-direction: row;
`

const Label = styled.Text`
margin-bottom: 5px;

${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_2};
`}

`
