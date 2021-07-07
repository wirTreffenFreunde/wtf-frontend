import React from "react";
import { useState } from "react";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import RoomIcon from "@material-ui/icons/Room";

import { useStyles } from "../Layout/useStyles";
import { useUserContext } from "../context/user-context";

function Nav() {
  const classes = useStyles();
  const { user, setUser } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  
  const logOut = () => {
    setUser(null);
    console.log(user);
    //we have to redirect to the main page
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" elevation={1} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link
            variant="h6"
            href="/"
            color="inherit"
            noWrap
            underline="none"
            className={classes.toolbarTitle}
          >
            <RoomIcon /> Wir Treffen Freunde
          </Link>
          <nav className={classes.navBar}>
            <Link
              variant="button"
              color="textPrimary"
              href="/#info"
              className={classes.navLink}
            >
              How it works
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/#about"
              className={classes.navLink}
            >
              About us
            </Link>
          </nav>
          <div>
            {user ? (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} href="/myAccount">
                    My account
                  </MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button href="/login" color="inherit" variant="outlined">
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
