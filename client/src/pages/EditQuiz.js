import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Button, Row } from "reactstrap";
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
                color: "black",
                _id: Date.now(),
                author: this.props.user.name,
                author_id: this.props.user._id,
                comments: [],
                stars: [],
                responses: [],
                blurb: ""
            },
            redirect: false,
            isNew: false,
            displayColorPicker: false,
            bg: false,
            addingQuestion: false,
            published: false,
            errors: []

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
        this.deleteBlock               = this.deleteBlock.bind(this);
        this.deleteAnswer              = this.deleteAnswer.bind(this);


        this.interval  = setInterval(()=>{

            if(this.state.quiz.isDraft && this.state.quiz.title !== "" && this.state.quiz.questions.length > 0){

                console.log("autosaving..." + this.state.published)

                if(!this.state.published)

                    API.postQuiz(this.state.quiz).then((r)=>{
                            props.history.push("/editquiz/" + this.state.quiz._id);
                            this.setState({published: true});
                    })

                else
                
                    API.saveAsDraft(this.state.quiz._id, this.state.quiz)

            } else {
                console.log("Autosaving is disabled for published quizzes");
            }

        },3000);

    }
    
    
    componentWillMount(){

        let id = this.props.match.params.id;

        /* If id is part of the request it tried to find the quiz to edit */

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{

                if(!res.data){
                    this.setState({redirect: true});
                } else {

                    console.log(`author quiz ${res.data.author_id} user ${this.props.user._id}`)

                    /* Needs logic to set redirect to true if the user is not the quiz author */

                    if(res.data.author_id === this.props.user._id){

                        if(!res.data.blurb)
                            res.data.blurb="";

                        this.setState({quiz: res.data, published: true});

                    } else {

                        console.log("Error: no quiz");
                        this.setState({redirect: true});

                    }
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
        console.log("pushing block " + type);
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
        if(e.target.name === "title" && e.target.value.length > 60)
            return false;
        if(e.target.name === "blurb" && e.target.value.length > 250)
            return false;
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
        let remove  = quiz.questions[qInd].answers.splice(ind,1);
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
        if(e.target.value.length > 60)
            return false;
        quiz.questions[qInd][e.target.name] = e.target.value;
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
        if((e.target.name === "title" && e.target.value.length > 50) || (e.target.name === "text" && e.target.value.length>500))
            return false;
        quiz.results[rInd][e.target.name] = e.target.value;
        this.setState({quiz: quiz });

    }

    handleResultImageChange(src,rInd){

        let quiz = this.state.quiz;
        quiz.results[rInd].image = src;
        this.setState({quiz: quiz});

    }

    nextPath(path) {
        this.props.history.push(path);
    }

    publish(){

        console.log("trying to publish");

        let quiz = this.state.quiz;
        let errors = [];

        if(quiz.title === ""){

            errors.push("Your quiz needs to have a title!");

        }
        if(quiz.questions.length < 2){

            errors.push("Your quiz needs at least two questions")

        }
        for(let i=0;i<quiz.questions.length;++i){

            let thisQuestion = quiz.questions[i];
            if(!thisQuestion.question){
                errors.push("Question " + (i+1) + " needs a title!");
            }
            if(thisQuestion.answers.length < 2){
                errors.push("Question " + (i+1) + " needs at least two answers!");
            }

            let type = thisQuestion.type;

            thisQuestion.answers.forEach(a=>{

                if(type !== "text" && a.image === ""){
                    errors.push("Some answers on question " +(i+1) + " are missing images!");
                } 

                if(type !== "image" && a.title === ""){

                    errors.push("Some answers on question " +(i+1) + " are missing text!")

                }

            });


        }

        console.log(errors);

        if(errors.length === 0)
            API.editQuiz(this.state.quiz._id,this.state.quiz).then(res => this.nextPath("/"));
        else
            this.setState({errors: errors});


    }

    render(){

        // Redirects on an error

        if(this.state.redirect)
            return <Redirect to="/404"/>
            
        return(
        
            <div className="container container-fluid">

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
                               onChange    = { this.handleChange } 
                               value       = { this.state.quiz.title }/>
                    </div>

                </section>

                <section id="blurb" className="text-center container-fluid">
                    <textarea id="blurb-box" name="blurb" onChange={this.handleChange} value={this.state.quiz.blurb} placeholder={"Tell us a little bit about your quiz!"}/>
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
                                   setImage    = { this.handleResultImageChange }
                                   trash = {()=>this.deleteBlock("results",i)}/>

                    )
                }
                <center>

                        {this.state.quiz.questions.map((ele,i)=>

                            <NewQuestion key                     = { "question-"+i                  }
                                         question                = { ele                            } 
                                         save                    = { this.saveBlock                 }
                                         qInd                    = { i                              }
                                         title = {ele.title}
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
                                         handleAnswerChange      = { this.handleAnswerChange        }
                                         trash                   = { ()=>this.deleteBlock("questions",i)}
                                         trashAnswer             = { this.deleteAnswer              }/>
                            
                        )}

                </center>
<Row>
                { !this.state.addingQuestion 

                    ? <button className="btn btn-add-block" 
                            onClick={()=>this.setState({addingQuestion: true})}>
                        Add a Question
                    </button>

                    : <PickingRow newImageBlock        ={ ()=>this.pushNewBlock("questions","image")        }
                                newTextBlock         ={ ()=>this.pushNewBlock("questions","text")         }
                                newImageAndTextBlock ={ ()=>this.pushNewBlock("questions","imageAndText") }/> }
</Row>
                {/**/}
                
            <Row>
                <div className="errors">
                    {this.state.errors.length > 0 ? <h3>Errors!</h3> : ""}
                    <ul>
                    {this.state.errors.map((err,i)=> <li key={"error-" + i}>{err}</li>)}
                    </ul>
                </div>
                <button disabled={!this.state.published ? "disabled" : false}
                        className = "jumbotron btn-publish" onClick={()=>this.publish()} >PUBLISH YOUR QUIZ</button>
            </Row>
             </div>

        )

    }

}

export default EditQuiz;