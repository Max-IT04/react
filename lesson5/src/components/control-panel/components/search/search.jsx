import { useRef } from 'react';
import { useStateManager } from '../../../../state-manager';
import { debounce } from '../../../../utils/debounce';
import { Button } from '../../../button/button';
import styles from './search.module.css';

export const Search = () => {
  const {
    state: {
      options: { searchInput, isAlphabetSorting },
    }, updateState,
  } = useStateManager();

  const runSearch = (phrase, sorting) => {
    updateState({
      options: {
        searchInput: phrase, 
        searchPhrase: phrase, 
        isAlphabetSorting: sorting, 
      },
    });
  };

  const debouncedRunSearch = useRef(debounce(runSearch, 1500)).current;

  const onChange = ({ target }) => {
    updateState({
      options: {
        searchInput: target.value,
      },
    });
    debouncedRunSearch(target.value, isAlphabetSorting);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    runSearch(searchInput); 
  };

  return (
    <form className={styles.search} onSubmit={onSubmit}>
      <input 
        className={styles.input} 
        type="text" 
        value={searchInput} 
        placeholder="Поиск..."
        onChange={onChange} 
      />
      <Button type="submit">S</Button>
    </form>
  );
};