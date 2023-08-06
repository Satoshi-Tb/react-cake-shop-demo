import { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  ThemeProvider,
  Tabs,
  Tab,
  Box,
  Snackbar,
  Button,
  Alert,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import KitchenIcon from "@mui/icons-material/Kitchen";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import commonStyle from "../const/commonStyle";
import { ListTable } from "../components/ListTable";
import { cakeListSetting } from "../const/cakeListSetting";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import {
  materialInfo,
  materialListSetting,
} from "../const/materialListSetting";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  makeCake,
  paymentMaterial,
  setCakeList,
} from "../reducer/cakeListReducer";
import { sellCake } from "../reducer/cakeListReducer";
import {
  consumeMaterial,
  setMaterialList,
  supplyMaterial,
} from "../reducer/materialListReducer";

type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

export const TopPage = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useAppDispatch();
  const cakeList = useAppSelector((state) => state.cakeList.cakeList);
  const funds = useAppSelector((state) => state.cakeList.funds);
  const materialList = useAppSelector(
    (state) => state.materialList.materialList
  );

  const setCakeListInitialize = useCallback(() => {
    dispatch(setCakeList());
  }, [dispatch]);

  const setMaterialListInitialize = useCallback(() => {
    dispatch(setMaterialList());
  }, [dispatch]);

  const selHandler = (idx: number) => {
    console.log(idx);
    dispatch(sellCake(idx));
    setOpenSnackbar(true);
  };

  const cakeSupplyHandler = (idx: number) => {
    dispatch(makeCake(idx));
    dispatch(consumeMaterial(idx));
  };

  const canCakeSupply = (idx: number) => {
    switch (idx) {
      case 0: // ショートケーキ
        return (
          materialList[0].stock >= 1 &&
          materialList[1].stock >= 1 &&
          materialList[2].stock >= 1
        );

      case 1: // チーズケーキ
        return (
          materialList[0].stock >= 1 &&
          materialList[1].stock >= 2 &&
          materialList[2].stock >= 1
        );

      case 2: // シュークリーム
        return (
          materialList[0].stock >= 1 &&
          materialList[1].stock >= 2 &&
          materialList[2].stock >= 1
        );

      case 3: // ロールケーキ
        return (
          materialList[0].stock >= 2 &&
          materialList[2].stock >= 1 &&
          materialList[3].stock >= 2
        );

      case 4: //
        return (
          materialList[0].stock >= 2 &&
          materialList[1].stock >= 1 &&
          materialList[2].stock >= 2 &&
          materialList[3].stock >= 1
        );

      default:
        return false;
    }
  };

  const materialSupplyHandler = (idx: number, price: number) => {
    dispatch(supplyMaterial(idx));
    dispatch(paymentMaterial(price));
  };

  const canMaterialSupply = (idx: number) => {
    return funds >= materialList[idx].price;
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    //if (reason === "clickaway") {
    //  return;
    //}

    setOpenSnackbar(false);
  };

  useEffect(() => {
    setCakeListInitialize();
    setMaterialListInitialize();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => [
    setValue((prev) => newValue),
  ];

  const handleChangeIndex = (index: number) => {
    setValue((prev) => index);
  };

  return (
    <ThemeProvider theme={commonStyle}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            CANDY CHUPS Patisserie
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h3" color="secondary">
        現在の資金:{funds}円
      </Typography>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="販売ケーキ一覧" icon={<CakeIcon />} {...a11yProps(0)} />
          <Tab label="在庫管理" icon={<KitchenIcon />} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={value}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListTable
            itemData={cakeList}
            tableSetting={cakeListSetting.tableSettin}
            selHandler={selHandler}
            supplyHandler={cakeSupplyHandler}
            canSupply={canCakeSupply}
          ></ListTable>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListTable
            itemData={materialList}
            tableSetting={materialListSetting.tableSettin}
            selHandler={() => {}}
            supplyHandler={materialSupplyHandler}
            canSupply={canMaterialSupply}
          ></ListTable>
        </TabPanel>
      </SwipeableViews>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            1件売れました
          </Alert>
        }
      />
    </ThemeProvider>
  );
};
