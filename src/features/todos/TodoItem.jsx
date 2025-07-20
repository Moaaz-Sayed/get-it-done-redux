import { HiCheck, HiPencil, HiTrash } from "react-icons/hi2";
import { memo } from "react";
import { formatDistanceFromNow } from "../../utils/helpers";
import ModalEditTask from "../../ui/ModalEditTask";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTask } from "./todosSlice";
import Modal from "../../ui/Modal";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleComplete = useCallback(() => {
    dispatch(toggleComplete({ id: todo.id, currentState: todo.completed }));
  }, [dispatch, todo.id, todo.completed]);

  return (
    <>
      <li
        className={`flex flex-col justify-between gap-4 rounded-xl px-6 py-4 shadow transition hover:shadow-md sm:flex-row sm:items-center ${
          todo.completed ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="flex-1">
          <p
            className={`text-lg font-medium ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.title}
          </p>
          <p className="text-sm text-gray-500">
            {formatDistanceFromNow(todo.created_at)}
          </p>
        </div>

        <div className="flex gap-3 self-end text-xl text-gray-600 sm:self-auto">
          <HiCheck
            className={`cursor-pointer transition hover:scale-110 ${
              todo.completed ? "text-green-500 opacity-50" : "text-red-500"
            }`}
            title="Mark as complete"
            onClick={handleComplete}
          />
          <HiPencil
            className="cursor-pointer transition hover:scale-110"
            title="Edit"
            onClick={() => setEditTodo(todo)}
          />
          <HiTrash
            className="cursor-pointer text-red-500 transition hover:scale-110"
            title="Delete"
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </li>

      {editTodo?.id === todo.id && (
        <ModalEditTask todo={editTodo} onCancel={() => setEditTodo(null)} />
      )}

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this task?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteTask(todo.id));
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}

export default memo(TodoItem);
