import styles from './TaskContainer.module.css';
import CheckBox from '../CheckBox/CheckBox';
import InputTasks from '../InputTasks/InputTasks';
import ViewSelector from '../ViewSelector/ViewSelector';
import { DeleteOutlineRounded } from '@material-ui/icons';
import { useEffect, useState } from 'react';

const TaskContainer = () => {
  const [tasksList, setTasksList] = useState<Array<{ id: number; task: string; currentState: boolean }>>([]);
  const [tasksListDone, setTasksListDone] = useState<Array<{ id: number; task: string; currentState: boolean }>>([]);
  const [tasksListUnDone, setTasksListUnDone] = useState<Array<{ id: number; task: string; currentState: boolean }>>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [taskId, setTaskId] = useState<number>(0);
  const [currentState, setCurrentState] = useState<{ id: number; currentState: boolean }>();

  const [viewToShow, setViewToShow] = useState<string>('All');

  const deleteItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const myListTasks = tasksList;
    const taskToDelete = myListTasks.findIndex((task) => e.currentTarget.id === task.id.toString());
    myListTasks.splice(taskToDelete, 1);
    const myListDone = myListTasks.filter((task) => task.currentState === true);
    const myListUnDone = myListTasks.filter((task) => task.currentState === false);
    setTasksList(myListTasks);
    setTasksListDone(myListDone);
    setTasksListUnDone(myListUnDone);
  };
  const deleteAllTasks = (e: React.MouseEvent<HTMLDivElement>) => {
    setTasksListDone([]);

    const myListUnDone = tasksList.filter((task) => task.currentState === false);
    setTasksList(myListUnDone);
  };

  useEffect(() => {
    if (newTask !== '') {
      setTaskId((prevState) => prevState + 1);
      setTasksList((prevState) => [...prevState, { id: taskId, task: newTask, currentState: false }]);
    }
  }, [newTask]);

  useEffect(() => {
    if (currentState != undefined) {
      const taskSelected = tasksList.findIndex((task) => currentState?.id === task.id);
      const myListTasks = tasksList;
      if (myListTasks[taskSelected] != undefined) {
        myListTasks[taskSelected] = { id: myListTasks[taskSelected].id, task: myListTasks[taskSelected].task, currentState: currentState.currentState };
        const myListDone = myListTasks.filter((task) => task.currentState === true);
        const myListUnDone = myListTasks.filter((task) => task.currentState === false);

        setTasksList(myListTasks);
        setTasksListDone(myListDone);
        setTasksListUnDone(myListUnDone);
      }
    }
  }, [currentState, viewToShow]);

  useEffect(() => {
    const taskListStored = localStorage.getItem('taskListStored') ? JSON.parse(localStorage.getItem('taskListStored') || '{}') : [];
    setTasksList(taskListStored);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskListStored', JSON.stringify(tasksList));
  }, [tasksList, tasksListDone, tasksListUnDone]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>#todo</h1>
      <ViewSelector showView={setViewToShow} />
      <div className={styles.taskList}>
        <InputTasks newTask={setNewTask} />

        {viewToShow === 'All' &&
          tasksList.map((task) => <CheckBox label={task.task} initialState={task.currentState} key={task.id} id={task.id} currentState={setCurrentState} />)}

        {viewToShow === 'Active' &&
          tasksListUnDone.map((task) => (
            <CheckBox label={task.task} initialState={task.currentState} key={task.id} id={task.id} currentState={setCurrentState} />
          ))}

        {viewToShow === 'Completed' &&
          tasksListDone.map((task) => {
            return (
              <div className={styles.taskCompleted}>
                <CheckBox label={task.task} initialState={task.currentState} key={task.id} id={task.id} currentState={setCurrentState} />
                <div key={task.id} onClick={deleteItem} id={task.id.toString()} className={styles.deleteTask}>
                  <DeleteOutlineRounded />
                </div>
              </div>
            );
          })}

        {viewToShow === 'Completed' && tasksListDone.length !== 0 && (
          <div onClick={deleteAllTasks} className={styles.deleteAllButton}>
            <div className={styles.deleteAllLabel}>
              <DeleteOutlineRounded />
              <p>Delete all</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskContainer;
