import React from "react";
import { InputGroup, Card, CardBody, CardTitle, Button, Label, Input } from 'reactstrap';

const NewAnswer = () => {

    return(

                    <Card>
            <CardBody>
                <h5>Answer Block<Button className="close" aria-label="Close"><span aria-hidden="true">×</span></Button></h5>
<Button>Add an Image</Button><Button>Add Text</Button>

            </CardBody>
                </Card>

    )

}

export default NewAnswer;