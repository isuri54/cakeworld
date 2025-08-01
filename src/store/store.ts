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
            addToCart: (cartItem: any) =>
                set(
                produce(state => {
                    let found = false;
                    for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == cartItem.id) {
                        found = true;
                        let size = false;
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        if (
                            state.CartList[i].prices[j].size == cartItem.prices[0].size
                        ) {
                            size = true;
                            state.CartList[i].prices[j].quantity++;
                            break;
                        }
                        }
                        if (size == false) {
                        state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].prices.sort((a: any, b: any) => {
                        if (a.size > b.size) {
                            return -1;
                        }
                        if (a.size < b.size) {
                            return 1;
                        }
                        return 0;
                        });
                        break;
                    }
                    }
                    if (found == false) {
                    state.CartList.push(cartItem);
                    }
                }),
                ),
            calculateCartPrice: () =>
                set(
                produce(state => {
                    let totalprice = 0;
                    for (let i = 0; i < state.CartList.length; i++) {
                    let tempprice = 0;
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        tempprice =
                        tempprice +
                        parseFloat(state.CartList[i].prices[j].price) *
                            state.CartList[i].prices[j].quantity;
                    }
                    state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
                    totalprice = totalprice + tempprice;
                    }
                    state.CartPrice = totalprice.toFixed(2).toString();
                }),
            ),
            incrementCartItemQuantity: (id: string, size: string) =>
                set(
                produce(state => {
                    for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        if (state.CartList[i].prices[j].size == size) {
                            state.CartList[i].prices[j].quantity++;
                            break;
                        }
                        }
                    }
                    }
                }),
                ),
            decrementCartItemQuantity: (id: string, size: string) =>
                set(
                produce(state => {
                    for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        if (state.CartList[i].prices[j].size == size) {
                            if (state.CartList[i].prices.length > 1) {
                            if (state.CartList[i].prices[j].quantity > 1) {
                                state.CartList[i].prices[j].quantity--;
                            } else {
                                state.CartList[i].prices.splice(j, 1);
                            }
                            } else {
                            if (state.CartList[i].prices[j].quantity > 1) {
                                state.CartList[i].prices[j].quantity--;
                            } else {
                                state.CartList.splice(i, 1);
                            }
                            }
                            break;
                        }
                        }
                    }
                    }
                }),
                ),
            addToOrderHistoryListFromCart: () =>
                set(
                produce(state => {
                    let temp = state.CartList.reduce(
                    (accumulator: number, currentValue: any) =>
                        accumulator + parseFloat(currentValue.ItemPrice),
                    0,
                    );
                    if (state.OrderHistoryList.length > 0) {
                    state.OrderHistoryList.unshift({
                        OrderDate:
                        new Date().toDateString() +
                        ' ' +
                        new Date().toLocaleTimeString(),
                        CartList: state.CartList,
                        CartListPrice: temp.toFixed(2).toString(),
                    });
                    } else {
                    state.OrderHistoryList.push({
                        OrderDate:
                        new Date().toDateString() +
                        ' ' +
                        new Date().toLocaleTimeString(),
                        CartList: state.CartList,
                        CartListPrice: temp.toFixed(2).toString(),
                    });
                    }
                    state.CartList = [];
                }),
            ),
        }),
        {
            name: 'cake-app',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);