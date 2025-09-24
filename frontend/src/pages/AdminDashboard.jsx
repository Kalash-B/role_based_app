import React from 'react';
import Navbar from '../components/Navbar';
import DocumentUpload from '../components/DocumentUpload';
import TaskList from '../components/TaskList';
import { useTasks } from '../components/TaskContext';
import ChatBot from '../components/Chatbot';
import { useAuth } from "../AuthContext"; // ⬅️ import here

export const TASK_ROLES = ['1', '2', '3']; // user IDs: engineer, manager, depotManager

const AdminDashboard = () => {
  const { tasks, setTasks } = useTasks();
  const { user } = useAuth(); // ⬅️ user info

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Accept multiple role-based tasks
  const handleTaskCreate = (newTasks) => {
    const tasksToAdd = Array.isArray(newTasks) ? newTasks : [newTasks];

    const tasksWithId = tasksToAdd.map((task) => ({
      ...task,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    }));

    setTasks([...tasks, ...tasksWithId]);
  };

  // ✅ Dynamic counts
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="flex h-screen bg-[#CAE4DB]">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 md:ml-60 transition-all duration-300">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#00303F] mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Section */}
        <section className="flex flex-col sm:flex-row gap-4">
          <div className="p-4 flex-1 max-w-xs sm:max-w-none min-w-[200px] shadow-md hover:shadow-lg hover:-translate-y-1 transition transform duration-200 space-y-3 mx-auto border border-[#A4CCD9] rounded-xl bg-white">
            <p className="text-base font-normal mb-1 text-gray-900">Total Tasks</p>
            <p className="text-[#3bb6b6] font-bold text-2xl mt-1">{totalTasks}</p>
          </div>

          <div className="p-4 flex-1 max-w-xs sm:max-w-none min-w-[200px] shadow-md hover:shadow-lg hover:-translate-y-1 transition transform duration-200 space-y-3 mx-auto border border-[#A4CCD9] rounded-xl bg-white">
            <p className="text-base font-normal mb-1 text-gray-900">Pending Tasks</p>
            <p className="text-[#3bb6b6] font-bold text-2xl mt-1">{pendingTasks}</p>
          </div>

          <div className="p-4 flex-1 max-w-xs sm:max-w-none min-w-[200px] shadow-md hover:shadow-lg hover:-translate-y-1 transition transform duration-200 space-y-3 mx-auto border border-[#A4CCD9] rounded-xl bg-white">
            <p className="text-base font-normal mb-1 text-gray-900">Completed Tasks</p>
            <p className="text-[#3bb6b6] font-bold text-2xl mt-1">{completedTasks}</p>
          </div>
        </section>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Upload */}
          <div className="bg-[#F5F4F4] rounded-2xl shadow-xl p-4 border border-[#CDAC81] hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-6 text-[#00303F] border-b-2 border-[#CDAC81] pb-2">
              Upload Document
            </h2>
            <DocumentUpload onTaskCreate={handleTaskCreate} roles={TASK_ROLES} />
          </div>

          {/* All Tasks */}
          <div className="bg-[#F5F4F4] rounded-2xl shadow-xl p-4 border border-[#CDAC81] hover:shadow-2xl transition-shadow duration-300 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#00303F] border-b-2 border-[#CDAC81] pb-2">
              All Tasks
            </h2>
            <TaskList
              tasks={tasks}
              onTaskDelete={handleTaskDelete}
              showFullText={true}
            />
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
