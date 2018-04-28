import React        from "react";

class NewQuestion extends React.Component{

    state = {

    }

    componentWillMount(){

        this.setState(this.props.question);

    }

    render(){

        return(

            <div>
                <h1 onClick={()=>console.log(this.props.question)}>{this.props.question.type}</h1>
                <input placeholder="What Question Title Are You?"/>
                {
                    this.props.question.answers.map((ele,i)=>
                        <h5>Hot Poppers</h5>
                    )
                }
                <br/>
                <button onClick={()=>this.props.pushNewAnswer()}>Add a new Answer</button>
            </div>

        )

    }

}

export default NewQuestion;