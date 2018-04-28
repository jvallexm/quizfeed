import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router'
import { Card, CardHeader, CardBody, Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import NewQuestion from '../components/NewQuestion';


class EditQuiz extends React.Component{
    

    constructor(props){

        super(props);
        this.state = {

            quiz: {
                title: "",
                questions: [],
                results: [],
                isDraft: true
            },
            redirect: false,
            isNew: false
    
        }

        this.saveBlock = this.saveBlock.bind(this);
        this.interval  = setInterval(()=>{

            if(this.state.quiz.isDraft)
                console.log("This is where the component would autosave...");
            else
                console.log("Autosaving is disabled for published quizzes");

        },60000);

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
            let quiz = this.state.quiz;
            quiz._id = Date.now();

            // POST QUIZ TO API then set state

            this.setState({isNew: true});

        }

    }

    saveAsDraft(){

        API.saveAsDraft(this.quiz._id)
           .then(res=>{
               if(res)
                 console.log("autosave success");
           })

    }

    /* Creates a new question block */

    pushNewBlock(arr,type){

        let quiz = this.state.quiz;
        let newObj = arr === "questions" 

                    /* Default question block */ 
                              ? { type:            type,
                                 backgroundColor: "#AAAAAA",
                                 answers: []}
                    /* Default result block */  
                             : { title: "",
                                 image: "",
                                 srcUrl: "",
                                 text: ""  };

        console.log(newObj);

        quiz[arr].push(newObj)
        this.setState({quiz: quiz});
    }

    /* Deletes a question from the quiz object */

    deleteBlock(arr,ind){

        let quiz = this.state.quiz;
        let remove = quiz[arr].splice(ind,1);
        this.setState({quiz: quiz});

    }

    /* Saves an edited block */

    saveBlock(arr,ind,obj){

        console.log(`Saving ${arr} at index ${ind}`)
        let quiz = this.state.quiz;
        quiz[arr][ind] = obj;
        this.setState({quiz: quiz});

    }

    /* Saving for later

    componentDidUpdate(prevProps, prevState, snapshot){

        console.log("component did update");

    }

    */

    render(){

        if(this.state.redirect)
            return <Redirect to="/404"/>

        return(
        
        <div className="text-center container-fluid">

        <button className="btn" onClick={()=>this.pushNewBlock("questions","image")}>Add a Block</button>

        <center>

        {this.state.quiz.questions.map((ele,i)=>

            <NewQuestion key={"question-"+i}
                         question={ele} 
                         save={this.saveBlock}
                         qInd={i}/>
            
        )}

        </center>
            
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