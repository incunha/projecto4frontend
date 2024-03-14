import create from 'zustand';

const useTasksStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/all');
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
}));

export default useTasksStore;