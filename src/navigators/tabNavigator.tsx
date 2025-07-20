import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import Customicon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();

const tabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
            <BlurView
                overlayColor=''
                blurAmount={15}
                style={styles.BlurViewStyles}
            />
        )
    }}>
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            tabBarIcon: ({focused, color, size}) => (
                <Customicon
                    name="home"
                    size={25}
                    color={
                        focused ? COLORS.primaryButtonHex: COLORS.primaryLightGreyHex
                    }      
                />
            ),
        }}></Tab.Screen>
        <Tab.Screen name="Cart" component={CartScreen} options={{
            tabBarIcon: ({focused, color, size}) => (
                <Customicon
                    name="cart"
                    size={25}
                    color={
                        focused ? COLORS.primaryButtonHex: COLORS.primaryLightGreyHex
                    }      
                />
            ),
        }}></Tab.Screen>
        <Tab.Screen name="Favourite" component={FavouritesScreen} options={{
            tabBarIcon: ({focused, color, size}) => (
                <Customicon
                    name="like"
                    size={25}
                    color={
                        focused ? COLORS.primaryButtonHex: COLORS.primaryLightGreyHex
                    }      
                />
            ),
        }}></Tab.Screen>
        <Tab.Screen name="History" component={OrderHistoryScreen} options={{
            tabBarIcon: ({focused, color, size}) => (
                <Customicon
                    name="bell"
                    size={25}
                    color={
                        focused ? COLORS.primaryButtonHex: COLORS.primaryLightGreyHex
                    }      
                />
            ),
        }}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default tabNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 50,
        position: 'absolute',
        backgroundColor: COLORS.tabNavBg,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});