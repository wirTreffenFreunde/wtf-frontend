import { Container, Link, Typography } from "@material-ui/core";
import { useStyles } from "../Layout/useStyles";

const Copyright = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.copyright}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          {"WTF "}
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default Copyright;
