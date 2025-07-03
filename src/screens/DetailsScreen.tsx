import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsScreen = () => {
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
});

export default DetailsScreen;