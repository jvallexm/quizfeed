import React from 'react'
// import { Card, CardBody, CardFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
import "./css/Comment.css"

const Comment = (props) =>{

    return(

        // <Card>
        //     <CardBody>
        //         {props.comment.comment}
        //     </CardBody>
        //     <CardFooter>
        //         Posted by <Link to={"/userquizzes/" + props.comment.author_id}>{props.comment.author}</Link> on {props.date}
        //     </CardFooter>
        // </Card>

<ul class="comment-section">

<li class="comment user-comment">
    <div class="info">
    Posted by <Link to={"/userquizzes/" + props.comment.author_id}>{props.comment.author}</Link>
        <span>{props.date}</span>
    </div>
    <a class="avatar" href={"/userquizzes/" + props.comment.author_id}>
        <img src="/images/avatar_author.jpg" width="35" alt="Profile Avatar" title={props.comment.author} />
    </a>
    <p>{props.comment.comment}</p>
</li>

</ul>

    )

}

export default Comment;

