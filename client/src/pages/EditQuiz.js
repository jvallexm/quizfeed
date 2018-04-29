import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Card, CardHeader, CardBody, Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import NewQuestion from '../components/NewQuestion';
import "./EditQuiz.css";
import { SketchPicker } from 'react-color';


class EditQuiz extends React.Component{
    

    constructor(props){

        super(props);
        this.state = {

            quiz: {
                title: "",
                questions: [],
                results: [],
                isDraft: true,
                backgroundColor: "bisque"
            },
            redirect: false,
            isNew: false,
            displayColorPicker: false
    
        }

        this.saveBlock    = this.saveBlock.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

   handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChangeComplete = (color) => {
    let quiz = this.state.quiz;
    quiz.backgroundColor = color.hex;
    this.setState({quiz:quiz})
  };

    render(){

        if(this.state.redirect)
            return <Redirect to="/404"/>

            
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
        
            <div className="container">
<section class="jumbotron text-center" style={{backgroundColor: this.state.quiz.backgroundColor}}>

        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <SketchPicker 
          color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete }/>
        </div> : null }

<Button className="close" aria-label="Close" onClick={ this.handleClick }><span aria-hidden="true"><i class="fas fa-paint-brush"></i></span></Button>
                    <div class="container">


            
            <input name="title" className="quiz-title" placeholder="Type Here to Give Your Quiz a Title" onChange={this.handleChange} />
            
            
            </div>
                </section>

                <center>

{this.state.quiz.questions.map((ele,i)=>

    <NewQuestion key={"question-"+i}
                question={ele} 
                save={this.saveBlock}
                qInd={i}/>
    
)}

</center>

<button className="btn" onClick={()=>this.pushNewBlock("questions","image")}>Add a Question</button>
        </div>

        )

    }

}

export default EditQuiz;