import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Box, Grid} from '@mui/material';
import Cards from "./Cards"
import Modal from "./Modal"
import Drawer from "./Drawer";
// import ReactProSidebar from "./ReactProSidebar"


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tab One" {...a11yProps(0)} />
          <Tab label="Tab Two" {...a11yProps(1)} />
          <Tab label="Tab Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Grid container spacing={2}>
      {[...Array(5)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Cards />
        </Grid>
      ))}
    </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
         <Modal/>
         {/* <ReactProSidebar/> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Drawer/>
      </CustomTabPanel>
    </Box>
  );
}