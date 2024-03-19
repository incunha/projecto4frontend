import {create} from 'zustand';

const useTasksStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching tasks: ${response.statusText}`);
        return;
      }

      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error(error);
    }
  },


  updateStatus: async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/changeStatus/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ status }),
      });
      
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
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/block/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
      });
      
      if (!response.ok) {
        console.error(`Error deleting task: ${response.statusText}`);
        return;
      }

      
      await useTasksStore.getState().fetchTasks();
    } catch (error) {
      console.error(error);
    }
  },

  fetchTasksByCategory: async (categoryName) => {
    try {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/byCategory/${categoryName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching tasks by category: ${response.statusText}`);
        return;
      }
  
      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error(error);
    }
  },

  fetchTasksByUser: async (username) => {
    try {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/byUser/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching tasks by user: ${response.statusText}`);
        return;
      }
  
      const tasks = await response.json();
      set({ tasks });
    } catch (error) {
      console.error(error);
    }
  },

  updateTask: async (task) => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.error(`Error updating task: ${response.statusText}`);
        return;
      }

      await useTasksStore.getState().fetchTasks();
    } catch (error) {
      console.error(error);
    }
  },



}));




export default useTasksStore;