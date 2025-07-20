import { FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../features/auth/authSlice";
import Modal from "../ui/Modal";

function Header() {
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleLogoutConfirm() {
    dispatch(logout());
    setShowLogoutModal(false);
  }

  return (
    <>
      {showLogoutModal && (
        <Modal
          message="Are you sure you want to logout?"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
      <header className="mx-auto mb-8 flex max-w-2xl items-center justify-between">
        <Logo size="lg" />
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
          title="Logout"
        >
          {/* Large screen: show text */}
          <span className="hidden sm:inline">Logout</span>

          {/* Small screen: show icon */}
          <FiLogOut className="text-lg sm:hidden" />
        </button>
      </header>
    </>
  );
}

export default Header;
