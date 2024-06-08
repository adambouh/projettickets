// src/components/AdminStadiumDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Admin.css';

function AdminStadiumDetail() {
  const { stadiumId } = useParams();
  const [stadium, setStadium] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/stade/${stadiumId}`)
      .then(response => {
        setStadium(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching stadium:', error);
      });
  }, [stadiumId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = formData.categories.map((category, i) => (
      i === index ? { ...category, [field]: value } : category
    ));
    setFormData({
      ...formData,
      categories: updatedCategories,
    });
  };

  const handleAddCategory = () => {
    setFormData({
      ...formData,
      categories: [...formData.categories, { id: Date.now(), capacity: 0, price: 0 }],
    });
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = formData.categories.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      categories: updatedCategories,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/stade/${stadiumId}`, formData)
      .then(response => {
        setStadium(response.data);
        alert('Stadium updated successfully');
      })
      .catch(error => {
        console.error('Error updating stadium:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/stade/${stadiumId}`)
      .then(() => {
        alert('Stadium deleted successfully');
        navigate('/admin/stadiums');
      })
      .catch(error => {
        console.error('Error deleting stadium:', error);
      });
  };

  if (!stadium) {
    return <div>Loading...</div>;
  }

  return (
    <div className="stadium-detail">
      <h2>Edit Stadium</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
        </label>
        <label>
          image:
          <input type="text" name="path" value={formData.path} onChange={handleInputChange} />
        </label>
        <div className="categories">
          <h3>Categories</h3>
          {formData.categories.map((category, index) => (
            
            <div key={category._id} className="category-item">
                <br></br>
                <label>
                id: 
                <input
                  type="number"
                  value={category.id}
                  onChange={(e) => handleCategoryChange(index, 'id', e.target.value)}
                />
              </label>
              <label>
                Capacity: 
                <input
                  type="number"
                  value={category.capacity}
                  onChange={(e) => handleCategoryChange(index, 'capacity', e.target.value)}
                />
              </label>
              <br></br>
              <label>
                Price:
                <input
                  type="number"
                  value={category.price}
                  onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                />
              </label><br></br>
              <button type="button" onClick={() => handleDeleteCategory(index)} style={{width:"fit-content"}}>Delete Category</button>
            </div>
            
          ))}
                      <br></br>

          <button type="button" onClick={handleAddCategory} >Add Category</button>
        </div>
      </form>                      <br></br>

      <button onClick={handleUpdate} style={{ backgroundColor: '#198754' }}>Update Stadium</button>
      <br></br>

      <button onClick={handleDelete} style={{ backgroundColor: '#cd2828' }}>Delete Stadium</button>
    </div>
  );
}

export default AdminStadiumDetail;
