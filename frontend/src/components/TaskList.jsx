// components/TaskList.jsx
import React, { useState } from "react";

const TaskList = ({ tasks, onTaskDelete, onTaskUpdate, showFullText }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedDeadline, setEditedDeadline] = useState("");

  const handleStatusChange = (taskId, newStatus) => {
    onTaskUpdate?.(taskId, { status: newStatus });
  };

  const handleDeadlineEdit = (taskId, deadline) => {
    onTaskUpdate?.(taskId, { deadline });
    setEditingTask(null);
  };

  return (
    <div
      className="
        space-y-6 
        max-h-[65vh]     /* limit height */
        overflow-y-auto  /* add vertical scroll */
        pr-2             /* spacing for scrollbar */
      "
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          className="
            bg-[#F5F4F4] 
            p-6 
            rounded-xl 
            border 
            border-[#CDAC81] 
            shadow-lg 
            hover:shadow-2xl 
            transition-shadow 
            duration-300
          "
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
            <h3 className="font-bold text-[#00303F] text-lg">{task.title}</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                task.status === "pending"
                  ? "bg-[#CDAC81]/30 text-[#CDAC81]"
                  : task.status === "in-progress"
                  ? "bg-[#CAE4DB]/30 text-[#00303F]"
                  : "bg-[#00303F]/20 text-[#00303F]"
              }`}
            >
              {task.status.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#00303F] mb-4 italic break-words">
            {task.description}
          </p>

          {/* Content */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-[#00303F] mb-1">
              Content: 
            </h4>
            <p className="text-sm text-[#00303F] break-words">
              <b>English Summary:</b> {task.summary}
            </p>
            <p className="text-sm text-[#00303F] break-words">
              <b>Malayalam Summary:</b> {showFullText ? task.summaryML : task.fullText }
            </p>
          </div>

          {/* Footer: Assigned, Deadline, Actions */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Assigned + Deadline */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <span className="text-sm text-[#00303F]">
                Assigned to: User {task.assignedTo}
              </span>

              {/* Deadline edit */}
              {editingTask === task.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={editedDeadline}
                    onChange={(e) => setEditedDeadline(e.target.value)}
                    className="text-sm px-2 py-1 border border-[#CDAC81] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAE4DB]"
                  />
                  <button
                    onClick={() => handleDeadlineEdit(task.id, editedDeadline)}
                    className="text-sm bg-[#CAE4DB] text-[#00303F] px-2 py-1 rounded-lg hover:bg-[#CDAC81] transition-colors"
                  > 
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="text-sm text-[#00303F] hover:text-[#CDAC81]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#00303F]">
                    Deadline: {task.deadline || "Not set"}
                  </span>
                  {onTaskUpdate && (
                    <button
                      onClick={() => {
                        setEditingTask(task.id);
                        setEditedDeadline(task.deadline || "");
                      }}
                      className="text-sm bg-[#CAE4DB] text-[#00303F] px-2 py-1 rounded-lg hover:bg-[#CDAC81] transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Status + Delete */}
            <div className="flex items-center space-x-2">
              {onTaskUpdate && (
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="text-sm px-2 py-1 border border-[#CDAC81] rounded-lg bg-[#F5F4F4] focus:outline-none focus:ring-2 focus:ring-[#CAE4DB]"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              )}

              {onTaskDelete && (
                <button
                  onClick={() => onTaskDelete(task.id)}
                  className="text-sm bg-[#00303F] text-[#F5F4F4] px-3 py-1 rounded-lg hover:bg-[#CDAC81] hover:text-[#00303F] transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
