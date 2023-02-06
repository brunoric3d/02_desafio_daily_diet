import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import BgImage from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe o email"),
  password: yup.string().required("Informe a senha"),
});

type FormDataProps = {
  email: string;
  password: string;
}


export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);


  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError;

      setIsLoading(false);

      toast.show({
        title: isAppError ? error.message : 'Não foi possível logar agora',
        placement: 'top',
        bgColor: 'red.500'
      });
    }


  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}

      contentContainerStyle={{ flexGrow: 1 }}>
      <VStack flex={1} bg='gray.700' px={10} pb={16}>
        <Image
          alt=''
          source={BgImage}
          defaultSource={BgImage}
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <Logo />

          <Text color='gray.100' fontSize='sm'
          >Treine sua mente e o seu corpo</Text>
        </Center>
        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'
          >Acesse sua conta</Heading>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Email'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />
          <Button
            title='Acessar'
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}

          />

        </Center>
        <Center mt={24}>

          <Text
            color='gray.100'
            fontSize='sm'
            mb={3}
            fontFamily='body'
          >Ainda não tem acesso?</Text>
          <Button
            title='Criar conta'
            variant='outline'
            onPress={handleNewAccount}
          />
        </Center>


      </VStack>
    </ScrollView>

  )
}