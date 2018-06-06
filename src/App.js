import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';

const App = () => <div>
	<div className="ui container">
		<Route path="/" exact component={HomePage} />
		<Route path="/login" exact component={LoginPage} />
	</div>
</div>;

export default App;
