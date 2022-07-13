import styles from './ViewSelector.module.css';
import { useEffect, useState } from 'react';

interface Props {
  showView: React.Dispatch<React.SetStateAction<any>>;
}
const ViewSelector = ({ showView }: Props) => {
  const [optionSelected, setOptionSelected] = useState<string>('All');

  const handleOptions = (e: React.MouseEvent<HTMLDivElement>) => {
    setOptionSelected(e.currentTarget.id);
  };
  useEffect(() => {
    showView(optionSelected);
  }, [optionSelected]);

  return (
    <div className={styles.container}>
      <div onClick={handleOptions} className={styles.optionSelected} id='All'>
        <p className={styles.caption}>All</p>
        <div className={optionSelected === 'All' ? styles.indicator : styles.noIndicator}></div>
      </div>
      <div onClick={handleOptions} className={styles.optionSelected} id='Active'>
        <p className={styles.caption}>Active</p>
        <div className={optionSelected === 'Active' ? styles.indicator : styles.noIndicator}></div>
      </div>
      <div onClick={handleOptions} className={styles.optionSelected} id='Completed'>
        <p className={styles.caption}>Completed</p>
        <div className={optionSelected === 'Completed' ? styles.indicator : styles.noIndicator}></div>
      </div>
    </div>
  );
};

export default ViewSelector;
