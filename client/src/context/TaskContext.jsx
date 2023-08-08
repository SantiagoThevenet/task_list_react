import { useState, useContext, createContext } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";
const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    try {
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
  };

  const deleteTask = async (id) => {
    try {
      console.log("Esto es id");
      console.log(id);
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        getTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
