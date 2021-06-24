import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

function InfoContainer() {
    return (
        <Container className="InfoContainer">
            <Card>
                <Typography variant="h5" component="h3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Optio, molestias dolore! Molestias exercitationem ut
                    quibusdam maiores illo aperiam hic voluptas recusandae
                    quidem soluta repellendus aut, ea earum fugit vitae
                    explicabo.
                </Typography>
            </Card>
        </Container>
    );
}

export default InfoContainer;
