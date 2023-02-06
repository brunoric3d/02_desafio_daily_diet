import BodySVG from '@assets/body.svg';
import RepetitionsSVG from '@assets/repetitions.svg';
import SeriesSVG from '@assets/series.svg';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Box, Heading, HStack, Icon, Image, ScrollView, Text, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseDone, setExerciseDone] = useState(false);

  const toast = useToast();

  const route = useRoute();

  const { exerciseId } = route.params as RouteParamsProps;

  async function fetchExerciseDetails() {
    setIsLoading(true);
    try {
      const response = await api.get(`${api.defaults.baseURL}/exercises/${exerciseId}`);
      setExercise(response.data);


    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : 'Não foi possível carregar os grupos';

      toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseDone() {
    try {
      setExerciseDone(true);
      await api.post(`${api.defaults.baseURL}/history`, { exercise_id: exerciseId });
    } catch (error) {
      setExerciseDone(false);
      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : 'Não foi possível registrar o exercício';

      toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      navigation.navigate('history');
      toast.show({
        title: 'Parabéns, exercício registrado.',
        placement: 'top',
        bgColor: 'green.700'
      })
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (

    isLoading ? <Loading /> :
      <VStack flex={1}>
        <VStack px={8} bg="gray.600" pt={12}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>
          <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
            <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily='heading'>{exercise?.name}</Heading>
            <HStack alignContent="center">
              <BodySVG />
              <Text color="gray.200" ml={1} textTransform="capitalize">{exercise?.group}</Text>
            </HStack>
          </HStack>
        </VStack>


        <ScrollView>
          <VStack p={8}>
            <Box rounded='lg' mb={3} overflow='hidden'>
              <Image
                w="full"
                h={80}
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                alt="Foto do exercicio"
                resizeMode="cover"
              />

            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                <HStack>
                  <SeriesSVG />
                  <Text color="gray.200" ml="2">{exercise?.series} séries</Text>
                </HStack>
                <HStack>
                  <RepetitionsSVG />
                  <Text color="gray.200" ml="2">{exercise?.repetitions} reps</Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como concluído"
                onPress={() => handleExerciseDone()}
                isLoading={exerciseDone}
              />
            </Box>
          </VStack>
        </ScrollView>


      </VStack>


  )
}