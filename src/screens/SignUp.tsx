import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import BgImage from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  email: yup.string().email("Email inválido").required("Informe o email"),
  password: yup.string().required("Informe a senha").min(6, "A senha precisa ter ao menos 6 digitos"),
  password_confirm: yup.string().required("Confirme a senha").oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais')
});

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}


export function SignUp() {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  function handleSignup(data: FormDataProps) {
    console.log(data);
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
          >Crie sua conta</Heading>
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
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
                placeholder='Email'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
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
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name='password_confirm'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirme a senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignup)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSignup)}
          />

        </Center>

        <Button
          mt={24}
          title='Voltar para o login'
          variant='outline'
          onPress={() => { navigation.goBack() }} />


      </VStack>
    </ScrollView>

  )
}