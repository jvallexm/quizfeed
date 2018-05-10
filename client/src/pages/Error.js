import React        from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./Error.css"

class FourOhFour extends React.Component{

    state = {};
    
    componentWillMount(){

        let code = this.props.match.params.code;

        if(code){
            switch(code){
                case "0":
                    this.setState({errorCode: "The quiz you're looking for doesn't exist"});
                    break;
                case "1":
                    this.setState({errorCode: "You don't have permission to edit that quiz"});
                    break;
                case "2":
                    this.setState({errorCode: "You have to be logged in to crete a new quiz"});
                    break;
                case "3":
                    this.setState({errorCode: "You need to be logged in to view your quizzes"});
                    break;
                case "4":
                    this.setState({errorCode: "You need to be logged in to view your favorites"});    
                    break;
                case "5":
                    this.setState({errorCode: "That user doesn't exist"});
                    break;

            }
        }

    };

    render(){

        return(
            

            <div id="error-div" className="text-center">

                <h1> Uh oh! </h1>
                <h3>{this.state.errorCode || "Doesn't look like that page exists"}</h3>
                <Button>
                    <Link to="/">
                        Back to the Home page
                    </Link>
                </Button>

            </div>


            

        )

    }

}

export default FourOhFour;