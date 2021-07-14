import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Copyright from "../Layout/Copyright";
import { useStyles } from "../Layout/useStyles";

function Footer() {
  const classes = useStyles();

  const footers = [
    {
      title: "Team",
      description: ["About us", "Locations"],
    },
    // {
    //   title: "Features",
    //   description: [
    //     "Cool stuff",
    //     "Random feature",
    //     "Team feature",
    //     "Developer stuff",
    //     "Another one",
    //   ],
    // },
    {
      title: "Legal",
      description: ["Privacy policy", "Terms of use"],
    },
  ];

  return (
    <Container component="footer" maxWidth="false" className={classes.footerContainer}>
      <Container className={classes.footerContainerBorder} maxWidth="false">
        <Container maxWidth="lg">
          <Grid
            container
            spacing={2}
            className={classes.footerGrid}
          >
            {footers.map((footer) => (
              <Grid item xs={12} sm={6} key={footer.title}>
                <Typography
                  variant="h6"
                  className={classes.footerTitle}
                  color="textPrimary"
                  gutterBottom
                >
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href="#" variant="subtitle1" color="textSecondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>

      <Copyright />
    </Container>
  );
}

export default Footer;
