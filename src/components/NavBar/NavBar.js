import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, useLocation  } from "react-router-dom";


const NavBar = () => {
  const routes = ['/', '/Favorites']
  // set the navbar to the correct position on load
  const location = useLocation()
  const [value, setValue] = useState(location.pathname); 

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" value={routes[0]} component={Link} to={routes[0]} />
        <Tab label="Favorites" value={routes[1]} component={Link} to={routes[1]} />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;