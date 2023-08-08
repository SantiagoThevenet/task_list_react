import { useState, useContext, createContext } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks";
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
        const res = await getTasksRequest()
        try {
          setTasks(res.data)
        } catch (error) {
          console.log(error);
        }
    }

  const createTask = async (task) => {
    const res = await createTaskRequest(task)
    console.log(res)
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
