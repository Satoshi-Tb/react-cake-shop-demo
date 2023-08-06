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

type Props = {
  tableSetting: materialTableInfo[] | cakeTableInfo[];
  itemData: materialInfo[] | cakeInfo[];
  selHandler: (index: number) => void;
  supplyHandler: (index: number) => void;
  funds: number;
};

export const ListTable = ({
  tableSetting: table,
  itemData: data,
  selHandler,
  supplyHandler,
  funds,
}: Props) => {
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
                    onClick={() => selHandler(itemIdx)}
                    disabled={item.stock === 0}
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => supplyHandler(itemIdx)}
                    disabled={funds < item.price}
                  >
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
