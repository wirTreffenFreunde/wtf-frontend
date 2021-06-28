import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.google.de/maps">
                {"DCI "}
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default Copyright;