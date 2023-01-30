import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { VStack, SectionList, Heading, Text } from 'native-base';
import { useState } from 'react';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '25.04.22',
      data: ['Puxada fronta', 'Remada lateral']
    },
    {
      title: '25.04.22',
      data: ['Puxada fronta', 'Remada lateral']
    },
  ])
  return (
    <VStack flex={1}>
      <ScreenHeader title='Exercise' />
      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily='heading'>
            {section.title}
          </Heading>
        )}
        px={4}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda
          </Text>
        )}
      />
    </VStack>
  )
}