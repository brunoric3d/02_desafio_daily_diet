import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { Center, VStack, HStack, FlatList, Text, Heading } from 'native-base';
import { useState } from 'react';
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Home() {
  const [groups, setGroups] = useState(['Biceps', 'Ombros', 'Costas', 'Triceps']);
  const [groupSelected, setGroupSelected] = useState('costa');
  const [exercises, setExercises] = useState(['Puxada', 'Remada', 'Levantamento'])

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }
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
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5} >
          <Heading color="gray.200" fontSize="md" fontFamily='heading'>
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
        </HStack>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          _contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}

        />
      </VStack>




    </VStack>
  )
}