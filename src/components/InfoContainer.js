import { Container, Card, Typography } from "@material-ui/core";

import { useStyles } from "../Layout/useStyles";

function InfoContainer() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className="InfoContainer" id="info">
      <Card className={classes.homeCard}>
        <Typography variant="h3" className={classes.h3}>How it works</Typography>
        <Typography variant="body" className={classes.bodyText}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio,
          molestias dolore! Molestias exercitationem ut quibusdam maiores illo
          aperiam hic voluptas recusandae quidem soluta repellendus aut, ea
          earum fugit vitae explicabo.
        </Typography>
      </Card>
    </Container>
  );
}

export default InfoContainer;
