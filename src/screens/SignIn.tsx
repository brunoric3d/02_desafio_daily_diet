import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import BgImage from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function SignIn() {

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
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
          <Input
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Input
            placeholder='Senha'
            secureTextEntry
          />
          <Button title='Acessar' />

        </Center>
        <Center mt={24}>

          <Text
            color='gray.100'
            fontSize='sm'
            mb={3}
            fontFamily='body'
          >Ainda não tem acesso?</Text>
          <Button title='Criar conta' variant='outline' onPress={handleNewAccount} />
        </Center>


      </VStack>
    </ScrollView>

  )
}