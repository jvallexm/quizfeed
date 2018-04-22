import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import EditQuiz from "./pages/EditQuiz";


const App = () => (
  <Router>
    <div>
      <Switch>
        
        <Route exact path="/" component={Home} />
        <Route exact path="/userQuizzes/:id" component={Home}/>
        <Route exact path="/page/:offset" component={Home}/>
        <Route exact path="/newQuiz" component={EditQuiz}/>
        <Route exact path="/editQuiz/:id" component={EditQuiz}/>
        <Route exact path="/404/:code" component={Home}/>

      </Switch>
    </div>
  </Router>
);

export default App;
