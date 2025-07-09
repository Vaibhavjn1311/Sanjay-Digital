import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './ProductForm.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    subcategory: '',
    images: [] // holds URLs of existing images (Cloudinary URLs)
  });

  const [selectedImages, setSelectedImages] = useState([]); // new images (File objects)
  const [previewImages, setPreviewImages] = useState([]); // combined previews
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Fetch categories and product if editing
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await api.get(`/products/${id}`);
          const data = response.data;

          setProduct({
            ...data,
            category: data.category?._id || data.category,
            subcategory: data.subcategory?._id || data.subcategory,
            images: data.images || [],
          });

          setPreviewImages([...data.images]);

          // Load subcategories if category exists
          if (data.category) {
            const subcatRes = await api.get(`/categories/${data.category}/subcategories`);
            setSubcategories(subcatRes.data);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (product.category) {
        try {
          const response = await api.get(`/categories/${product.category}/subcategories`);
          setSubcategories(response.data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      }
    };

    fetchSubcategories();
  }, [product.category]);

  // Handle text field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: '' }), // reset subcategory on category change
    }));
  };

  // Handle image selection (from input or drag-drop)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    if (files.length === 0) return;

    const previews = files.map(file => URL.createObjectURL(file));

    setSelectedImages(prev => [...prev, ...files]);
    setPreviewImages(prev => [...prev, ...previews]);
    setIsDragOver(false);
  };

  // Remove an image from preview + selectedImages/product.images
  const removeImage = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    if (index < product.images.length) {
      const updated = [...product.images];
      updated.splice(index, 1);
      setProduct(prev => ({ ...prev, images: updated }));
    } else {
      const updated = [...selectedImages];
      updated.splice(index - product.images.length, 1);
      setSelectedImages(updated);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('subcategory', product.subcategory);

      // Append existing Cloudinary image URLs
      product.images.forEach(img => formData.append('existingImages', img));

      // Append new files to upload
      selectedImages.forEach(img => formData.append('images', img));

      // POST or PUT depending on mode
      if (id) {
        await api.put(`/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h1 className="product-form-title">{id ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="form-input"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="form-group">
            <label htmlFor="subcategory" className="form-label">
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              className="form-select"
              disabled={!product.category}
            >
              <option value="">Select a subcategory</option>
              {subcategories.map(subcategory => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={product.description}
              onChange={handleChange}
              className="form-textarea"
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label className="form-label">Product Images</label>
            <div 
              className={`image-upload-container ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                handleImageChange(e);
              }}
            >
              <div className="image-upload-content">
                <div className="image-upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="image-upload-text">
                  <label
                    htmlFor="file-upload"
                    className="image-upload-label"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Select files</span>
                  </label>
                  <span className="image-upload-or">or</span>
                  <p>Drag and drop images here</p>
                </div>
                <p className="image-upload-hint">Supports JPG, PNG, GIF up to 10MB</p>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="image-upload-input"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            {previewImages.length > 0 ? (
              <div className="preview-container">
                {previewImages.map((img, index) => (
                  <div key={index} className="preview-item">
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      className="preview-image"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="preview-remove-btn"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p>No images selected</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="submit-btn"
          >
            {isLoading ? (
              <>
                <svg className="loading-spinner" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                Saving...
              </>
            ) : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;