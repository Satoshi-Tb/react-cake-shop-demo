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
    supplyMaterial: (state, action) => {
      const index = action.payload as number;
      const material = state.materialList[index];
      material.stock++;
      //TODO salesから減算
    },
    consumeMaterial: (state, action) => {
      const index = action.payload as number;

      switch (index) {
        case 0: // ショートケーキ
          state.materialList[0].stock -= 1;
          state.materialList[1].stock -= 1;
          state.materialList[2].stock -= 1;
          break;

        case 1: // チーズケーキ
          state.materialList[0].stock -= 1;
          state.materialList[1].stock -= 2;
          state.materialList[2].stock -= 1;
          break;

        case 2: // シュークリーム
          state.materialList[0].stock -= 1;
          state.materialList[1].stock -= 2;
          state.materialList[2].stock -= 1;
          break;

        case 3: // ロールケーキ
          state.materialList[0].stock -= 2;
          state.materialList[2].stock -= 1;
          state.materialList[3].stock -= 2;
          break;

        case 4: //
          state.materialList[0].stock -= 2;
          state.materialList[1].stock -= 1;
          state.materialList[2].stock -= 2;
          state.materialList[3].stock -= 1;
          break;

        default:
          break;
      }
    },
  },
});

export const { setMaterialList, supplyMaterial, consumeMaterial } =
  materialList.actions;

export default materialList.reducer;
