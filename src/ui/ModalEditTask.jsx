import { useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { editTask } from "../features/todos/todosSlice";

function ModalEditTask({ todo, onCancel }) {
  const [newTitle, setNewTitle] = useState(todo.title);
  const dispatch = useDispatch();
  const ref = useOutsideClick(onCancel);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle) return;

    await dispatch(editTask({ id: todo.id, newTitle }));
    onCancel();
  }

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={ref}
        className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg"
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="mb-5 w-full rounded border border-gray-300 px-4 py-2 text-base"
            placeholder="Edit task"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:opacity-90"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

export default ModalEditTask;
