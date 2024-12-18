import './global.css';
import React from 'react';
import {
  AppState,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  Alert,
} from 'react-native';

import { PaperProvider, MD3LightTheme as DefaultTheme, useTheme} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from './src/components/button/button.component';
import Home from './src/screens/home';

interface ThemePropCustom {
  colors: {
    primary: string;
    secondary: string;
    gray500: string;
    gray400: string;
    gray300: string;
  }
}
export const theme: ThemePropCustom = {
  ...DefaultTheme,
    'colors': {
      'primary': 'rgb(213 183 41)',
      'secondary': 'rgb(28 37 95)',
      'gray500': 'rgb(133 131 131)',
      'gray400': 'rgb(182 182 182)',
      'gray300': 'rgb(221 221 221)',
    },
};

export const themeDark: ThemePropCustom = {
  ...DefaultTheme,
  'colors': {
    'primary': 'rgb(228, 197, 56)',
    'secondary': 'rgb(187, 195, 255)',
    'gray500': 'rgb(133 131 131)',
    'gray400': 'rgb(182 182 182)',
    'gray300': 'rgb(221 221 221)',
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

var global: any;

const Application = () => {
  return (
    <View>
      <View className="p-4" style={{backgroundColor: theme?.colors?.primary}}>
        <Text className="text-lg font-bold text-teal-700">React Native Paper Tailwind</Text>
        <Text>With Icon</Text>
        <Ionicons name="eye-outline" size={20} />
      </View>
      <View style={{backgroundColor: theme?.colors?.secondary, height: 50}}></View>
      <View style={{backgroundColor: theme?.colors?.gray500, height: 50}}></View>
      <View style={{backgroundColor: theme?.colors?.gray400, height: 50}}></View>
      <View style={{backgroundColor: theme?.colors?.gray300, height: 50}}></View>
      <ButtonComponent onPress={() => Alert.alert('Test')}>Button</ButtonComponent>
    </View>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      console.debug('FPS:', 1 / (performance.now() - (global.lastFrameTime || performance.now())));
      global.lastFrameTime = performance.now();
    }
  });

  return (
    <PaperProvider theme={!isDarkMode ? theme : themeDark}>
      <StatusBar
        showHideTransition="slide"
        backgroundColor="#FFF"
        animated
        barStyle="dark-content"
      />
      <SafeAreaProvider>
        {/* <AuthProvider>
          <AppNavigator />
          <ToastComponent />
        </AuthProvider> */}
        <SafeAreaView>
          {/* <Application /> */}
          <Home />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
