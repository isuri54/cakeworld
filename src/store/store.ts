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
            Slicelist: SliceData,
            CartPrice: 0,
            FavouritesList: [],
            CartList: [],
            OrderHistoryList: [],
        }),
        {
            name: 'cake-app',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);