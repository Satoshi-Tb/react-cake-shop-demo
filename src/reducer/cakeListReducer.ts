import { createSlice } from "@reduxjs/toolkit";
import { cakeInfo, cakeListSetting } from "../const/cakeListSetting";

type CakeState = {
  cakeList: cakeInfo[];
  funds: number;
};

export const cakeList = createSlice({
  name: "cakeList",
  initialState: {
    cakeList: [],
    funds: 10000,
  } as CakeState,
  reducers: {
    setCakeList: (state) => {
      state.cakeList = cakeListSetting.initialList;
    },
    sellCake: (state, action) => {
      const index = action.payload as number;
      const cake = state.cakeList[index];
      state.funds += cake.price;
      cake.stock--;
    },
    makeCake: (state, action) => {
      const index = action.payload as number;
      state.cakeList[index].stock++;
    },
    paymentMaterial: (state, action) => {
      const price = action.payload as number;
      state.funds -= price;
    },
  },
});

export const { setCakeList, sellCake, makeCake, paymentMaterial } =
  cakeList.actions;

export default cakeList.reducer;
