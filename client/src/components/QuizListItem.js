import React        from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubTitel, Button} from 'reactstrap';


const QuizListItem = () =>{


  return (
    <div>
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardImgOverlay>
          <Button color="info">Rating</Button>{' '}
          <Button color="info">#Comments</Button>{' '}
        </CardImgOverlay>
        <CardBody>
          <CardTitle>(Quiz title)</CardTitle>
          <CardSubtitle>By (QuizAuthor)</CardSubtitle>
          <CardText>(Quick Quiz Description)</CardText>
          <Button>Play This Quiz</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default QuizListItem;