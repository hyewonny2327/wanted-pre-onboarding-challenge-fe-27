import { useState } from 'react';
import styles from '../../styles/todo.module.scss';
import { createTodo } from '../../api/todoApi';
interface AddTodoProps {
  getTodoList: () => void;
}
export default function AddTodo({ getTodoList }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleAddButtonClick() {
    await createTodo(title, content);
    initState();
    //createTodo 를 하고나면 상위 컴포넌트의 getTodo 를 호출하여 다시 렌더링
    getTodoList();
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
