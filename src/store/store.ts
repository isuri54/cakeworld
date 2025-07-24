import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CakeData from "../data/CakeData";
import SliceData from "../data/SlicesData";

export const useStore = create (
    persist(
        (set, get) => ({
            CakeList: CakeData,
            SliceList: SliceData,
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToFavoriteList: (type: string, id: string) =>
                set(
                produce(state => {
                    if (type == 'Cake') {
                    for (let i = 0; i < state.CakeList.length; i++) {
                        if (state.CakeList[i].id == id) {
                        if (state.CakeList[i].favourite == false) {
                            state.CakeList[i].favourite = true;
                            state.FavoritesList.unshift(state.CakeList[i]);
                        } else {
                            state.CakeList[i].favourite = false;
                        }
                        break;
                        }
                    }
                    } else if (type == 'Slice') {
                    for (let i = 0; i < state.SliceList.length; i++) {
                        if (state.SliceList[i].id == id) {
                        if (state.SliceList[i].favourite == false) {
                            state.SliceList[i].favourite = true;
                            state.FavoritesList.unshift(state.SliceList[i]);
                        } else {
                            state.SliceList[i].favourite = false;
                        }
                        break;
                        }
                    }
                    }
                }),
                ),
            deleteFromFavoriteList: (type: string, id: string) =>
                set(
                produce(state => {
                    if (type == 'Cake') {
                    for (let i = 0; i < state.CakeList.length; i++) {
                        if (state.CakeList[i].id == id) {
                        if (state.CakeList[i].favourite == true) {
                            state.CakeList[i].favourite = false;
                        } else {
                            state.CakeList[i].favourite = true;
                        }
                        break;
                        }
                    }
                    } else if (type == 'Slices') {
                    for (let i = 0; i < state.SliceList.length; i++) {
                        if (state.SliceList[i].id == id) {
                        if (state.SliceList[i].favourite == true) {
                            state.SliceList[i].favourite = false;
                        } else {
                            state.SliceList[i].favourite = true;
                        }
                        break;
                        }
                    }
                    }
                    let spliceIndex = -1;
                    for (let i = 0; i < state.FavoritesList.length; i++) {
                    if (state.FavoritesList[i].id == id) {
                        spliceIndex = i;
                        break;
                    }
                    }
                    state.FavoritesList.splice(spliceIndex, 1);
                }),
            ),
        }),
        {
            name: 'cake-app',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);