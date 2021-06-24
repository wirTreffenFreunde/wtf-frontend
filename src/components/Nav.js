import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import useStyles from "../Layout/useStyles";

function Nav() {
    const classes = useStyles();
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
                            href="#input"
                            className={classes.link}
                        >
                            Find middle point
                        </Link>
                        <Link
                            variant="button"
                            color="textPrimary"
                            href="#info"
                            className={classes.link}
                        >
                            How it works
                        </Link>
                        <Link
                            variant="button"
                            color="textPrimary"
                            href="#about"
                            className={classes.link}
                        >
                            About us
                        </Link>
                    </nav>
                    <Button href="/login" color="inherit" variant="outlined">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Nav;
