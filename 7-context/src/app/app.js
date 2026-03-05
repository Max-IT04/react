import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ControlPanel, Todo } from '../components';
import { selectTodos, selectSearchPhrase, selectIsAlphabetSorting } from '../selectors';
import { readTodosAsync } from '../actions'
import styles from './app.module.css';

export const App = () => {
	const todos = useSelector(selectTodos);
	const searchPhrase = useSelector(selectSearchPhrase);
	const isAlphabetSorting = useSelector(selectIsAlphabetSorting);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readTodosAsync(searchPhrase, isAlphabetSorting));

	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{todos.map(({ id, title, completed }) => (
					<Todo key={id} id={id} title={title} completed={completed} />
				))}
			</div>
		</div>
	);
};
