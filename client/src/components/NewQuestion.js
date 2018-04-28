import React        from "react";
import NewAnswer    from "./NewAnswer";
import { InputGroup, Card, CardBody, CardTitle, Button, Label, Input } from 'reactstrap';
import "./NewQuestion.css"

class NewQuestion extends React.Component{

    constructor(props){
        super(props);

        this.state = {}
        this.handleChange       = this.handleChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);

        /* Autosaves to the parent state every 30 seconds */

        this.interval = setInterval(()=>{
            console.log("Autosaving...");
            this.save();
        },30000);

    }
    

    componentWillReceiveProps(){

        console.log("new question new props");
        this.setState(this.props.question);

    }


    componentWillMount(){

        console.log("moutning props")
        this.setState(this.props.question);

    }

    save(){

        this.props.save("questions",this.props.qInd,this.state);

    }

    pushNewAnswer(){

        let answers = this.state.answers;
        /* Initialized the type of answer */

        let type = this.state.type;
        let newAnswer
        if(type === "image"){

            newAnswer = {
                srcUrl: "",
                image: ""
            }

        } else if (type === "text") {

            newAnswer = {
                text: "",
                backgroundColor: "#AAAAAA"
            }

        } else if (type === "imageAndText"){

            newAnswer = {
                text: "",
                srcUrl: "",
                image: ""
            }

        }

        answers.push(newAnswer);
        this.setState({answers: answers});
    }

    deleteAnswer(ind){

        let answers = this.state.answers;
        let remove  = answers.splice(ind,1);
        console.log("removing object " + remove);
        this.setState({answers: answers});

    }

    handleChange(e){
        
        this.setState({[e.target.name]: e.target.value});

    }

    handleAnswerChange(e){

        let index   = parseInt(e.target.getAttribute("data-ind"),10);
        let answers = this.state.answers;
        answers[index][e.target.name] = e.target.value;
        this.setState({answers: answers});

    }

    render(){

        return(

            <div>

            <Card>
            <CardBody>
                <h3 onClick={()=>console.log(this.props.question)}>Question Type: {this.props.question.type}</h3>
                <InputGroup>
                <Input type="textarea" name="title" id="quizQuestion" placeholder="Type Your Question Here!" onChange={this.handleChange} />
  
                </InputGroup>
                <br/>
                <Button color="success" onClick={()=>this.pushNewAnswer()}>Add a new Answer</Button><Button onClick={()=>this.save()}>Save</Button>
            </CardBody>
                </Card>

                {
                    this.props.question.answers.map((ele,i)=>

                        <NewAnswer key={"question-" + this.props.qInd + "-answer-" + i} 
                                   ind={i}/>
                    )
                }
            </div>

        )

    }

}

export default NewQuestion;