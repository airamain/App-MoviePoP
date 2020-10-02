import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css'

import Home from './pages/Home';
import Results from './pages/Results';
import MovieDetails from './pages/MovieDetails'

const App = ({ store }) => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/home" component={Home} />
				<Route path="/results" component={Results} />
				<Route path="/movies/:id" component={MovieDetails} />
			</div>
			<Route
				exact
				path="/"
				render={() => {
					return (
						<Redirect to="/home" />
					)
				}}
			/>
		</Router>
	</Provider>
);

App.propTypes = {
	store: PropTypes.object.isRequired
};

export default App;
