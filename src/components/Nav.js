import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import useStyles from "../Layout/useStyles";
import { useUserContext } from "../context/user-context";

function Nav() {
  const classes = useStyles();
  const { user, setUser } = useUserContext();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // const classes = useStyles();


  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setUser(null)
  }

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
            Wir Treffen Freunde
          </Link>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="/#input"
              className={classes.link}
            >
              Find middle point
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/#info"
              className={classes.link}
            >
              How it works
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/#about"
              className={classes.link}
            >
              About us
            </Link>
          </nav>
          <div>
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
              
              
              
              {user ? 
                        <>
                        <MenuItem component={Link} href="/">My account</MenuItem>
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                        </>
                        :
                        <>
                        <MenuItem component={Link} href="/login">Login</MenuItem>
                        <MenuItem component={Link} href="/register">Register</MenuItem>
                        
                        </>
                    } 
            </Menu>
          </div>
           
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
