import React, { useEffect } from 'react';
import useCategoryStore from '../../../categoryStore';
import useTasksStore from '../../../taskStore';
import './categorySelect.css';

function CategorySelect() {
  const { categories, fetchCategories } = useCategoryStore();
  const { fetchTasksByCategory } = useTasksStore();
  const fetchActiveTasks = useTasksStore(state => state.fetchActiveTasks);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


  const handleCategoryChange = (event) => {
    event.target.value === "" ? fetchActiveTasks() : fetchTasksByCategory(event.target.value);
  };

  return (
    <select className='mySelect' onChange={handleCategoryChange}>
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