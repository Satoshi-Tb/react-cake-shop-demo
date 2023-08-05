export interface materialInfo {
  name: string;
  price: number;
  stock: number;
  [key: string]: string | number;
}

export interface materialTableInfo {
  label: string;
  data: string;
  [key: string]: string;
}

export const materialListSetting = {
  initialList: [
    { name: "小麦粉", price: 50, stock: 15 },
    { name: "牛乳", price: 30, stock: 8 },
    { name: "たまご", price: 30, stock: 15 },
    { name: "生クリーム", price: 40, stock: 3 },
    { name: "マロン", price: 100, stock: 4 },
  ] as materialInfo[],
  tableSettin: [
    { label: "なまえ", data: "name" },
    { label: "値段", data: "name" },
    { label: "在庫数", data: "stock" },
    { label: "在庫を増やす", data: "refill" },
  ] as materialTableInfo[],
};
