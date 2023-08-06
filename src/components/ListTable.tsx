import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import { materialInfo, materialTableInfo } from "../const/materialListSetting";
import { cakeInfo, cakeTableInfo } from "../const/cakeListSetting";
import { useAppDispatch } from "../app/hooks";
import { sellCake } from "../reducer/cakeListReducer";

type Props = {
  tableSetting: materialTableInfo[] | cakeTableInfo[];
  itemData: materialInfo[] | cakeInfo[];
};

export const ListTable = ({ tableSetting: table, itemData: data }: Props) => {
  const dispatch = useAppDispatch();
  const handleClick = (idx: number) => {
    console.log(idx);
    dispatch(sellCake(idx));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {table.map((col) => (
            <TableCell align="center">{col.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, itemIdx) => (
          <TableRow key={item.name}>
            {table.map((col, idx) =>
              col.data === "sell" ? (
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  key={col.label}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick(itemIdx)}
                  >
                    1つ売る
                  </Button>
                </TableCell>
              ) : col.data === "refill" ? (
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  key={col.label}
                >
                  <Button variant="contained" color="primary">
                    1つ補充する
                  </Button>
                </TableCell>
              ) : (
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  key={col.label}
                >
                  {item[col.data]}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
