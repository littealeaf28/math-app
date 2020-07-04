import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Splash from '../assets/splash.png';
import {colors, styles} from "../styles";

export default function Home({ navigation }) {
  return (
    <View style={{ ...styles.background, alignItems: 'center' }}>
      <Text style={{ fontSize: 32, margin: 12, color: colors.primaryDark, fontWeight: 'bold', textAlign: 'center' }}>Edo Wado Math!</Text>
      <Image
          source={Splash}
          style={{ width: '98%', height: '78%' }}
          resizeMode="cover"
      />
      <Button
          containerStyle={{ position: 'relative', top: '-24%' }}
          onPress={() => navigation.navigate('Menu')}
          title="Start"
      />
    </View>
  );
}
