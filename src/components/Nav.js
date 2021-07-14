import React from "react";
import { useState, useHistory } from "react";

import {
  IconButton,
  MenuItem,
  Menu,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Link,
  Container,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import RoomIcon from "@material-ui/icons/Room";

import { useStyles } from "../Layout/useStyles";
import { useUserContext } from "../context/user-context";

function Nav() {
  const classes = useStyles();
  const { user, setUser } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" elevation={1} className={classes.appBar}>
        <Container maxWidth="lg">
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
        </Container>
      </AppBar>
    </>
  );
}

export default Nav;
