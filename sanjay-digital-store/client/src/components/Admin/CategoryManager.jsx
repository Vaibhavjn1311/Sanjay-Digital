import { useState, useEffect } from "react";
import api from "../../services/api";
import "./CategoryManager.css"; // Import the CSS file

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await api.post("/categories", { name: newCategory });
      setCategories((prev) => [...prev, response.data]);
      setNewCategory("");
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Failed to add category.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this category? All subcategories and products under it will also be deleted.",
      )
    )
      return;

    setIsLoading(true);
    setError("");
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="category-manager">
      <h1 className="category-manager__title">Manage Categories</h1>
      {error && <div className="error-message" style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

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
              className={`category-manager__button ${isLoading ? "category-manager__button--loading" : ""}`}
            >
              {isLoading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>
        <div className="category-manager__section">
          <h2 className="category-manager__section-title">
            Existing Categories
          </h2>
          {categories.length === 0 ? (
            <p className="category-manager__empty-message">
              No categories yet.
            </p>
          ) : (
            <ul className="category-manager__list">
              {categories.map((category) => (
                <li key={category._id} className="category-manager__list-item">
                  <div className="category-manager__category-header">
                    <span className="category-manager__category-name">
                      {category.name}
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      disabled={isLoading}
                      className="category-manager__delete-button"
                    >
                      Delete
                    </button>
                  </div>
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
