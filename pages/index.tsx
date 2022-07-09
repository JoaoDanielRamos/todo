// * Next Material
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

// * Modules
import styles from '../styles/App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

// * Redux Actions
import {
  changeTheme,
  changeFilter,
  addNewToDo,
  deleteToDo,
  completeToDo,
  clearCompleted,
} from '../features/appSlice';

// * Assets
import icon_moon from '../assets/icon-moon.svg';
import icon_sun from '../assets/icon-sun.svg';
import icon_cross from '../assets/icon-cross.svg';
import icon_check from '../assets/icon-check.svg';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const { app } = useSelector((state: any) => state);
  const { listOfToDos, filter, theme } = app.value;
  const listOfToDoSize = listOfToDos
    .map((item: any) => {
      if (item.completed === false) return 1;
    })
    .filter((element: any) => element === 1).length;

  return (
    <div className={styles.container}>
      {/* HEAD*/}
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Main App*/}
      <div className={styles.app}>
        <div className={styles.header}>
          <h1 className={styles.logo}>toDo</h1>
          <Image
            src={icon_moon}
            alt=''
            onClick={() => dispatch(changeTheme())}
          />
        </div>

        {/* CREATE A NEW TODO */}
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();

            dispatch(
              addNewToDo({
                description: inputValue,
                completed: false,
                id: uuidv4(),
              })
            );

            setInputValue('');
          }}
        >
          <div className={styles.mark}></div>
          <input
            className={styles.input}
            type='text'
            name=''
            id=''
            value={inputValue}
            placeholder='Create a new toDo...'
            onChange={event => {
              setInputValue(event.target.value);
            }}
          />
        </form>

        {/* LIST OF TODOS */}
        <div className={styles.toDoContainer}>
          <ul className={styles.toDoList}>
            {listOfToDos
              .filter((toDo: any) => {
                if (filter === 'all') return toDo;
                if (filter === 'active') return toDo.completed === false;
                if (filter === 'completed') return toDo.completed === true;
              })
              .map((item: any, index: number) => (
                <li className={styles.toDoWrapper} key={index + 1}>
                  <div className={styles.toDoItem} data-id={`${item.id}`}>
                    <div
                      className={
                        item.completed
                          ? `${styles.toDoItemStatus} ${styles.toDoItemStatusCompleted}`
                          : styles.toDoItemStatus
                      }
                      onClick={() => {
                        dispatch(completeToDo(item.id));
                      }}
                    ></div>
                    <p
                      className={
                        item.completed
                          ? `${styles.toDoItemDescription} ${styles.toDoItemDescriptionCompleted}`
                          : styles.toDoItemDescription
                      }
                    >
                      {item.description}
                    </p>
                    <button
                      className={styles.closeButton}
                      onClick={() => {
                        dispatch(deleteToDo(item.id));
                      }}
                    >
                      <Image src={icon_cross} alt='' />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <div className={styles.toDoInfo}>
            <p className={styles.toDoInfoDescription}>
              {listOfToDoSize} {listOfToDoSize > 1 ? 'items' : 'item'} left
            </p>
            <button
              className={styles.toDoInfoButton}
              onClick={() => dispatch(clearCompleted())}
            >
              Clear Completed
            </button>
          </div>
        </div>

        {/* FILTER PICK */}
        <div className={styles.filter}>
          {['All', 'Active', 'Completed'].map((filterOption, index) => (
            <button
              key={index + 1}
              className={
                filterOption.toLowerCase() === filter
                  ? `${styles.filterActive}`
                  : ''
              }
              onClick={() => {
                dispatch(changeFilter(filterOption.toLowerCase()));
              }}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
