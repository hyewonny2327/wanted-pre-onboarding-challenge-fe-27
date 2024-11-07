import { useState } from 'react';
import styles from '../../styles/todo.module.scss';
import { UseMutationResult } from '@tanstack/react-query';
import { createTodoProps, TodoItemType } from '../../api/todoApi';
interface AddTodoProps {
  createTodoMutation: UseMutationResult<TodoItemType, Error, createTodoProps, unknown>;
}
export default function AddTodo({ createTodoMutation }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleAddButtonClick() {
    createTodoMutation.mutate({ title, content });
    initState();
  }
  function initState() {
    setTitle('');
    setContent('');
    setIsOpen(false);
  }

  return (
    <section className={styles.todoInput__container}>
      <div className={styles.todoInput__description} onClick={() => setIsOpen(!isOpen)}>
        할 일을 추가하세요
      </div>
      {isOpen && (
        <div className={styles.todoInput__inputField}>
          <input
            className={styles.todoInput__title}
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.todoInput__content}
            placeholder="내용을 입력하세요"
            maxLength={300}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className={styles.todoInput__button} onClick={handleAddButtonClick}>
            추가
          </button>
        </div>
      )}
    </section>
  );
}
