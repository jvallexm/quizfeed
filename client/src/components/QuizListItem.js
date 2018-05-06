import React        from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubtitle, Button, Row,Col} from 'reactstrap';
import { Link } from 'react-router-dom';


class QuizListItem extends React.Component{

    render(){

        const edit = this.props.edit ? "/editquiz/" : "/quiz/";

        return(

        <Card style={{padding: "20px"}}>
            <Row>
                {/*<Link key={"link-" + q._id}to={"/quiz/" + q._id} style={{ textDecoration: 'none', color: 'black' }}> */}
                <Col md="4">
                    <Link to={edit + this.props.id} style={{ textDecoration: 'none', color: 'black' }}>
                        <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/500x300" alt="" href=""/>
                    </Link>
                    <h3 className="text-center space-top">
                        {this.props.responses.length} <i className="fa fa-users"/>
                        <span className="comment-span">{this.props.stars.length} <i className={this.props.stars.indexOf(this.props.user._id) > -1? "fa fa-star gold" : "fa fa-star"}/></span>
                        <span className="comment-span">{this.props.comments.length} <i className="fa fa-comments"/></span>
                    </h3>
                </Col>
                <Col md="8">
                    <Link to={edit + this.props.id} style={{ textDecoration: 'none', color: 'black' }}>
                        <h3>{this.props.title}</h3>
                    </Link>
                    {! this.props.edit ?
                    <Link to={"/userquizzes/" + this.props.author_id} style={{ textDecoration: 'none', color: 'black' }}>
                        <span className="byline">By {this.props.author}</span>
                    </Link> : ""}
                    <p>{this.props.blurb}</p>
            
                </Col>
                <hr/>
            </Row> 
        </Card>)
    }

}

export default QuizListItem;