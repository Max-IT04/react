import { useState } from "react";
import { Button } from "../../../../components/button/button";
import styles from './search.module.css';

export const Search = ({ onSearch }) => {
  const [value, setValue] = useState(''); 

  const onChange = ({ target }) => setValue(target.value);

  const onSubmit = (event) => {
    event.preventDefault(); 
    onSearch(value);
  };

  return (
    <form className={styles.search} onSubmit={onSubmit}>
      <input 
        className={styles.input} 
        type="text" 
        value={value} 
        placeholder="Поиск..."
        onChange={onChange} 
      />
      <Button type="submit">🔍</Button>
    </form>
  );
};