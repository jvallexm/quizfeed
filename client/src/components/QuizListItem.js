import React        from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubTitel, Button} from 'reactstrap';


const QuizListItem = (props) =>{


  return(

    <Row>
        <Col md="4">
            <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/500x300" alt=""></img>
        </Col>
        <Col md="8">
          <h3>{props.title}</h3>
          <p>{props.blurb}</p>
          <p className="byline text-right">By {props.author}</p>
          </Col>
          <hr/>
      </Row> )

}

export default QuizListItem;