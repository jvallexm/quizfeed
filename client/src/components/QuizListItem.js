import React        from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubtitle, Button, Row,Col} from 'reactstrap';
import { Link } from 'react-router-dom';


const QuizListItem = (props) =>{


  return(

    <Card style={{padding: "20px"}}>
        <Row>
            {/*<Link key={"link-" + q._id}to={"/quiz/" + q._id} style={{ textDecoration: 'none', color: 'black' }}> */}
            <Col md="4">
                <Link to={"/quiz/" + props.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/500x300" alt="" href=""/>
                </Link>
                <h3 style={{marginTop: "10px"}} className="text-center">{props.stars.length} <i className="fa fa-star"/></h3>
            </Col>
            <Col md="8">
                <Link to={"/quiz/" + props.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <h3>{props.title}</h3>
                </Link>
                <Link to={"/userquizzes/" + props.author_id} style={{ textDecoration: 'none', color: 'black' }}>
                    <span className="byline">By {props.author}</span>
                </Link>
                <p>{props.blurb}</p>
           
            </Col>
            <hr/>
        </Row> 
      </Card>)

}

export default QuizListItem;