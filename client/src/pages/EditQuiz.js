import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Button, Jumbotron } from "reactstrap";
import NewQuestion from '../components/NewQuestion';
import PickingRow from '../components/PickingRow';
import "./EditQuiz.css";
import { SketchPicker } from 'react-color';
import NewResult from "../components/NewResult";



class EditQuiz extends React.Component{
    

    constructor(props){

        super(props);
        this.state = {

            quiz: {
                title: "",
                questions: [],
                results: [],
                isDraft: true,
                backgroundColor: "#b7f5a2",
                color: "black"
            },
            redirect: false,
            isNew: false,
            displayColorPicker: false,
            bg: false,
            addingQuestion: false

        }

        this.saveBlock                 = this.saveBlock.bind(this);
        this.handleChange              = this.handleChange.bind(this);
        this.pushNewBlock              = this.pushNewBlock.bind(this);
        this.moveIt                    = this.moveIt.bind(this);
        this.pushNewAnswer             = this.pushNewAnswer.bind(this);
        this.handleAnswerColorChange   = this.handleAnswerColorChange.bind(this);
        this.handleQuestionColorChange = this.handleQuestionColorChange.bind(this);
        this.handleQuestionChange      = this.handleQuestionChange.bind(this);
        this.handleAnswerImageChange   = this.handleAnswerImageChange.bind(this);
        this.handleAnswerChange        = this.handleAnswerChange.bind(this);
        this.handleResultChange        = this.handleResultChange.bind(this);
        this.handleResultImageChange   = this.handleResultImageChange.bind(this);


        this.interval  = setInterval(()=>{

            if(this.state.quiz.isDraft)
                console.log("This is where the component would autosave...");
            else
                console.log("Autosaving is disabled for published quizzes");

        },60000);

    }
    
    
    componentWillMount(){

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
                                 backgroundColor: "aquamarine",
                                 color: "black",
                                 answers: []}
                    /* Default result block */  
                             : { title: "",
                                 image: "",
                                 srcUrl: "",
                                 text: ""  };

        console.log(newObj);

        quiz[arr].push(newObj)
        this.setState({quiz: quiz, addingQuestion: false});
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

    /* Change handler for the quiz input fields */

    handleChange(e){

        let quiz = this.state.quiz;
        quiz[e.target.name] = e.target.value;
        this.setState({quiz: quiz});

    }

    /* Saving for later

    componentDidUpdate(prevProps, prevState, snapshot){

        console.log("component did update");

    }

    */

    /* Click handler for the color picker */

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

    moveIt(up,ind,arr){

       let quiz = this.state.quiz;
       console.log(quiz[arr][ind]);
       let remove = quiz[arr].splice(ind,1);
       let moveBy = up ? -1 : 1;
       this.setState({quiz: quiz});

    }

        /* Adds a new answer */

    pushNewAnswer(ind){

        let quiz = this.state.quiz;
        /* Initialized the type of answer */
    
        let type = quiz.questions[ind].type;
        let newAnswer
        if(type === "image"){
    
            newAnswer = {
                srcUrl: "",
                    image: "",
                    plusOne: "",
                    plusTwo: ""
                }
    
            } else if (type === "text") {
    
                newAnswer = {
                    title: "",
                    backgroundColor: "taupe",
                    color: "black",
                    plusOne: "",
                    plusTwo: ""
                }
    
            } else if (type === "imageAndText"){
    
                newAnswer = {
                    title: "",
                    srcUrl: "",
                    image: "",
                    color: "black",
                    plusOne: "",
                    plusTwo: ""
                }
    
            }
    
            quiz.questions[ind].answers.push(newAnswer);
            this.setState({quiz: quiz});
        }
    
        /* Deletes an answer */

    deleteAnswer(qInd,ind){

        let quiz = this.state.quiz;
        let remove  = quiz.questions.answers.splice(ind,1);
        console.log("removing object " + remove);
        this.setState({quiz: quiz});

    }

    handleAnswerChange(e,qInd,ind){

        let quiz = this.state.quiz;
        quiz.questions[qInd].answers[ind][e.target.name] = e.target.value;
        this.setState({quiz: quiz});

    }

    /* Handler for the color picker complete */

    handleQuestionColorChange(color,bg,qInd){
        let changeField = bg ? "backgroundColor" : "color"; // Checks to see if it needs to change the background or text color
        let quiz = this.state.quiz;
        quiz.questions[qInd][changeField] = color.hex;
        console.log(`changing question ${qInd} ${changeField} to ${color.hex}`);
        this.setState({quiz: quiz});
    };

    handleAnswerColorChange(color,bg,qInd,ind){


        let quiz = this.state.quiz;
        quiz.questions[qInd].answers[ind][bg ? "backgroundColor" : "color"] = color.hex;
        this.setState({quiz: quiz});

    }

    /* Handles changes for answer images */

    handleAnswerImageChange(src,qInd,ind){

        console.log("handling image change for  " + ind);

        let quiz = this.state.quiz;
        quiz.questions[qInd].answers[ind].image = src;
        this.setState({quiz: quiz});

    }

        /* Handlechange for text fields */

    handleQuestionChange(e,qInd){
        
        let quiz = this.state.quiz;
        quiz.questions[qInd][e.target.name] = e.target.value
        this.setState({quiz: quiz});
    
    }

    /* Handler for the color picker complete */

    handleChangeComplete = (color) => {
        let quiz = this.state.quiz; 
        let changeField = this.state.bg ? "backgroundColor" : "color"; // Checks to see if it needs to change the background or text color
        quiz[changeField] = color.hex;
        this.setState({quiz:quiz})
    };

    handleResultChange(e,rInd){

        let quiz = this.state.quiz;
        quiz.results[rInd][e.target.name] = e.target.value;
        this.setState({quiz: quiz });

    }

    handleResultImageChange(src,rInd){

        let quiz = this.state.quiz;
        quiz.results[rInd].image = src;
        this.setState({quiz: quiz});

    }

    render(){

        // Redirects on an error

        if(this.state.redirect)
            return <Redirect to="/404"/>
            
        return(
        
            <div className="container">

                <section className="jumbotron text-center" style={{backgroundColor: this.state.quiz.backgroundColor}}>

                    {/* Renders color picker */}

                    {   
                        this.state.displayColorPicker 
                    ? <div className="popover">
                            <div className="cover" onClick={ this.handleClose }/>
                                <SketchPicker color ={ this.state.bg ? this.state.quiz.backgroundColor : this.state.quiz.color}
                                              onChangeComplete={ this.handleChangeComplete }/>
                        </div> : null 
                    }
                    <div className="close">

                        {/* Background color fill */}

                        <Button aria-label="Close" 
                                onClick={()=> this.handleClick(true)} 
                                title="Change Background Color!">
                            <span aria-hidden="true">
                                <i className="fas fa-paint-brush"></i>
                            </span>
                        </Button>

                        {/* Text Color Fill */}

                        <Button aria-label="Close" 
                                onClick={()=> this.handleClick(false)} 
                                title="Change Font Color!">
                            <span aria-hidden="true">
                            <i className="fas fa-font"></i>
                            </span>
                        </Button>

                    </div>

                    {/* Quiz Title */}

                    <div className="container">
                        <input name        = "title" 
                               className   = "quiz-title" 
                               style       = { {color: this.state.quiz.color} }
                               placeholder = { this.state.quiz.color === "black" ? "Type Here to Give Your Quiz a Title" : "Enter a Title to See Your Color Changes!" }
                               onChange    = { this.handleChange} />
                    </div>

                </section>

                <button className="btn btn-add-block" 
                        onClick={()=>this.pushNewBlock("results")}>
                    Add a Final Result
                </button>
                {
                    this.state.quiz.results.map((ele,i)=>

                        <NewResult key={"result-"+i}
                                   result={ele}
                                   save={this.saveBlock}
                                   rInd={i}
                                   handleChange={this.handleResultChange}
                                   setImage    = { this.handleResultImageChange }/>

                    )
                }
                <center>

                        {this.state.quiz.questions.map((ele,i)=>

                            <NewQuestion key                     = { "question-"+i                  }
                                         question                = { ele                            } 
                                         save                    = { this.saveBlock                 }
                                         qInd                    = { i                              }
                                         backgroundColor         = { ele.backgroundColor            }
                                         color                   = { ele.color                      }
                                         type                    = { ele.type                       } 
                                         results                 = { this.state.quiz.results        }
                                         moveIt                  = { this.moveIt                    } 
                                         pushNewAnswer           = { this.pushNewAnswer             }
                                         deleteAnswer            = { this.deleteAnswer              } 
                                         handleAnswerColorChange = { this.handleAnswerColorChange   }
                                         handleColorChange       = { this.handleQuestionColorChange }
                                         handleAnswerImageChange = { this.handleAnswerImageChange   }
                                         handleQuestionChange    = { this.handleQuestionChange      }
                                         handleAnswerChange      = { this.handleAnswerChange        }/>
                            
                        )}

                </center>

                { !this.state.addingQuestion 

                    ? <button className="btn btn-add-block" 
                            onClick={()=>this.setState({addingQuestion: true})}>
                        Add a Question
                    </button>

                    : <PickingRow newImageBlock        ={ ()=>this.pushNewBlock("questions","image")        }
                                newTextBlock         ={ ()=>this.pushNewBlock("questions","text")         }
                                newImageAndTextBlock ={ ()=>this.pushNewBlock("questions","imageAndText") }/> }

                {/**/}

                <button className = "jumbotron" onClick={()=>console.log(this.state.quiz)}>Publish</button>

             </div>

        )

    }

}

export default EditQuiz;