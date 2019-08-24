import React, { useState } from "react";
import { Route, Link, Redirect } from 'react-router-dom'
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";

const ProtectedRoute = ({component: Component, ...rest}) => {
	//build props variable
	return <Route {...propsWithoutComponent} render={props => {
		if (localStorage.getItem('token')) {
			return <Component {...props} />;
		} else {
			<Redirect to="/" />
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
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/bubblepage" component={ProtectedBubblePage} />
      </div>
    </Router>
  );
}

export default App;
