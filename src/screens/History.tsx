import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryDTO } from '@dtos/HistoryDTO';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { Heading, SectionList, Text, useToast, VStack } from 'native-base';
import { useCallback, useState } from 'react';

type ExerciseSection = {
  title: string;
  data: HistoryDTO[],
}

export function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<ExerciseSection[]>([]);

  const toast = useToast();


  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get(`${api.defaults.baseURL}/history`);
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

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []));


  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico' />
      {isLoading ? <Loading /> :
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          renderSectionHeader={({ section }) => (
            <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily='heading'>
              {section.title}
            </Heading>
          )}
          px={4}
          contentContainerStyle={exercises?.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda
            </Text>
          )}
        />
      }

    </VStack>
  )
}