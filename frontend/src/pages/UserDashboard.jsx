import React from 'react';
import { useAuth } from '../AuthContext';
import Navbar from '../components/Navbar';
import { useTasks } from '../components/TaskContext';
import ChatBot from '../components/Chatbot';

const UserDashboard = () => {
  const { user } = useAuth();
  const { tasks, setTasks } = useTasks();

  // Filter tasks assigned to the current user
  const userTasks = tasks.filter((task) => task.assignedTo === user?.id);

  const handleTaskUpdate = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  return (
    <div className="min-h-screen flex bg-[#CAE4DB]">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:ml-60"> 
        {/* md:ml-60 adds left margin on medium+ screens to avoid navbar overlap */}

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#00303F] mb-6 text-center md:text-left">
          User Dashboard
        </h1>

        {/* Task Container */}
        <div className="bg-[#F5F4F4] rounded-3xl shadow-2xl p-6 border-2 border-[#CDAC81] max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#00303F] text-center md:text-left">
            My Tasks
          </h2>

          {userTasks.length === 0 ? (
            <p className="text-[#00303F] text-center text-lg">No tasks assigned to you.</p>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {userTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#CAE4DB] p-4 sm:p-6 rounded-2xl shadow-md border-2 border-[#CDAC81] hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                    <h3 className="text-xl font-semibold text-[#00303F]">{task.title}</h3>
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskUpdate(task.id, e.target.value)}
                      className="px-3 py-1 border border-[#CDAC81] rounded-md bg-[#F5F4F4] text-[#00303F] focus:outline-none focus:ring-2 focus:ring-[#00303F]"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <p className="text-[#00303F] mb-2">{task.description}</p>

                  <p className="text-[#00303F] font-medium mb-1">Summary (EN):</p>
                  <p className="text-[#00303F] mb-2">{task.summary}</p>

                  <p className="text-[#00303F] font-medium mb-1">Summary (ML):</p>
                  <p className="text-[#00303F] mb-2">{task.summaryML}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default UserDashboard;
