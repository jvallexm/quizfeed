import React from 'react'
// import { Card, CardBody, CardFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
import "./css/Comment.css"
import API from '../utils/api'

class Comment extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            user: false
        }

    }


    componentWillMount(){

        /* Sets the user's image when the component load */

        API.getUser(this.props.comment.author_id)
           .then(res=>{
               this.setState({user: res.data.imageUrl});
           });

    }

    render(){

        return(

            <ul className="comment-section">

                <li className="comment user-comment">
                    <div className="info">
                        Posted by <Link to={"/userquizzes/" + this.props.comment.author_id}>{this.props.comment.author}</Link>
                        <span>{this.props.date}</span>
                    </div>

                    <div className="avatar">
                        <img src={this.state.user || "/images/avatar_author.jpg"} width="35" alt="Profile Avatar" title={this.props.comment.author} />
                    </div>
                    <p>{this.props.comment.comment}</p>
                </li>

            </ul>

        )
    }

}

export default Comment;

