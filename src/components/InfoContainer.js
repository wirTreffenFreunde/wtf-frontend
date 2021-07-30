import { Container, Card, Typography } from "@material-ui/core";

import { useStyles } from "../Layout/useStyles";

function InfoContainer() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className="InfoContainer" id="info">
      <Card className={classes.homeCard}>
        <Typography variant="h3" className={classes.h3}>How it works</Typography>
        <Typography variant="body" className={classes.bodyText}>
        The Project has also a user account where you can store and save your next destination with points of interest like the closest city, restaurants, or hotels. The whole trip can have up to 5 members.
        </Typography>
      </Card>
    </Container>
  );
}

export default InfoContainer;
