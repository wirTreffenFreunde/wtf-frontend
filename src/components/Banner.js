import { Container, Typography } from "@material-ui/core";
import { useStyles } from "../Layout/useStyles";
function Banner() {
  const classes = useStyles();
  return (
    <Container maxWidth="false" component="div" className={classes.banner}>
      <Container maxWidth="lg">
        <Typography variant="h2" className={classes.taglineHeading}>
          Awesome tagline
        </Typography>
        <Typography variant="subtitle1" className={classes.taglineText}>
          Some random text here maybe will be 2 lines of text
        </Typography>
      </Container>
    </Container>
  );
}
export default Banner;