import styles from './InputTaks.module.css';
import { useState, useRef } from 'react';

interface Props {
  newTask: React.Dispatch<React.SetStateAction<any>>;
}

const InputTasks = ({ newTask }: Props) => {
  const [task, setTask] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (task !== null) {
      newTask(task);
    }

    if (input && input.current) {
      input.current.value = '';
    }
  };
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value);
  };
  return (
    <div className={styles.container}>
      <input ref={input} type='text' onChange={onChange} className={styles.input} placeholder='Add new task...' />
      <button onClick={onClick} className={styles.button}>
        Add
      </button>
    </div>
  );
};

export default InputTasks;
