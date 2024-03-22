import { create } from "zustand";



const useCategoryStore = create((set) => ({
  categories: [],
  isWarningModalOpen: false,
  setWarningModalOpen: (isOpen) => set({ isWarningModalOpen: isOpen }),
  

   fetchCategories: async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/allCategories",
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
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/deleteCategory/${categoryName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: token,
          },
        }
      );

      if (response.ok) {
        await fetchCategories();
      }else if(response.status === 409){
        set({ isWarningModalOpen: true, warningMessage: 'Cannot delete category that has tasks.' });
      }
      return response;
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  },

  createCategory: async (newCategoryName) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/createCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({ name: newCategoryName }),
        }
      );

      if (response.ok) {
        await fetchCategories();
      }else if(response.status === 409){
        set({ isWarningModalOpen: true, warningMessage: 'Category already exists' });
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  updateCategory: async (categoryToEdit, newCategoryName) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/updateCategory",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            token: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: categoryToEdit.id,
            name: newCategoryName,
          }),
        }
      );

      if (response.ok) {
        await fetchCategories();
      }
      else if(response.status === 409){
        set({ isWarningModalOpen: true, warningMessage: 'Name already exists' });
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCategoryStore;
