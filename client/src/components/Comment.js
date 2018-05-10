import React from 'react'
import { Card, CardBody, CardFooter} from 'reactstrap';

const Comment = (props) =>{

    return(

        <Card>
            <CardBody>
                {props.comment.comment}
            </CardBody>
            <CardFooter>
                Posted by {props.comment.author} on {props.date}
            </CardFooter>
        </Card>

    )

}

export default Comment;

