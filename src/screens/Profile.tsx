import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from 'native-base';
import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/brunoric3d.png')

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        aspect: [4, 4],
        allowsEditing: true,

      });

      if (photoSelected.canceled) {
        return;
      }
      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoUri);

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "A imagem selecionada é muito grande. Escolha uma imagem menor que 5MB.",
            bgColor: "red.500"
          })
        }
        setUserPhoto(photoUri)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false);
    }



  }
  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />
      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ?
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor="gray.500"
              endColor="gray.400"
            />
            : <UserPhoto
              size={PHOTO_SIZE}
              source={{ uri: userPhoto }}
              alt="Foto de perfil"
            />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input
            placeholder="Nome"
            bg="gray.600"
          />
          <Input
            placeholder="Email"
            bg="gray.600"
            isDisabled
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily='heading'>
            Alterar senha
          </Heading>
          <Input
            placeholder="Senha antiga"
            bg="gray.600"
            secureTextEntry
          />
          <Input
            placeholder="Nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Input
            placeholder="Confirme nova senha"
            bg="gray.600"
            secureTextEntry
          />

          <Button title='Confirmar' mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}