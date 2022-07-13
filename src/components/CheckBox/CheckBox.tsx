import { useEffect, useState } from 'react';
import styles from './CheckBox.module.css';
import { DoneRounded } from '@material-ui/icons';

interface Props {
  label: string;
  initialState: boolean;
  id: number;
  currentState: React.Dispatch<React.SetStateAction<any>>;
}

const CheckBox = ({ label, initialState, id, currentState }: Props) => {
  const [squareChecked, setSquareChecked] = useState<string | null>('squareUnChecked');
  const [taskDone, setTaskDone] = useState<string | null>('taskUnDone');

  const [isChecked, setIsChecked] = useState<boolean | null>(initialState);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (isChecked) {
      setSquareChecked(styles.squareChecked);
      setTaskDone(styles.taskDone);
    } else {
      setSquareChecked(styles.squareUnChecked);
      setTaskDone(styles.taskUnDone);
    }
    currentState({ id: id, currentState: isChecked });
  }, [isChecked]);

  return (
    <div className={styles.container}>
      <div onClick={onClick} className={`${styles.square} ${squareChecked}`}>
        <DoneRounded />
      </div>
      <p className={`${styles.label} ${taskDone}`}>{label}</p>
    </div>
  );
};

export default CheckBox;
