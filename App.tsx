import React from "react";
import { StyleSheet, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from "./src/screens/DetailsScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import tabNavigator from "./src/navigators/tabNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={tabNavigator}
          options={{animation: "slide_from_bottom"}}>
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{animation: "slide_from_bottom"}}>
        </Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{animation: "slide_from_bottom"}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the View takes up the full screen
  },
});

export default App;