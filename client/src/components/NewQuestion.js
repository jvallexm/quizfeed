import React        from "react";
import NewAnswer    from "./NewAnswer";
import { InputGroup, Card, CardBody, CardTitle, Button, Label, Input } from 'reactstrap';
import { SketchPicker } from 'react-color';
import "./NewQuestion.css"

class NewQuestion extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            question: {
                backgroundColor: "aquamarine",
                color: "black"
            }
        }
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

    handleClick = (bg) => {
        this.setState({ displayColorPicker: !this.state.colorpicker,
                        bg: bg ? true : false })
      };
    
      handleClose = () => {
        this.setState({ displayColorPicker: false })
      };

    handleChangeComplete = (color) => {
        let question = this.state.question;
        if(this.state.bg)
            question.backgroundColor = color.hex;
        else{    
            question.color = color.hex;
            console.log("question text should be " + question.color);
        }
        this.setState({question:question})
      };


    render(){

        const popover = {
            position: 'absolute',
            zIndex: '2',
          }
          const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }

        return(

            <div>

            <Card className="question-card">
            {/* Renders color picker */}

                    {   
                        this.state.displayColorPicker 
                    ? <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                                <SketchPicker color ={ this.state.bg ? this.state.question.backgroundColor : this.state.question.color}
                                              onChangeComplete={ this.handleChangeComplete }/>
                        </div> : null 
                    }
                    <div className="close">

                        {/* Background color fill */}

                        <Button aria-label="Close" 
                                onClick={()=> this.handleClick(true)} 
                                title="Change Background Color!">
                            <span aria-hidden="true">
                                <i class="fas fa-paint-brush"></i>
                            </span>
                        </Button>

                        {/* Text Color Fill */}

                        <Button aria-label="Close" 
                                onClick={()=> this.handleClick(false)} 
                                title="Change Font Color!">
                            <span aria-hidden="true">
                            <i class="fas fa-font"></i>
                            </span>
                        </Button>

                    </div>

            <CardBody className="question-card-body" style={{backgroundColor: this.state.question.backgroundColor}}>
                {/* <h3 className="hidden" onClick={()=>console.log(this.props.question)}>Question Type: {this.props.question.type}</h3> */}
               
                <input 
                className="question-title" name="question" id="quizQuestion" placeholder="Type Your Question Here!" onChange={this.handleChange} />
  
               
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