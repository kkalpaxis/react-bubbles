import React, { useState } from "react";
import { Route, Link, Redirect } from 'react-router-dom'
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";

const ProtectedRoute = ({component: Component, ...rest}) => {
	//build props variable
	return <Route render={props => {
		if (localStorage.getItem('token')) {
			return <BubblePage {...props} />;
		} else {
			// <Redirect to="/" />
		}
	}}/>;
};

const protectRoute = Component => props => {
	if(localStorage.getItem('token')) {
		return <Component {...props} />
	} else {
		return <Redirect to="/login"/>;
	}
};

const ProtectedBubblePage = protectRoute(BubblePage);

function App() {
  const [colorList, setColorList] = useState([]);
  return (
      <div className="App">
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/bubblepage" component={ProtectedBubblePage} />
      </div>
  );
}

export default App;
