import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base'
import { Loading } from '@components/Loading';
import { THEME } from '@theme/index';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { Routes } from '@routes/index';
import { AuthContext, AuthContextProvider } from '@contexts/AuthContext';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor='transparent'
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded && <Routes />}

      </AuthContextProvider>

    </NativeBaseProvider>
  );
}