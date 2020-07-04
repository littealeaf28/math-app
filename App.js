import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import Menu from './screens/Menu';
import Home from './screens/Home';
import Problem from './screens/Problem';
import Results from './screens/Results';
import { styles, colors } from './styles';

const theme = {
  Button: {
    raised: true,
    type: 'outline',
    titleStyle: {
      color: colors.primaryDark,
      fontSize: 20
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: colors.primaryDark,
      padding: 6,
      borderRadius: 8,
      backgroundColor: colors.primary
    },
    containerStyle: {
      width: '56%'
    }
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary },
              headerTintColor: colors.primaryDark,
            }}
        >
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Menu" component={Menu}/>
          <Stack.Screen name="Problem" component={Problem}/>
          <Stack.Screen name="Results" component={Results}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
