import React, { useEffect, useState } from 'react';
import useCategoryStore from '../../../categoryStore';
import './categoriesModal.css';

function CategoriesModal({isOpen, onRequestClose}) {
  const categories = useCategoryStore(state => state.categories);
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const deleteCategory = useCategoryStore(state => state.deleteCategory);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  const handleDelete = (categoryName) => {
    deleteCategory(categoryName);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/createCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!response.ok) {
        console.error(`Error creating category: ${response.statusText}`);
        return;
      }

      fetchCategories();
      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };



  if (!isOpen) {
    return null;
  }

  return (
    <div className="categories-modal-overlay">
      <div className="categories-modal">
        <button onClick={onRequestClose}>Close Modal</button>

        {isCreating ? (
          <div className="modal">
            <label>
              Name:
              <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
            </label>
            <button onClick={handleCreate}>Add</button>
            <button onClick={() => setIsCreating(false)}>Cancel</button>
          </div>
        ) : (
          <div className="modal">
            <button onClick={() => setIsCreating(true)}>Create Category</button>
            <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td><button className="icon-button">✏️</button></td> 
                  <td><button className="icon-button" onClick={() => handleDelete(category.name)}>🗑️</button></td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )}
</div>
</div>
)

}


export default CategoriesModal;