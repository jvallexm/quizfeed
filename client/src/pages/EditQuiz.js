import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Button, Row, Col, Jumbotron, Card, CardBody, Input, FormGroup, Tooltip} from "reactstrap";
import NewQuestion from '../components/NewQuestion';
import PickingRow from '../components/PickingRow';
import "./EditQuiz.css";
import { SketchPicker } from 'react-color';
import NewResult from "../components/NewResult";
import Image from '../components/Image';



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
                author: this.props.user.givenName,
                author_id: this.props.user._id,
                comments: [],
                stars: [],
                responses: [],
                blurb: "",
                previewImage: ""
            },
            redirect: false,
            isNew: false,
            displayColorPicker: false,
            bg: false,
            addingQuestion: false,
            published: false,
            errors: [],
            imageSearch: false,
            brokenImages: false,
            tooltipOpen: false

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
        this.handleImageChange         = this.handleImageChange.bind(this);
        this.brokenImageCheck          = this.brokenImageCheck.bind(this);
        this.toggle                    = this.toggle.bind(this);

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

    componentWillUnmount(){

        clearInterval(this.interval);

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

            if(!this.props.user._id){

                this.setState({redirect: true});

            } else {

                console.log("this quiz is new!");
                let quiz = this.state.quiz;
                quiz._id = Date.now();

                // POST QUIZ TO API then set state

                this.setState({isNew: true});
            }

        }

    }

    brokenImageCheck(broke){

        if(broke)
            this.setState({brokenImages: this.state.brokenImages + 1})
        else
            this.setState({brokenImages: this.state.brokenImages - 1})

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
        if(arr !== "results"){
            let remove = quiz[arr].splice(ind,1);
            this.setState({quiz: quiz});
        }
        else{
            let remove = quiz[arr].splice(ind,1);
            console.log(remove[0]);
            this.setState({quiz: quiz});
        }

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
        if((e.target.name === "blurb" && e.target.value.length > 250) || (e.target.name === "previewImage" && e.target.value.length > 250))
            return false;
        quiz[e.target.name] = e.target.value;
        this.setState({quiz: quiz});

    }

    handleImageChange(src){

        let quiz = this.state.quiz;
        quiz.previewImage = src;
        this.setState({quiz: quiz, imageSearch: false})

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

    moveIt(up,ind){

       let quiz = this.state.quiz;
       let moveBy = up ? -1 : 1;
       let swap = quiz.questions[ind + moveBy];
       quiz.questions[ind + moveBy] = quiz.questions[ind];
       quiz.questions[ind] = swap;
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
        if(e.target.value > 500)
            return false;
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

    toggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }

    publish(){

        console.log("trying to publish");

        let quiz = this.state.quiz;
        let errors = [];

        if(quiz.title === ""){

            errors.push("Your quiz needs to have a title");

        }

        if(quiz.previewImage === ""){

            errors.push("Your quiz needs to have a preview image")

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

                    errors.push("Some answers on question " +(i+1) + " are missing text!");

                }

                if(a.plusOne < 0 && a.plusTwo < 0)

                    errors.push("Some answers on question " + (i+1) + " are missing results!");

            });


        }

        if(this.state.brokenImages > 0)
            errors.push("You have " + this.state.brokenImages + " broken images that need to be fixed before we can publish your quiz!");

        console.log(errors);

        if(errors.length === 0)
            API.editQuiz(this.state.quiz._id,this.state.quiz).then(res => this.nextPath("/"));
        else
            this.setState({errors: errors});


    }


    imageError(){

        if(!this.state.imageIsBroken){
            this.brokenImageCheck(true);
            this.setState({imageIsBroken: true});
        }

    }

    imageFix(){

        if(this.state.imageIsBroken){
            this.brokenImageCheck(false);
            this.setState({imageIsBroken: false});
        }

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

                <div className="text-center">
                        <div className="editquiz-header">
                           <h4 className="editquuiz-header-text">Your Quiz Header</h4>
                           <hr className="superline"/>
                         </div>
                </div>
<center>
<Card className = "header-card">
    <CardBody>
    <div className="right-float"><span id="header-box-tip"><i className="fas fa-question-circle" style={{opacity: .5}}></i></span></div>
                                <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="header-box-tip" toggle={this.toggle}>
                                The image and text in Your Quiz Header is used to list your quiz on the home page and in social media, and to convince users to take your quiz! <br/>It won't appear while users are taking your quiz.
                                </Tooltip>
                <section id="preview-image" className="text-center container-fluid">
                    
                    {this.state.quiz.previewImage !== "" ?
                    <div className="close-preview">
                        <Button aria-label="Search"  
                                title="Search For an Image!"
                                onClick={()=>this.setState({imageSearch: !this.state.imageSearch})}>
                            <span aria-hidden="true">
                            {this.state.imageSearch ? <i className="fa fa-step-backward"/>  :<i className="fas fa-search"></i>}
                            </span>
                        </Button>
                    </div> : ""}
                    <div className="preview-fill">
                        { this.state.quiz.previewImage === "" && !this.state.imageSearch
                        ? <Jumbotron onClick={()=>this.setState({imageSearch: true})}> Search For an Image <i className="fas fa-search"/></Jumbotron>
                        : this.state.imageSearch 
                        ? <Image setImage={this.handleImageChange}/>
                        : <img src={this.state.quiz.previewImage} 
                               className="preview-image" alt="preview" 
                               onLoad={()=>this.imageFix()}
                               onError={()=>this.imageError()}/>}
                    </div>

                    <input name="previewImage" className="url greybox" value={this.state.quiz.previewImage} onChange={this.handleChange}/>

                </section>
                <section id="blurb" className="text-center container-fluid">

<Input type="textarea" id="blurb-box" name="blurb" onChange={this.handleChange} value={this.state.quiz.blurb} placeholder={"Tell us a little bit about your quiz!"}/>

</section>
                </CardBody>
                </Card>
</center>




                <center>

                    <div className="text-center">
                        <div className="editquiz-header">
                           <h4 className="editquuiz-header-text"> Your Questions</h4>
                           <hr className="superline"/>
                         </div>
                    </div>

                    {this.state.quiz.questions.map((ele,i)=>

                        <NewQuestion key                     = { "question-"+i                  }
                                     question                = { ele                            } 
                                     save                    = { this.saveBlock                 }
                                     qInd                    = { i                              }
                                     title                   = { ele.title                      }
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
                                     trashAnswer             = { this.deleteAnswer              }
                                     totalQuestions          = { this.state.quiz.questions.length -1 }
                                     breakImage              = { this.brokenImageCheck            } />
                            
                    )}

                    { !this.state.addingQuestion 

                        ? 
                            <div className="text-center container-fluid">
                                    <button className="btn btn-add-block" 
                                                onClick={()=>this.setState({addingQuestion: true})}>
                                        Add a Question
                                    </button>
                            </div>
                
                        : 

                            <PickingRow newImageBlock        ={ ()=>this.pushNewBlock("questions","image")        }
                                        newTextBlock         ={ ()=>this.pushNewBlock("questions","text")         }
                                        newImageAndTextBlock ={ ()=>this.pushNewBlock("questions","imageAndText") }/> 
                
                    }

                        

                </center>
                

                    <div className="text-center">
                        <div className="editquiz-header">
                           <h4 className="editquuiz-header-text"> Your Results</h4>
                            <hr className="superline"/>
                         </div>
                    </div>
                { 
                    this.state.quiz.results.map((ele,ii)=>

                        <NewResult key={"result-"+ii}
                                   result={ele}
                                   save={this.saveBlock}
                                   rInd={ii}
                                   handleChange={this.handleResultChange}
                                   setImage    = { this.handleResultImageChange }
                                   trash = {this.deleteBlock}
                                   breakImage = { this.brokenImageCheck }/>
                        )
                        
                }
            <div className="text-center container-fluid">
                <button className="btn btn-add-block" 
                        onClick={()=>this.pushNewBlock("results")}>
                            Add a Final Result
                </button>
                </div>

                <Row className="text-right">
                
                    <div className="errors">
                        {this.state.errors.length > 0 ? <h3>Errors!</h3> : ""}
                        <ul>
                        {this.state.errors.map((err,i)=> <li key={"error-" + i}>{err}</li>)}
                        </ul>
                    </div>
                    <Col className="publish-col">
                    <hr className="superline"/><br></br>
                    <button disabled={!this.state.published ? "disabled" : false}
                            className = "jumbotron btn-publish container-fluid" onClick={()=>this.publish()} >PUBLISH YOUR QUIZ &nbsp;<i className="fas fa-arrow-circle-right"></i></button>
                    </Col>
                </Row>
            
             </div>

        )

    }

}

export default EditQuiz;