import { blue } from "@material-ui/core/colors";
import { makeStyles, createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      // red - #e53935
      // blue - #2196f3
      main: blue[500],
    },
    secondary: {
      main: "#e53935",
    },
  },
  typography: {
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#fff",
    },
    h3: {
      textAlign: "center",
      fontWeight: 600,
    },
    h4: {
      textAlign: "center",
      fontWeight: 500,
    },
    h5: {
      textAlign: "center",
    },
    subtitle1: {
      fontSize: "1rem",
      fontStyle: "italic",
      color: "#fff",
    },
  },
  spacing: 5,
});
export const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  // NAVIGATION BAR
  toolbar: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
    padding: theme.spacing(0),
  },
  toolbarTitle: {
    flexGrow: 1,
    fontSize: "1.1rem",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem",
    },
  },
  navBar: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  navLink: {
    color: "#fff",
    marginRight: theme.spacing(5),
  },

  // BANNER
  banner: {
    backgroundColor: blue[300],
    marginBottom: theme.spacing(-20),
    padding: theme.spacing(5, 0, 25, 0),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(20, 0, 40, 0),
    },
  },
  taglineHeading: {
    textAlign: "center",
    fontSize: "2rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(35),
      textAlign: "left",
    },
  },
  taglineText: {
    textAlign: "center",
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(35),
      textAlign: "left",
    },
  },

  // HOME PAGE
  homeCard: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(5),
      padding: theme.spacing(6),
    },
  },
  h3: {
    fontSize: "1.3rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(3),
    },
  },
  bodyText: {
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
  },

  // INPUT CONTAINER
  cardInput: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing(3, 3, 4, 3),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 3, 5, 3),
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(5, 5, 3, 5),
      margin: theme.spacing(0, 20, 10, 20),
    },
  },
  heading4: {
    fontSize: "1.2rem",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(2),
    },
  },
  heading5: {
    marginBottom: theme.spacing(2),
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
  inputFieldGrid: {
    margin: theme.spacing(0, 0, 3, 0),
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 2, 4, 2),
    },
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(0, 2, 6, 2),
    },
  },
  inputField: {
    width: "100%",
  },
  inputDeleteBtn: {
    position: "absolute",
    top: 0,
    right: "-12px",
    zIndex: "1",
  },
  inputDeleteBtnIcon: {
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
  inputGridAddBtn: {
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
      marginBottom: theme.spacing(3),
    },
  },
  inputAddBtn: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
      width: "40px",
      height: "40px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(2),
    },
  },
  submitBtn: {
    position: "absolute",
    width: "60px",
    height: "60px",
    left: "calc(50% - 30px)", // btn in the middle of the card
    bottom: "-30px",
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "80px",
      height: "80px",
      left: "calc(50% - 40px)", // btn in the middle of the card
      bottom: "-40px",
    },
  },

  // RESULT PAGE
  cardMap: {
    minHight: "500px",
    height: "70vh",
    marginBottom: theme.spacing(5),
    position: "relative",
  },
  cardFilter: {
    padding: theme.spacing(1),
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
  },
  formControlFilter: {
    margin: theme.spacing(1),
  },
  middlePointIcon: {
    zIndex: 2,
  },
  cityIcon: {
    zIndex: 1,
  },
  peopleIcon: {
    zIndex: 1,
  },
  saveTripBtn: {
    width: "100%",
    textAlign: "center",
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
  cardMapAccount: {
    width: 500,
    height: 500,
    marginBottom: theme.spacing(5),
    position: "relative",
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
  footerContainer: {
    padding: 0,
  },
  footerContainerBorder: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 0,
  },
  footerGrid: {
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
    },
  },
  copyright: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));
