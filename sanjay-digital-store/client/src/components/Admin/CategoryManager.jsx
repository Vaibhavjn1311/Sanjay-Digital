import { useState, useEffect } from 'react';
import api from '../../services/api';
import './CategoryManager.css'; // Import the CSS file

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  // const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {

    console.log("AddingCategory...");
    if (!newCategory.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await api.post('/categories', { name: newCategory });
      console.log("response" , response);
      setCategories(prev => [...prev, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? All subcategories and products under it will also be deleted.')) return;
    
    setIsLoading(true);
    try {
      await api.delete(`/categories/${id}`);
      setCategories(prev => prev.filter(cat => cat._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAddSubcategory = async () => {
  //   if (!selectedCategory || !newSubcategory.trim()) return;
    
  //   setIsLoading(true);
  //   try {
  //     const response = await api.post(`/categories/${selectedCategory}/subcategories`, { 
  //       name: newSubcategory 
  //     });
      
  //     setCategories(prev => prev.map(cat => 
  //       cat._id === selectedCategory 
  //         ? { ...cat, subcategories: [...(cat.subcategories || []), response.data] } 
  //         : cat
  //     ));
      
  //     setNewSubcategory('');
  //   } catch (error) {
  //     console.error('Error adding subcategory:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
  //   if (!window.confirm('Are you sure you want to delete this subcategory? All products under it will also be deleted.')) return;
    
  //   setIsLoading(true);
  //   try {
  //     await api.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
      
  //     setCategories(prev => prev.map(cat => 
  //       cat._id === categoryId 
  //         ? { 
  //             ...cat, 
  //             subcategories: cat.subcategories.filter(sub => sub._id !== subcategoryId) 
  //           } 
  //         : cat
  //     ));
  //   } catch (error) {
  //     console.error('Error deleting subcategory:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="category-manager">
      <h1 className="category-manager__title">Manage Categories</h1>
      
      <div className="category-manager__sections">
        {/* Add Category Section */}
        <div className="category-manager__section">
          <h2 className="category-manager__section-title">Add New Category</h2>
          <div className="category-manager__input-group">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="category-manager__input"
            />
            <button
              onClick={handleAddCategory}
              disabled={isLoading || !newCategory.trim()}
              className={`category-manager__button ${isLoading ? 'category-manager__button--loading' : ''}`}
            >
              {isLoading ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </div>

        {/* Add Subcategory Section */}
        {/* <div className="category-manager__section">
          <h2 className="category-manager__section-title">Add New Subcategory</h2>
          <div className="category-manager__subcategory-controls">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-manager__select"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {/* <div className="category-manager__input-group">
              <input
                type="text"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                placeholder="Subcategory name"
                className="category-manager__input"
                disabled={!selectedCategory}
              />
              <button
                onClick={handleAddSubcategory}
                disabled={isLoading || !selectedCategory || !newSubcategory.trim()}
                className={`category-manager__button ${isLoading ? 'category-manager__button--loading' : ''}`}
              >
                {isLoading ? 'Adding...' : 'Add Subcategory'}
              </button>
            </div> 
          </div>
        </div> */}

        {/* Categories List */}
        <div className="category-manager__section">
          <h2 className="category-manager__section-title">Existing Categories</h2>
          {categories.length === 0 ? (
            <p className="category-manager__empty-message">No categories yet.</p>
          ) : (
            <ul className="category-manager__list">
              {categories.map(category => (
                <li key={category._id} className="category-manager__list-item">
                  <div className="category-manager__category-header">
                    <span className="category-manager__category-name">{category.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      disabled={isLoading}
                      className="category-manager__delete-button"
                    >
                      Delete
                    </button>
                  </div>
{/*                   
                  {category.subcategories?.length > 0 && (
                    <ul className="category-manager__sub-list">
                      {category.subcategories.map(subcategory => (
                        <li key={subcategory._id} className="category-manager__sub-list-item">
                          <span className="category-manager__subcategory-name">- {subcategory.name}</span>
                          <button
                            onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                            disabled={isLoading}
                            className="category-manager__delete-button"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  )} */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;