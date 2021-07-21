import { blue } from "@material-ui/core/colors";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
      color: "#fff",
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontStyle: "italic",
      color: "#fff",
    },
  },
  spacing: 4,
});
export const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  card: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    height: "500px",
  },

  // NAVIGATION BAR
  toolbar: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    flexWrap: "nowrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  navBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navLink: {
    color: "#fff",
    marginRight: theme.spacing(4),
  },

  // BANNER
  banner: {
    backgroundColor: blue[300],
    padding: theme.spacing(20, 20, 30, 20),
    background: "url(images/mapPicture.png) no-repeat",
    backgroundSize: "400px",
    backgroundPosition: "right",
    backgroundOrigin: "content-box",
  },
  [theme.breakpoints.down("sm")]: {
    banner: {
      textAlign: "center",
      padding: theme.spacing(10, 5, 20, 5),
    },
    taglineHeading: {
      fontSize: "3rem",
    },
    taglineText: {
      fontSize: "1rem",
    },
  },

  // // INPUT CONTAINER
  inputField: {
    width: "300px",
  },

  // RESULT PAGE
  cardMap: {
    margin: theme.spacing(3),
    height: "500px",
  },
  submitBtn: {
    width: "300px",
  },

  //   // LOGIN and REGISTER pages
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", //Fix IE 11 issue.
    marginTop: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  // MY ACCOUNT
  greeting: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(8),
    fontSize: theme.typography.pxToRem(23),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordionList: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  //   tripButton: {
  //     width: "100%",
  //     backgroundColor: theme.palette.background.paper,
  //   },
  memoriesRoot: {
    width: 300,
    height: 300,
    margin: theme.spacing(2),
  },
  memoriesMedia: {
    height: 250,
    width: 250,
    margin: "auto",
  },
  memoriesMediaXXL: {
    height: 500,
    width: 500,
    margin: "auto",
  },
  memoriesAddButton: {
    marginLeft: theme.spacing(4),
  },
  //   popOvertypography: {
  //     padding: theme.spacing(2),
  //   },

  // FOOTER
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
