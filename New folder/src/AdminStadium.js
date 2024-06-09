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
  const [doors, setDoors] = useState([]); // State to manage doors data

  useEffect(() => {
    axios.get(`http://localhost:5000/api/stade/${stadiumId}`)
      .then(response => {
        setStadium(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching stadium:', error);
      });

    // Fetch doors data from the server
    axios.get(`http://localhost:5000/api/stade/${stadiumId}/doors`)
      .then(response => {
        setDoors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doors:', error);
      });
  }, [stadiumId]);
  const [newDoorName, setNewDoorName] = useState('');

  const handleAddDoor = () => {
    axios.post(`http://localhost:5000/api/stade/${stadiumId}/doors`, { doorName: newDoorName, crowdLevel: 0 })
      .then(response => {
        setDoors([...doors, response.data]);
        // Clear the input field after adding the door
        setNewDoorName('');
      })
      .catch(error => {
        console.error('Error adding door:', error);
      });
  };
  // Function to handle deleting a door
  const handleDeleteDoor = (doorId) => {
    axios.delete(`http://localhost:5000/api/stade/${stadiumId}/doors/${doorId}`)
      .then(() => {
        setDoors(doors.filter(door => door._id !== doorId));
      })
      .catch(error => {
        console.error('Error deleting door:', error);
      });
  };
  const [editedDoorName, setEditedDoorName] = useState('');

  // Function to handle updating a door name
  const handleEditDoorName = (doorId) => {
    axios.patch(`http://localhost:5000/api/stade/${stadiumId}/doors/${doorId}`, { doorName: editedDoorName })
      .then(response => {
        const updatedDoors = doors.map(door =>
          door._id === doorId ? { ...door, doorName: response.data.doorName } : door
        );
        setDoors(updatedDoors);
        // Clear the edited door name after updating
        setEditedDoorName('');
      })
      .catch(error => {
        console.error('Error updating door:', error);
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
              <button type="button" onClick={() => handleDeleteCategory(index)} style={{width:"fit-content", backgroundColor: '#cd2828' }}>Delete Category</button>
            </div>
            
          ))}
                      <br></br>

          <button type="button" onClick={handleAddCategory} >Add Category</button>
        </div>
      </form>                      <br></br>
      <div className="doors">
        <h3>Doors</h3>
        {doors.map(door => (
          <div key={door._id} className="door-item">
            <br/>
            <label>Door name</label>
              <input
              type="text"
              placeholder={door.doorName}
              value={editedDoorName}
              onChange={(e) => setEditedDoorName(e.target.value)}
            />
            {/* Button to submit the edited door name */}
            <button style={{width:"fit-content"}} onClick={() => handleEditDoorName(door._id)}>Update</button>
            {/* Button to delete the door */}
            <button  style={{width:"fit-content", backgroundColor: '#cd2828' }} onClick={() => handleDeleteDoor(door._id)}>Delete</button>
          </div>
        ))}
   <div><br/>
   <label>New door</label>
          <input
            type="text"
            placeholder="Enter door name"
            value={newDoorName}
            onChange={(e) => setNewDoorName(e.target.value)}
          />
          <button  style={{width:"fit-content"}}  onClick={handleAddDoor}>Add Door</button>
        </div>      </div>
      <button onClick={handleUpdate} style={{ backgroundColor: '#198754' }}>Update Stadium</button>
      <br></br>

      <button onClick={handleDelete} style={{ backgroundColor: '#cd2828' }}>Delete Stadium</button>
    </div>
  );
}

export default AdminStadiumDetail;
