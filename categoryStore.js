import {create} from 'zustand';

const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/allCategories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
      });
      
      if (!response.ok) {
        console.error(`Error fetching categories: ${response.statusText}`);
        return;
      }

      const categories = await response.json();
      set({ categories });
    } catch (error) {
      console.error(error);
    }
  },
  deleteCategory: async (categoryName) => {
    try {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/deleteCategory/${categoryName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        console.error(`Error deleting category: ${response.statusText}`);
        return;
      }

      // Remove the deleted category from the state
      const newCategories = get().categories.filter(category => category.name !== categoryName);
      set({ categories: newCategories });
    } catch (error) {
      console.error(error);
    }
  },





}));

export default useCategoryStore;