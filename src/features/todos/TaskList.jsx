import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "./todosSlice";

function TaskList() {
  const { todos, status, error } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p className="text-red-600">{error}</p>;

  return (
    <ul className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4">
      {todos.length === 0 ? (
        <li className="text-center italic text-gray-500">
          You don’t have any tasks yet. Let’s get productive!
        </li>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </ul>
  );
}

export default TaskList;
