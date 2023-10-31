let state = {
  todos: {
    work: [],
    travel: [],
    fitness: [],
    study: [],
    project: [],
  },
  currentCategory: 'work',
};

const setCurrentCategory = (newCategory) => {
  state = {
    ...state,
    currentCategory: newCategory,
  };
};
const getCurrentCategory = () => state.currentCategory;
// deep copy
const getState = () => JSON.parse(JSON.stringify(state));

const updateState = (category, newTodos) => {
  // state.todos[category] = newTodos;
  state = {
    ...state,
    todos: {
      ...state.todos,
      [category]: newTodos,
    },
  };
};

export { getState, setCurrentCategory, updateState, getCurrentCategory };
