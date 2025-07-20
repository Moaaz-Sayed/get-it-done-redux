import { useSelector } from "react-redux";
import TaskList from "../features/todos/TaskList";
import TodoForm from "../features/todos/TodoForm";

function Main() {
  const userName = useSelector(
    (state) => state.auth.user.user_metadata.username,
  );

  return (
    <main className="mx-auto max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-md">
      <h1 className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-center text-3xl font-bold tracking-tight text-gray-800 text-transparent drop-shadow-md">
        {`${userName}'s Todos`}
      </h1>

      <TodoForm />
      <TaskList />
    </main>
  );
}

export default Main;
