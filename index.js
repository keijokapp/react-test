import React, { useReducer, useContext } from 'react';
import ReactDOM from 'react-dom';

const data = {
	nextId: 3,
	items: [
		{ id: 0, count: 0 },
		{ id: 1, count: 0 },
		{ id: 2, count: 0 }
	]
};

const AppState = React.createContext();

function AppStateProvider({ children }) {
	function reducer(state, { type, index }) {
		const newState = { ...state, items: [...state.items] };

		if (type === 'add') {
			newState.items.push({ id: state.nextId, count: 0 });
			newState.nextId++;
		} else if (type === 'delete') {
			newState.items.splice(index, 1);
		} else {
			newState.items[index] = { ...newState.items[index], count: newState.items[index].count + 1 };
		}

		return newState;
	} 

	const [state, dispatch] = useReducer(reducer, data);

	return <AppState.Provider value={{ state, dispatch }}>{children}</AppState.Provider>;
}

function useSelector(fn) {
	const appState = useContext(AppState).state;
	return fn(appState);
}

function useDispatch() {
	return useContext(AppState).dispatch;
}

function ListItem({ index }) {
	const { id, count } = useSelector(state => state.items[index]);
	const dispatch = useDispatch();

	console.log('ListItem render');

	return <li>{id} - {count} <button onClick={() => dispatch({ index })}>Add</button><button onClick={() => dispatch({ type: 'delete', index })}>Remove</button></li>;
}


function List() {
	const list = useSelector(state => state.items);
	const dispatch = useDispatch();

	console.log('List render');

	return <>
		<ol start="0">
			{list.map((_, i) => <ListItem index={i} key={i} />)}
		</ol>
		<button onClick={() => dispatch({ type: 'add' })}>Add</button>
	</>;
}


function App() {
	return <AppStateProvider><List/></AppStateProvider>;
}

const div = document.createElement('div');
ReactDOM.render(<App />, div);
document.body.appendChild(div);