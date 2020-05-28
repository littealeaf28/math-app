import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { styles } from './styles';
import Menu from './screens/Menu';
import Home from './screens/Home';
import Problem from './screens/Problem';
import Results from './screens/Results';

const Stack = createStackNavigator();

const theme = {
  /* colors: {
    primary: 'blue',
  }, */
  Button: {
    raised: true,
    type: 'outline',
    titleStyle: {
      color: 'pink',
      fontSize: 16
    },
    buttonStyle: {        
      // backgroundColor: "#DDDDDD",
      borderWidth: 1,
      padding: 8,
      borderRadius: 4,
      backgroundColor: '#666'
    }
  }
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Problem" component={Problem}/>
          <Stack.Screen name="Menu" component={Menu}/>
          <Stack.Screen name="Results" component={Results}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}