import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router'
import { Card, CardHeader, CardBody, Container, Button, Form, FormGroup, Label, Input } from "reactstrap";


class EditQuiz extends React.Component{

    state = {

        quiz: {
            questions: []
        },
        redirect: false,
        isNew: false

    }
    
    componentDidMount(){

        let id = this.props.match.params.id;

        /* If id is part of the request it tried to find the quiz to edit */

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{

                /* Needs logic to set redirect to true if the user is not the quiz author */
                

                if(res.data){

                    console.log("Quiz found");

                } else {

                    console.log("Error: no quiz");
                    this.setState({redirect: true});

                }

            });

        } else {

            /* Needs logic to redirect if a user is not logged in */

            console.log("this quiz is new!");
            this.setState({isNew: true});

        }

    }

    /* Creates a new question block */

    pushNewBlock(type){

        let quiz = this.state.quiz;
        quiz.questions.push({
            type: type,
            answers: []
        })
        this.setState({quiz: quiz});
    }

    /* Adds a new answer to the question at index ind */

    pushNewAnswer(ind){

        let quiz = this.state.quiz;
        console.log("trying to push new answer to " + ind);
        quiz.questions[ind].answers.push({
            name: null,
            img: null
        })
        this.setState({quiz: quiz});
    }

    /* Deletes an answer from the question at index qInd */

    deleteAnswer(qInd,aInd){

        let quiz = this.state.quiz;
        let remove = quiz.questions[qInd].answers.splice(aInd,1);
        this.setState({quiz: quiz});

    }

    /* Deletes a question from the quiz object */

    deleteQuestion(ind){

        let quiz = this.state.quiz;
        let remove = quiz.questions.splice(ind,1);
        this.setState({quiz: quiz});

    }

    render(){

        if(this.state.redirect)
            return <Redirect to="/404"/>

        return(
        
        <div>

        <button className="btn" onClick={()=>this.pushNewBlock("multiple_choice_image")}>Add a Block</button>

        {this.state.quiz.questions.map((ele,i)=>

            <div key={"block-" + i}>

                <h4 onClick={()=>console.log(ele)}>New Question:</h4>


                {ele.answers.map((ans,ii)=>

                    <h5 key={"block-" + i + "-answer-" + ii}
                        onClick={()=>this.deleteAnswer(i,ii)}> Answer {ii}</h5>
                )}

                <button className="btn" onClick={()=>this.pushNewAnswer(i)}>
                    Add an Answer
                </button>
            
            </div>
            
        )}
            
        {/*
             <Card>
        <CardHeader>
        <h1>Loading...</h1>
          {this.state.isNew ? <h4>New Quiz</h4>:<h4>Edit Quiz</h4>}
        </CardHeader>
        <CardBody>
          <Container>
           <Form>
              <FormGroup>
                <Label for="question">Question:</Label>
                <Input type="text" name="question" value={this.state.question} onChange={this.onChange} placeholder="Question" />
              </FormGroup>
              <FormGroup>
                <Label for="answer1">Answer1:</Label>
                <Input type="text" name="answer1" value={this.state.answer1} onChange={this.onChange} placeholder="answer1" />
              </FormGroup>
              <FormGroup>
                <Label for="answer2">Answer2:</Label>
                <Input type="text" name="answer2" value={this.state.answer2} onChange={this.onChange} placeholder="answer2" />
              </FormGroup>
              <FormGroup>
                <Label for="answer3">Answer3:</Label>
                <Input type="textarea" name="answer3" value={this.state.answer2} onChange={this.onChange} placeholder="answer3" cols="80" rows="3"/>
              </FormGroup>
              <FormGroup>
                <Label for="answer4">Answer4:</Label>
                <Input type="number" name="answer4" value={this.state.answer4} onChange={this.onChange} placeholder="answer4" />
              </FormGroup>
              <Button onClick={this.onSubmit} color="primary">Submit</Button>
            </Form>
          </Container>
        </CardBody>
        </Card>*/}

      </div>

        )

    }

}

export default EditQuiz;