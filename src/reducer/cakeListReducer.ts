import { createSlice } from "@reduxjs/toolkit";
import { cakeInfo, cakeListSetting } from "../const/cakeListSetting";
import { RootState } from "../app/store";

type CakeState = {
  cakeList: cakeInfo[];
  sales: number;
};

export const cakeList = createSlice({
  name: "cakeList",
  initialState: {
    cakeList: [],
    sales: 10000,
  } as CakeState,
  reducers: {
    setCakeList: (state) => {
      state.cakeList = cakeListSetting.initialList;
    },
    sellCake: (state, action) => {
      const index = action.payload as number;
      const cake = state.cakeList[index];
      state.sales += cake.price;
      cake.stock--;
    },
  },
});

export const { setCakeList, sellCake } = cakeList.actions;

export default cakeList.reducer;
