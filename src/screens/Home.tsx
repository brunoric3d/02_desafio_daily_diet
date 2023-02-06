import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Loading } from '@components/Loading';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('costas');
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : 'Não foi possível carregar os grupos';

      toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function fecthSelectedGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);

    } catch (error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : 'Não foi possível carregar os exercícios';

      toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, [])

  useFocusEffect(useCallback(() => {
    fecthSelectedGroup();
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        maxH={10}
        my={10}
        minH={10}
      />
      {
        isLoading ? <Loading /> :

          <VStack flex={1} px={8}>
            <HStack justifyContent="space-between" mb={5} >
              <Heading color="gray.200" fontSize="md" fontFamily='heading'>
                Exercícios
              </Heading>
              <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
            </HStack>
            <FlatList
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard
                  onPress={() => handleOpenExerciseDetails(item.id)}
                  data={item}
                />
              )}
              _contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}

            />
          </VStack>
      }

    </VStack>
  )
}