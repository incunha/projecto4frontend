import { create } from "zustand";

const fetchCategories = async (set) => {
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
};

const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: () => fetchCategories(set),

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
       
        fetchCategories(set);
      }
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  },
}));

export default useCategoryStore;
