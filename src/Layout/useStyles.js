import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  navLink: {
    margin: theme.spacing(1, 1.5),
  },

  // INPUT CONTAINER
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

  // LOGIN and REGISTER pages
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
    maxWidth: 345,
  },
  memoriesMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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

export default useStyles;
