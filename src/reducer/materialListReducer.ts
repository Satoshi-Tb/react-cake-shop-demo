import { createSlice } from "@reduxjs/toolkit";
import {
  materialInfo,
  materialListSetting,
} from "../const/materialListSetting";

type MaterialState = {
  materialList: materialInfo[];
};

export const materialList = createSlice({
  name: "materialList",
  initialState: {
    materialList: [],
  } as MaterialState,
  reducers: {
    setMaterialList: (state) => {
      state.materialList = materialListSetting.initialList;
    },
    supply: (state, action) => {
      const index = action.payload as number;
      const material = state.materialList[index];
      material.stock++;
      //TODO salesから減算
    },
  },
});

export const { setMaterialList, supply } = materialList.actions;

export default materialList.reducer;
