import React, { useEffect, useState } from 'react';
import useCategoryStore from '../../../categoryStore';
import ConfirmationModal from '../modal-confirmation/confirmationModal';
import './categoriesModal.css';

function CategoriesModal({isOpen, onRequestClose}) {
  const categories = useCategoryStore(state => state.categories);
  const fetchCategories = useCategoryStore(state => state.fetchCategories);
  const deleteCategory = useCategoryStore(state => state.deleteCategory);
  const [isCreating, setIsCreating] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, fetchCategories]);

  const handleDelete = (categoryName) => {
    setCategoryToDelete(categoryName);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(categoryToDelete);
    setIsConfirmationModalOpen(false);
  };

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setNewCategoryName(category.name);
  };

  const handleConfirmEdit = async () => {
    console.log(categoryToEdit);
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/task/updateCategory', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'token': sessionStorage.getItem('token'),
        },
        body: JSON.stringify({ id: categoryToEdit.id, name: newCategoryName }),
      });
      if (!response.ok) {
        console.error(`Error updating category: ${response.statusText}`);
        return;
      }
      fetchCategories();
      setCategoryToEdit(null);
    } catch (error) {
      console.error(error);
    }
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
        ) : categoryToEdit ? (
          <div className="modal">
            <label>
              New name:
              <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
            </label>
            <button onClick={handleConfirmEdit}>Confirm</button>
            <button onClick={() => setCategoryToEdit(null)}>Cancel</button>
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
                    <button className="icon-button" onClick={() => handleEdit(category)}>✏️</button>
                    <td><button className="icon-button" onClick={() => handleDelete(category.name)}>🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen} 
          onRequestClose={() => setIsConfirmationModalOpen(false)} 
          message="Are you sure you want to delete this category?" 
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}

export default CategoriesModal;