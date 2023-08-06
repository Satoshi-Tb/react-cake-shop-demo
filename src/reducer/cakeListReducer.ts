import { createSlice } from "@reduxjs/toolkit";
import { cakeInfo, cakeListSetting } from "../const/cakeListSetting";
import { act } from "@testing-library/react";

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
      const target = action.payload as number;
      switch (target) {
        case 0: // ショートケーキ
          break;
        default:
          break;
      }
    },
  },
});

export const { setCakeList, sellCake } = cakeList.actions;

export default cakeList.reducer;
