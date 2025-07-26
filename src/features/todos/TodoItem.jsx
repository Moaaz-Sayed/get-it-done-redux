import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { deleteTask, toggleComplete, hidingDeleteModal } from "./todosSlice";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ModalEditTask from "../../ui/ModalEditTask";
import SpinnerMini from "../../ui/SpinnerMini";
import { formatDistanceFromNow } from "../../utils/helpers";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { editingId } = useSelector((state) => state.todos);
  const hideDeleteModal = useSelector((state) => state.todos.hideDeleteModal);
  const isEditing = editingId === todo.id;
  const isCompleted = todo.completed;

  const handleComplete = useCallback(() => {
    dispatch(toggleComplete({ id: todo.id, currentState: todo.completed }));
  }, [dispatch, todo.id, todo.completed]);

  useEffect(() => {
    if (isEditing && isCompleted) {
      dispatch(toggleComplete({ id: todo.id, currentState: todo.completed }));
    }
  }, [isEditing, isCompleted, dispatch, todo.id, todo.completed]);

  return (
    <>
      <motion.li
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, scale: todo.completed ? 0.95 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className={`flex cursor-pointer flex-col justify-between gap-4 rounded-xl px-6 py-4 shadow transition hover:shadow-md sm:flex-row sm:items-center ${
          todo.completed ? "bg-gray-200" : "bg-gray-50"
        }`}
      >
        <div className="flex-1" onClick={handleComplete}>
          <p
            className={`text-lg font-medium ${
              isCompleted ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {isEditing ? <SpinnerMini /> : todo.title}
          </p>

          <div className="flex flex-col sm:flex-row">
            <span className="mr-1 text-sm text-gray-600">
              • Added {formatDistanceFromNow(todo.created_at)}
            </span>
            {todo.updated_at &&
              new Date(todo.updated_at).getTime() !==
                new Date(todo.created_at).getTime() && (
                <>
                  <span className="text-sm text-gray-600">
                    • Edited {formatDistanceFromNow(todo.updated_at)}
                  </span>
                </>
              )}
          </div>
        </div>

        <div className="flex gap-3 self-end text-xl text-gray-600 sm:self-auto">
          <HiPencil
            className="cursor-pointer transition hover:scale-110"
            title="Edit"
            onClick={() => setEditTodo(todo)}
          />
          <HiTrash
            className="cursor-pointer text-red-500 transition hover:scale-110"
            title="Delete"
            onClick={() => {
              if (hideDeleteModal) {
                dispatch(deleteTask(todo.id));
              } else {
                setShowDeleteModal(true);
              }
            }}
          />
        </div>
      </motion.li>

      {editTodo?.id === todo.id && (
        <ModalEditTask todo={editTodo} onCancel={() => setEditTodo(null)} />
      )}

      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this task?"
          onCancel={() => {
            setShowDeleteModal(false);
            setDontShowAgain(false);
          }}
          onConfirm={() => {
            if (dontShowAgain) dispatch(hidingDeleteModal());
            dispatch(deleteTask(todo.id));
            setShowDeleteModal(false);
          }}
        >
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            Don't show this message again
          </label>
        </Modal>
      )}
    </>
  );
}

export default memo(TodoItem);
