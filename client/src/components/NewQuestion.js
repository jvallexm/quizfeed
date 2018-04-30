import React        from "react";
import NewAnswer    from "./NewAnswer";
import { InputGroup, Card, CardBody, CardTitle, Button, Label, Input, CardFooter } from 'reactstrap';
import { SketchPicker } from 'react-color';
import "./NewQuestion.css"

class NewQuestion extends React.Component{

    constructor(props){
        super(props);

        this.state = {

            question: {
                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "aquamarine", // Initializes background color and 
                color:           this.props.color           ? this.props.color           : "black"       
            }

        }

        /* Binding state handlers to be passed to children */

        this.handleChange            = this.handleChange.bind(this);
        this.handleAnswerChange      = this.handleAnswerChange.bind(this);
        this.handleAnswerImageChange = this.handleAnswerImageChange.bind(this);
        this.handleAnswerColorChange = this.handleAnswerColorChange.bind(this);

        /* Autosaves to the parent state every 30 seconds */

        this.interval = setInterval(()=>{
            console.log("Autosaving...");
            this.save();
        },30000);

    }

    /* When the question object state changes it updates the state */

    componentWillReceiveProps(){

        console.log("new question new props");
        this.setState(this.props.question);

    }

    /* Updates the state with data when mounting */

    componentWillMount(){

        console.log("moutning props")
        this.setState(this.props.question);

    }

    /* Saves to the parent state */

    save(){

        this.props.save("questions",this.props.qInd,this.state);

    }

    /* Adds a new answer */

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
                title: "",
                backgroundColor: "taupe",
                color: "black"
            }

        } else if (type === "imageAndText"){

            newAnswer = {
                title: "",
                srcUrl: "",
                image: "",
                color: "black"
            }

        }

        answers.push(newAnswer);
        this.setState({answers: answers});
    }

    /* Deletes an answer */

    deleteAnswer(ind){

        let answers = this.state.answers;
        let remove  = answers.splice(ind,1);
        console.log("removing object " + remove);
        this.setState({answers: answers});

    }

    /* Handlechange for text fields */

    handleChange(e){
        
        this.setState({[e.target.name]: e.target.value});

    }

    /* Handler for answer text changes */

    handleAnswerChange(e){

        let index   = parseInt(e.target.getAttribute("data-ind"),10);
        let answers = this.state.answers;
        console.log("changing " + e.target.name + " at index " + index)
        answers[index][e.target.name] = e.target.value;
        this.setState({answers: answers});

    }

    /* Handles changes for answer images */

    handleAnswerImageChange(src,i){

        console.log("handling image change for  " + i);

        let answers = this.state.answers;
        answers[i].image = src;
        this.setState({answers: answers});

    }

    handleAnswerColorChange(color,bg,ind){


        let answers = this.state.answers;
        answers[ind][bg ? "backgroundColor" : "color"] = color.hex;
        this.setState({answers: answers});

    }

    /* Click andler for the color picker */

    handleClick = (bg) => {

        /* If bg is true, it sets the color picker to check the background
        Otherwise is changes the text color  */

        this.setState({ displayColorPicker: !this.state.colorpicker,
                    bg: bg ? true : false })
    };

    /* Close handler for the color picker */

    handleClose = () => {

        this.setState({ displayColorPicker: false })

    };

    /* Handler for the color picker complete */

    handleChangeComplete = (color) => {
        let changeField = this.state.bg ? "backgroundColor" : "color"; // Checks to see if it needs to change the background or text color
        this.setState({[changeField]: color.hex})
    };


    render(){

        return(

            <div >

            <Card className="question-card">

                {/* Renders color picker */}

                { this.state.displayColorPicker 
                
                ? <div className="popover">
                    <div className="cover" onClick={ this.handleClose }/>
                        <SketchPicker color ={ this.state.bg ? this.state.question.backgroundColor : this.state.question.color}
                                      onChangeComplete={ this.handleChangeComplete }/>
                 </div> 
                
                : null 
                
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

                <div className="close-right">

                    <Button aria-label="Close" 
                            onClick={()=> this.save()} 
                            title="Save Your Changes!">
                        <span aria-hidden="true">
                            <i class="fas fa-save"></i>
                        </span>
                    </Button>

                </div>

                <CardBody className="question-card-body" style={{backgroundColor: this.state.backgroundColor}}>
               
                    <input className   = "question-title" 
                           name        = "question" 
                           id          = "quizQuestion" 
                           placeholder = {this.state.color === "black" ? "Type Your Question Here!" : "Enter a Title to See Your Color Changes!"}
                           onChange    = {this.handleChange} 
                           style       = {{backgroundColor: this.state.backgroundColor, color: this.state.color}}/>
  
                    <br/>

                </CardBody>
                <CardFooter>

                         <Button color="success" onClick={()=>this.pushNewAnswer()}>Add a new Answer</Button>
                         

                </CardFooter>
                </Card>

                {
                    this.props.question.answers.map((ele,i)=>

                        <NewAnswer key             = { "question-" + this.props.qInd + "-answer-" + i } 
                                   ind             = { i                                              }
                                   image           = { ele.image === "" ? false : ele.image           }
                                   imageChange     = { this.handleAnswerImageChange                   }
                                   handleChange    = { this.handleAnswerChange                        } 
                                   type            = { this.state.type                                } 
                                   title           = { ele.title                                      }
                                   colorChange     = { this.handleAnswerColorChange                   } 
                                   color           = { ele.color                                      }
                                   backgroundColor = { ele.backgroundColor                            } />
                    )
                }
                
            </div>

        )

    }

}

export default NewQuestion;