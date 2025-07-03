import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';

const HomeScreen = () => {
  const CakeList = useStore((state: any) => state.CakeList);
  const SliceList = useStore((state: any) => state.SliceList);
  const [categories, setCategories] =useState([undefined]);
  const [searchText, setSearchText] =useState([undefined]);
  const [categoryIndex, setCategoryIndex] =useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCake, setSortedCake] =useState([undefined]);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen;