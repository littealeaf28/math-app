import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './components/Menu';

export default function App() {
  return (
    <Menu></Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
