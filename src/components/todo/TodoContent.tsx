import { useEffect, useState } from 'react';
import { TodoItemType } from '../../api/todoApi';
import styles from '../../styles/todo.module.scss'; // 스타일 파일 import

interface TodoContentProps {
  todoItem: TodoItemType | undefined;
  handleClickUpdateButton: (title: string, content: string) => Promise<void>;
  handleClickDeleteButton: () => Promise<void>;
}

export default function TodoContent({ todoItem, handleClickUpdateButton, handleClickDeleteButton }: TodoContentProps) {
  const [isUpdateActive, setIsUpdateActive] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todoItem?.title || '');
  const [updatedContent, setUpdatedContent] = useState(todoItem?.content || '');
  useEffect(() => {
    if (todoItem) {
      setUpdatedTitle(todoItem.title);
      setUpdatedContent(todoItem.content);
    }
  }, [todoItem]);

  function handleUpdateTodo() {
    setIsUpdateActive(false);
    if (updatedTitle && updatedContent) {
      handleClickUpdateButton(updatedTitle, updatedContent);
    }
  }

  return (
    <div className={styles.todoContent__container}>
      {!todoItem ? (
        <div className={styles.todoContent__message}>할 일 목록을 선택해주세요</div>
      ) : (
        <>
          <div className={styles.todoContent__menu}>
            {isUpdateActive ? (
              <div onClick={handleUpdateTodo}>수정완료</div>
            ) : (
              <>
                <div className={styles.todoContent__menu__item} onClick={() => setIsUpdateActive(true)}>
                  수정
                </div>
                <div className={styles.todoContent__menu__item} onClick={handleClickDeleteButton}>
                  삭제
                </div>
              </>
            )}
          </div>
          <div>
            {isUpdateActive ? (
              <>
                <label className={styles.todoContent__input__label}>제목</label>
                <input
                  className={styles.todoContent__input}
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <label className={styles.todoContent__input__label}>내용</label>
                <input
                  className={styles.todoContent__input}
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                />
              </>
            ) : (
              <>
                <div className={styles.todoContent__title}>{todoItem.title}</div>
                <div className={styles.todoContent__content}>{todoItem.content}</div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
