import DefaultUserPhoto from '@assets/userPhotoDefault.png';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, Text, useToast, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import * as yup from 'yup';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  avatar: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  name: yup.string(),
  new_password:
    yup.string()
      .min(6, "A senha precisa ter ao menos 6 digitos")
      .nullable()
      .transform((value) => !!value ? value : null),
  confirm_password:
    yup.string()
      .nullable()
      .transform((value) => !!value ? value : null)
      .oneOf([yup.ref('new_password'), null], 'As senhas precisam ser iguais')
      .when('new_password', {
        is: (Field: any) => Field,
        then: yup
          .string()
          .nullable()
          .required('Informe a confirmação de senha')
          .transform((value) => !!value ? value : null)
      })
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();

  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
      avatar: user.avatar
    },
    resolver: yupResolver(schema)
  });

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
        const fileExtension = photoUri.split('.').pop();
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoUri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile);

        const response = await api.patch(`${api.defaults.baseURL}/users/avatar`, userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.show({
          title: "Avatar atualizado.",
          placement: 'top',
          bgColor: "green.500"
        })

        const updatedUser = user;
        updatedUser.avatar = response.data.avatar;
        updateUserProfile(updatedUser);


      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {

    const updatedUser = user;
    updatedUser.name = data.name;
    updatedUser.avatar = data.avatar;

    try {
      setIsUpdating(true);
      const response = await api.put(`/users`, data);
      await updateUserProfile(updatedUser)

      if (response.status === 200) {
        toast.show({
          title: 'Perfil atualizado com sucesso!',
          placement: 'top',
          bgColor: 'green.500'
        })

      }

    } catch (error) {
      setIsUpdating(false);

      const isAppError = error instanceof AppError;
      const errorMessage = isAppError ? error.message : 'Não foi possível atualizar o usuário';

      toast.show({
        title: errorMessage,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsUpdating(false);
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
              source={user.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : DefaultUserPhoto}
              alt="Foto de perfil"
            />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                bg="gray.600"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />


        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily='heading'>
            Alterar senha
          </Heading>

          <Controller
            name='old_password'
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name='new_password'
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova antiga"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.new_password?.message}
              />
            )}
          />

          <Controller
            name='confirm_password'
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button title='Confirmar' mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}