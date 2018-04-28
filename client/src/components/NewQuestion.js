import React        from "react";

class NewQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state = {}

        /* Autosaves to the parent state every 30 seconds */

        this.interval = setInterval(()=>{
            this.save();
        },30000);
        
    }
    

    componentWillReceiveProps(){

        console.log("new question new props");
        this.setState(this.props.question);

    }


    componentWillMount(){

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

    render(){

        return(

            <div>
                <h1 onClick={()=>console.log(this.props.question)}>{this.props.question.type}</h1>
                <input placeholder="What Question Title Are You?"/>
                {
                    this.props.question.answers.map((ele,i)=>
                        <h5 key={"question-" + this.props.qInd + "-answer-" + i}>Hot Poppers</h5>
                    )
                }
                <br/>
                <button onClick={()=>this.pushNewAnswer()}>Add a new Answer</button><button onClick={()=>this.save()}>Save</button>
            </div>

        )

    }

}

export default NewQuestion;