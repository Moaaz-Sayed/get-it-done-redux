import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./todosSlice";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function TodoForm() {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    dispatch(addTask({ title: newTask, user_id: user.id }));
    setNewTask("");
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
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
      >
        Add Task
      </Button>
    </form>
  );
}

export default TodoForm;
