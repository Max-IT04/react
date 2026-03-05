const editingTodoInitialState = {
	id: null,
	title: '',
};

export const editingTodoReducer = (
	state = editingTodoInitialState,
	{ type, payload },
) => {
	switch (type) {
		default:
			return state;
	}
};
