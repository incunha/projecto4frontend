import React, { useEffect } from 'react';
import useCategoryStore from '../../../categoryStore';
import useTasksStore from '../../../taskStore';

function CategorySelect() {
  const { categories, fetchCategories } = useCategoryStore();
  const { fetchTasksByCategory } = useTasksStore();
  const fetchTasks = useTasksStore(state => state.fetchTasks);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryChange = (event) => {
    event.target.value === "" ? fetchTasks() : fetchTasksByCategory(event.target.value);
  };

  return (
    <select onChange={handleCategoryChange}>
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;