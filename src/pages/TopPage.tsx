import { AppBar, ThemeProvider, Tabs, Tab, Box } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import KitchenIcon from "@mui/icons-material/Kitchen";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Typography from "@mui/material/Typography/Typography";
import commonStyle from "../const/commonStyle";
import { ListTable } from "../components/ListTable";
import { cakeListSetting } from "../const/cakeListSetting";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { materialListSetting } from "../const/materialListSetting";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCakeList } from "../reducer/cakeListReducer";
import { sellCake } from "../reducer/cakeListReducer";

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

  const dispatch = useAppDispatch();
  const cakeList = useAppSelector((state) => state.cakeList.cakeList);
  const sales = useAppSelector((state) => state.cakeList.sales);

  const setCakeListInitialize = useCallback(() => {
    dispatch(setCakeList());
  }, [dispatch]);

  const selHandler = (idx: number) => {
    console.log(idx);
    dispatch(sellCake(idx));
  };

  useEffect(() => {
    setCakeListInitialize();
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
        現在の売上:{sales}円
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
          ></ListTable>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListTable
            itemData={materialListSetting.initialList}
            tableSetting={materialListSetting.tableSettin}
            selHandler={selHandler}
          ></ListTable>
        </TabPanel>
      </SwipeableViews>
    </ThemeProvider>
  );
};
