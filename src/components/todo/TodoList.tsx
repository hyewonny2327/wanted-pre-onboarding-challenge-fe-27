import { TodoItemType } from '../../api/todoApi';

interface TodoListProps {
  todoList: TodoItemType[];
}

const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  return (
    <div>
      <div>할 일 목록</div>
      {todoList.length === 0 && <div>할 일 목록이 없습니다.</div>}
      {todoList.length !== 0 && todoList.map((todoItem) => <div key={todoItem.id}>{todoItem.title}</div>)}
    </div>
  );
};

export default TodoList;
