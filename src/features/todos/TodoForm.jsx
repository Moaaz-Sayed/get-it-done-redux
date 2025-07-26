import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./todosSlice";
import { toggleShowCompleted } from "./todosSlice";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiEye, HiEyeOff } from "react-icons/hi";

function TodoForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdding = useSelector((state) => state.todos.status === "loadingAdd");
  const { showCompleted } = useSelector((state) => state.todos);
  const [newTask, setNewTask] = useState("");

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
      className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch"
    >
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
        size="md"
        className="flex-1"
      />
      <div className="flex items-center justify-center gap-1">
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
            className="cursor-pointer"
          />
        ) : (
          <HiEye
            onClick={handleHideComplete}
            title="Show Complete tasks"
            className="cursor-pointer"
          />
        )}
      </div>
    </form>
  );
}

export default TodoForm;
