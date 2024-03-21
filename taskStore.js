import { create } from "zustand";

const useTasksStore = create((set) => ({
  activeTasks: [],
  inactiveTasks: [],

  fetchActiveTasks: async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/allActive",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(`Error fetching active tasks: ${response.statusText}`);
        return;
      }

      const activeTasks = await response.json();
      set({ activeTasks });
    } catch (error) {
      console.error(error);
    }
  },

  fetchInactiveTasks: async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/allInactive",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(`Error fetching inactive tasks: ${response.statusText}`);
        return;
      }

      const inactiveTasks = await response.json();
      set({ inactiveTasks });
    } catch (error) {
      console.error(error);
    }
  },

  updateStatus: async (taskId, status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/changeStatus/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        console.error(`Error updating task status: ${response.statusText}`);
        return;
      }

      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error(error);
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/block/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(`Error deleting task: ${response.statusText}`);
        return;
      }

      await useTasksStore.getState().fetchActiveTasks();
    } catch (error) {
      console.error(error);
    }
  },

  fetchTaskCreator: async (taskId) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/creator/${taskId}`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching task creator: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(error);
    }
  },

  fetchTasksByCategory: async (categoryName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/byCategory/${categoryName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Error fetching tasks by category: ${response.statusText}`
        );
        return;
      }

      const tasks = await response.json();
      set({ activeTasks: tasks });
    } catch (error) {
      console.error(error);
    }
  },

  fetchTasksByUser: async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/byUser/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(`Error fetching tasks by user: ${response.statusText}`);
        return;
      }

      const tasks = await response.json();
      set({ activeTasks: tasks });
    } catch (error) {
      console.error(error);
    }
  },

  updateTask: async (task) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify(task),
        }
      );

      if (!response.ok) {
        console.error(`Error updating task: ${response.statusText}`);
        return;
      }

      await useTasksStore.getState().fetchActiveTasks();
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useTasksStore;
