import React from 'react';

export const AppContext = React.createContext(null);

export class ContextWrapper extends React.Component {
	constructor() {
	    super();
	    this.state = {
		store: {
			todos: ["Make the bed", "Take out the trash"]
		},
		actions: {
			addTask: title => this.setState({ todos: this.state.todos.concat(title) })
		}
	    };
	}
	render() {
		return (
		<AppContext.Provider value={this.state}>
	        	{this.props.children}
		</AppContext.Provider>
		);
	}
}