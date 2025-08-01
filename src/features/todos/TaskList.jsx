import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { fetchTodos, showDeleteModal } from "./todosSlice";
import TodoItem from "./TodoItem";
import Spinner from "../../ui/Spinner";

function TaskList() {
  const { todos, status, error, showCompleted, searchQuery } = useSelector(
    (state) => state.todos,
  );
  const hideDeleteModal = useSelector((state) => state.todos.hideDeleteModal);

  const visibleTodos = todos
    .filter((todo) => showCompleted || !todo.completed)
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === "loadingFitch") return <Spinner />;
  if (status === "failed") return <p className="text-red-600">{error}</p>;

  return (
    <>
      {hideDeleteModal && (
        <button
          onClick={() => dispatch(showDeleteModal())}
          className="mt-4 w-full text-center text-sm text-blue-500 underline"
        >
          Show delete confirmation again
        </button>
      )}
      <ul className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4">
        <AnimatePresence>
          {todos.length === 0 ? (
            <li className="text-center italic text-gray-500">
              You don’t have any tasks yet. Let’s get productive!
            </li>
          ) : (
            visibleTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </AnimatePresence>
      </ul>
    </>
  );
}

export default TaskList;
