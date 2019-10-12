import React from "react";
import ReactDOM from "react-dom";

/** 
 * Internal Dependencies:
 */
import Editor from './editor';
import './style.scss';

const App = () => (
	<div id="container">
		<h1>Try Headless Gutenberg:</h1>
		<Editor />
	</div>
);


ReactDOM.render( <App />, document.getElementById( 'app' ) );
