import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  UserPlus,
  FileText,
  ListTree,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(user?.role === "admin" ? "/admin/login" : "/login");
  };

  // Menu items with icons
  const adminMenu = [
    { name: "Upload Doc", icon: <Upload size={18} />, onClick: () => {} },
    { name: "Create User", icon: <UserPlus size={18} />, onClick: () => {} },
    { name: "Summarization", icon: <FileText size={18} />, onClick: () => {} },
    { name: "Category of GR", icon: <ListTree size={18} />, onClick: () => {} },
  ];

  const userMenu = [
    { name: "My Tasks", icon: <ListTree size={18} />, onClick: () => {} },
    { name: "Summarization", icon: <FileText size={18} />, onClick: () => {} },
  ];

  const menuToRender = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <>
      {/* Hamburger button (visible only on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#3bb6b6] p-2 rounded-lg text-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-[#3bb6b6] text-white w-60 p-4 flex flex-col justify-between shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Top Section */}
        <div className="flex flex-col font-normal text-base rounded-md border border-transparent py-4 px-2">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <img
              src="/MetroDocs.png"
              alt="MetroDocs Logo"
              className="w-32 h-auto"
            />
          </div>

          <span className="px-3 py-2 mt-2 mb-10 rounded-2xl transition-colors duration-200 text-sm font-medium bg-[#CAE4DB] text-[#00303F] shadow-sm">
            Welcome, {user?.name}
          </span>

          {/* Render menu dynamically */}
          {menuToRender.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false); // auto-close on mobile
              }}
              className="flex items-center px-3 py-2 mb-2 rounded-xl hover:bg-[#2a8f8f] hover:text-white transition-colors duration-200 border hover:border-[#1f6d6d] gap-2"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>

        {/* Bottom Section */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-[#CAE4DB] w-full text-[#00303F] font-semibold px-4 py-2 rounded-lg hover:bg-[#55c1e5] hover:text-[#00303F] transition-all duration-300 shadow-md"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
