export interface cakeInfo {
  name: string;
  price: number;
  stock: number;
  /* cakeInfo[key]でアクセスする場合の型をstring、またはnumberに限定するため*/
  [key: string]: string | number;
}

export interface cakeTableInfo {
  label: string;
  data: string;
  [key: string]: string;
}

export const cakeListSetting = {
  initialList: [
    { name: "ショートケーキ", price: 350, stock: 10 },
    { name: "チーズケーキ", price: 380, stock: 8 },
    { name: "シュークリーム", price: 250, stock: 15 },
    { name: "ロールケーキ", price: 250, stock: 5 },
  ] as cakeInfo[],
  tableSettin: [
    { label: "なまえ", data: "name" },
    { label: "値段", data: "name" },
    { label: "在庫数", data: "stock" },
    { label: "ひとつ売る", data: "sell" },
    { label: "在庫を増やす", data: "refill" },
  ] as cakeTableInfo[],
};
