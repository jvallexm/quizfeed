import React from 'react';
import API   from "../utils/api";
import "./css/NewQuestion.css"


class Image extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            query: "",
            images: [],
            loading: false,
            noneFound: false,
            lastQuery: ""
        }
    }

    handleChange = (e) =>{

        this.setState({query: e.target.value});

    }

    handleSubmit = (e)=>{

        e.preventDefault(); // Prevents form submit default

        /* If the query is empty returns false */
        if(this.state.query === "")
            return false;

        /* Gets image */

        API.getImages(this.state.query).then((data)=>{

            let images = [];

            /* If data is found, it adds them to the image array */

            if(data)
                data.data.data.forEach(i=>images.push(i.assets.preview.url));
            this.setState({images: images, 
                           loading: false, 
                           noneFound: images.length > 0 ? false : true, 
                           lastQuery: this.state.query});

        });

        /* Sets loading until the API request finishes */

        this.setState({loading: true, noneFound: false});

    }

    render(){
        return(

            <div className="image-search">
                
                <h5>Search for an Image</h5>

                {/* Image Search Form */}

                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}/><button type="submit"><i className="fa fa-search"/></button>
                </form>

                {/* Shows an error if the query didn't return a result*/}
                
                {this.state.noneFound ? <h5>We couldn't find {this.state.lastQuery}. Try searching for something else!</h5> :""}

                {/* Maps the images and returns them to the props.setImage function when they're clicked */}

                {this.state.images.map((img,i)=>

                    <img key={"search-image-"+img} 
                         src={img} 
                         alt={this.state.lastQuery} 
                         className="search-image" 
                         onClick={()=>this.props.setImage(img)}/>

                )}

                {/* Shows Loading while the images load */}

                {this.state.loading?<h4>Loading <i className="fa fa-spinner fa-spin"/></h4>:""}
            </div>

        )
    }

}

export default Image;