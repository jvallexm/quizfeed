import React from 'react'
import { Card, CardBody, CardFooter} from 'reactstrap';
import { Link } from 'react-router-dom';

const Comment = (props) =>{

    return(

        <Card>
            <CardBody>
                {props.comment.comment}
            </CardBody>
            <CardFooter>
                Posted by <Link to={"/userquizzes/" + props.comment.author_id}>{props.comment.author}</Link> on {props.date}
            </CardFooter>
        </Card>

    )

}

export default Comment;

