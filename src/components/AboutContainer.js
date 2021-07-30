import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "../Layout/useStyles";

function AboutContainer() {
  const classes = useStyles();

  return (
    <Container className="AboutContainer" id="about">
      <Card className={classes.homeCard}>
        <Typography variant="h3" className={classes.h3}>About us</Typography>
        <Typography variant="body" className={classes.bodyText}>
        We are a team of 5 Junior Web Developer who has been working on their  Project to build WirTreffenFreunde App for friends or acquaintances to meet up to their middle point. 
        </Typography>
      </Card>
    </Container>
  );
}

export default AboutContainer;
