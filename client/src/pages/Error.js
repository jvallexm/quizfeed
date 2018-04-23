import React        from "react";

class FourOhFour extends React.Component{

    state = {}


    
    componentDidMount(){

        let code = this.props.match.params.code;
        console.log("doing a mount");
        if(code){
            this.setState({errorCode: code});
        }

    }

    render(){

        return(

            <h1>YOU GOT AN ERROR {this.state.errorCode ? "CODE" : "NO CODE"}</h1>

        )

    }

}

export default FourOhFour;