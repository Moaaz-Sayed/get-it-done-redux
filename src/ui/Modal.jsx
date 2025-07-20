// src/ui/ConfirmLogoutModal.jsx
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";

function ConfirmLogoutModal({ onCancel, onConfirm, message }) {
  const ref = useOutsideClick(onCancel);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={ref}
          className="max-w-md rounded-xl bg-white px-8 py-6 text-center shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="mb-6 text-lg font-medium">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="rounded-md bg-gray-400 px-4 py-2 text-white hover:opacity-90"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:opacity-90"
            >
              Yes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default ConfirmLogoutModal;
