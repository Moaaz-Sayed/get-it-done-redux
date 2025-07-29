import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiEye, HiEyeOff, HiSearch, HiX } from "react-icons/hi";
import { addTask, setSearchQuery, toggleShowCompleted } from "./todosSlice";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

function TodoForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdding = useSelector((state) => state.todos.status === "loadingAdd");
  const { showCompleted } = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState("");
  const [searchTask, setSearchTask] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    dispatch(addTask({ title: newTask, user_id: user.id }));
    setNewTask("");
  }

  function handleHideComplete() {
    dispatch(toggleShowCompleted());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:gap-2"
    >
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        size="md"
        className="w-full sm:flex-1"
      />

      <div className="flex items-center gap-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="inline-flex items-center justify-center gap-3 whitespace-nowrap"
        >
          {isAdding ? <SpinnerMini /> : "Add Task"}
        </Button>

        {showCompleted ? (
          <HiEyeOff
            onClick={handleHideComplete}
            title="Hide Complete tasks"
            className="cursor-pointer text-xl transition-colors hover:text-blue-600"
          />
        ) : (
          <HiEye
            onClick={handleHideComplete}
            title="Show Complete tasks"
            className="cursor-pointer text-xl transition-colors hover:text-blue-600"
          />
        )}

        {searchTask ? (
          <HiX
            onClick={() => {
              dispatch(setSearchQuery(""));
              setSearchTask(false);
            }}
            className="cursor-pointer text-xl transition-colors hover:text-blue-600"
            title="Close search"
          />
        ) : (
          <HiSearch
            onClick={() => setSearchTask(true)}
            className="cursor-pointer text-xl transition-colors hover:text-blue-600"
            title="Search tasks"
          />
        )}
      </div>

      {searchTask && (
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
          <Input
            type="text"
            autoFocus
            placeholder="Search tasks..."
            size="md"
            className="w-full sm:w-64"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      )}
    </form>
  );
}

export default TodoForm;
