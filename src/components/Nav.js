import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import useStyles from "../Layout/useStyles";
import { useUserContext } from "../context/user-context"

function Nav() {
    const classes = useStyles();
    const { user } = useUserContext()
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
                            className={classes.navLink}
                        >
                            Find middle point
                        </Link>
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
                    {user ?
                        <Button href="" color="inherit" variant="outlined">
                            Logout
                        </Button>
                        :
                        <Button href="/login" color="inherit" variant="outlined">
                            Login
                        </Button>
                    }
                    
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Nav;
