import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";  // Reguired until data is persisted in mangodb
import axios from "axios";

const PhysicalWellness = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({ _id: null, userId: null, date: null, steps: "", calories: "" });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" }); // Default sorting by date (desc)
  const userId = "seeded";  //Hardcoded until AWS Cognito userpool is implemented to persist user data
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/health-data/${userId}`)
      .then((response) => {
        console.log("Hey, I was successful in calling api from", apiUrl, " " ,response.data);
        setData(response.data); // Set state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching health data:", error);
      });
  }, []);

  // Function to format Date object to yyyy-mm-dd
  const formatDate = (date) => {
    // Ensure date is a Date object
    if (!(date instanceof Date)) {
      date = new Date(date); // Convert to Date if it's not already a Date object
    }
    return date.toISOString().split('T')[0]; // Return the date in 'yyyy-mm-dd' format
  };

  // Function to parse yyyy-mm-dd without UTC conversion
  const parseDateWithoutUTC = (dateString) => {
    // If the date is already a Date object, convert it to a string in 'yyyy-mm-dd' format
    if (dateString instanceof Date) {
      dateString = dateString.toISOString().split('T')[0];  // Convert to 'yyyy-mm-dd' string format
    }

    if (!dateString || typeof dateString !== 'string') {
      console.error("Invalid dateString:", dateString);  // For debugging
      return null;
    }

    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day);
  };
  //
  // Add or Update Entry
  // For now, the data is only changed in the browser. Once the AWS Cognito user pool is implemented, it will persist in mangodb
  //
  const handleSave = () => {
    if (!newEntry.date) {
      setError("  Enter Date");
      return;
    }
    if (!newEntry.steps) {
      setError("  Enter Steps");
      return;
    }
    if (!newEntry.calories) {
      setError("  Enter Calories");
      return;
    }

    if (!newEntry._id) {
      newEntry._id = uuidv4();
    }

    let updatedData;

    const newEntryFormatted = {
      ...newEntry,
      date: formatDate(newEntry.date) // Ensure it's saved as yyyy-mm-dd
    };
    if (editMode) {
      updatedData = data.map((entry) => (entry._id === newEntryFormatted._id ? newEntryFormatted : entry));
    } else {
      updatedData = [...data, { ...newEntryFormatted, userId: "seeded" }];  // For now 
    }

    // Sort the data according to the current sortConfig
    updatedData = updatedData.sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return sortConfig.direction === "asc"
        ? Number(a[sortConfig.key]) - Number(b[sortConfig.key])
        : Number(b[sortConfig.key]) - Number(a[sortConfig.key]);
    });

    setData(updatedData);
    resetForm();
  };

  // Edit an entry
  const handleEdit = (entry) => {
    setNewEntry({
      ...entry,
      date: new Date(entry.date), // Convert string to Date object for DatePicker
    });
    setEditMode(true);
  };

  // Delete an entry
  const handleDelete = (id) => {
    setData(data.filter((entry) => entry._id !== id));
  };

  // Reset form
  const resetForm = () => {
    // setNewEntry({ id: null, date: null, steps: "", calories: "" });
    setNewEntry({ _id: null, userId: null, date: null, steps: "", calories: "" });
    setEditMode(false);
    setError("");
  };

  // Sorting Logic
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (key === "date") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      return direction === "asc"
        ? Number(a[key]) - Number(b[key])
        : Number(b[key]) - Number(a[key]);
    });
    setData(sortedData);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Physical Wellness Tracker</h2>
      {/* Add or Edit Form */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">{editMode ? "Edit Entry" : "Add New Entry"}</h5>
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <DatePicker
              selected={newEntry.date ? parseDateWithoutUTC(newEntry.date) : null}
              onChange={(date) => {
                const formattedDate = formatDate(date);  // Convert to yyyy-mm-dd for saving
                setNewEntry({ ...newEntry, date: formattedDate });
                setError("");
              }}
              className="form-control"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"  // Display format
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Steps"
              max="99999"
              min="0"
              value={newEntry.steps}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numeric values and limit max length to 5 digits
                if (/^\d{0,5}$/.test(value)) {
                  setNewEntry({ ...newEntry, steps: value });
                  setError("");
                }
              }}
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Calories"
              max="9999"
              min="0"
              value={newEntry.calories}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numeric values and limit max length to 5 digits
                if (/^\d{0,4}$/.test(value)) {
                  setNewEntry({ ...newEntry, calories: e.target.value });
                  setError("");
                }
              }}
            />
          </div>
        </div>
        {error && (
          <div className="text-danger mt-2 fw-bold" style={{ fontSize: "0.8rem" }}>
            {error}
          </div>
        )}
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-secondary me-2" onClick={resetForm}>
            <i className="fas fa-undo"></i>
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {editMode ? <i className="fas fa-edit"></i> : <i className="fas fa-plus-circle"></i>}
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("steps")}
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                Steps {sortConfig.key === "steps" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("calories")}
                style={{ textAlign: "center", cursor: "pointer" }}
              >
                Calories{" "}
                {sortConfig.key === "calories" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toISOString().split("T")[0]}</td>
                <td className="text-center">{entry.steps}</td>
                <td className="text-center">{entry.calories}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(entry)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(entry._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhysicalWellness;
