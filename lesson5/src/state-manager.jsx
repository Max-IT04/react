import { createContext, useContext, useState } from 'react';

const StateManagementContext = createContext({
  state: null,
  setState: () => {},
  // updateState({ data: { existedKey: value } }) - перезаписать value для свойства с existedKey
  // updateState([{ id: existedId, ...data }]) - перезаписать в массиве элемент с existedId 
  // updateState([{ id: newId, ...data }], index) - добавить в массив элемент с newId 
  // updateState([{ id: existedId }]) - удалить из массива элемент с existedId 
  updateState: () => {}, 
});

const checkEmptyObject = (obj) => Object.keys(obj).length === 0; 

const getUpdatedState = (state, newStateData) => 
  Array.isArray(newStateData)
    ? updateStateArray(state, newStateData)
    : updateStateObject(state, newStateData);

const updateStateArray = (state, newStateData) => 
  newStateData.reduce((updatedState, { id, ...newItemData }) => {  
    if (checkEmptyObject(newItemData)) {
      return state.filter(({ id: idToCheck }) => idToCheck !== id);
    }

    const foundItem = state.find(({ id: itemId }) => itemId === id);

    if (!foundItem) {
      return [{ id, ...newItemData }, ...state];
    } 

    return updatedState.map((item) => 
      item.id === id ? { ...item, ...newItemData } : item
    );
  }, state);

const updateStateObject = (state, newStateData) => 
  Object.entries(newStateData).reduce(
    (updatedState, [key, value]) => ({
      ...updatedState, 
      [key]: 
        typeof value === 'object' && value !== null 
          ? updateStateObject(updatedState[key], value) 
          : value, 
    }), 
    state,
  ); 

export const StateManager = ({ children, initialState }) => {
  const [state, setState] = useState(initialState);

  const updateState = (newStateData) => setState(getUpdatedState(state, newStateData));

  return (
    <StateManagementContext.Provider value={{ state, setState, updateState }}>
      {children}
    </StateManagementContext.Provider>
  );
};

export const useStateManager = () => useContext(StateManagementContext);