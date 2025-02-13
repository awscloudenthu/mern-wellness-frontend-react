import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PhysicalWellness = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({ _id: null, userId: null, date: null, steps: "", calories: "" });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  const userId = localStorage.getItem("userId");
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // --- Initialization ---

  // --- This is a hack for now as logout is not working
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found, redirecting to sign-in.");
      navigate("/signin", { replace: true });
    }
  }, [userId]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/health-data/${userId}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching health data:", error));
  }, []);

  // --- Helper Functions ---
  const formatDate = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    return date.toISOString().split("T")[0];
  };

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
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (key === "date") return direction === "asc" ? new Date(a[key]) - new Date(b[key]) : new Date(b[key]) - new Date(a[key]);
      return direction === "asc" ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]);
    });

    setData(sortedData);
  };

  // --- Event Handlers ---
  const handleSave = () => {
    if (!newEntry.date || !newEntry.steps || !newEntry.calories) {
      setError("Please fill out all fields.");
      return;
    }

    const entryData = {
      userId,
      date: formatDate(newEntry.date),
      steps: newEntry.steps,
      calories: newEntry.calories,
    };

    if (editMode) {
      axios
        .put(`${apiUrl}/api/health-data/${newEntry._id}`, entryData)
        .then((response) => {
          const updatedData = data.map((entry) =>
            entry._id === newEntry._id ? { ...entry, ...response.data.data } : entry
          );
          setData(updatedData);
          resetForm();
        })
        .catch((error) => console.error("Error updating health data:", error));
    } else {
      axios
        .post(`${apiUrl}/api/health-data`, entryData)
        .then((response) => {
          setData([...data, response.data.data]);
          resetForm();
        })
        .catch((error) => console.error("Error adding health data:", error));
    }
  };

  const handleEdit = (entry) => {
    setNewEntry({ ...entry, date: new Date(entry.date) });
    setEditMode(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/api/health-data/${id}`)
      .then(() => setData(data.filter((entry) => entry._id !== id)))
      .catch((error) => console.error("Error deleting health data:", error));
  };

  const resetForm = () => {
    setNewEntry({ _id: null, userId: null, date: null, steps: "", calories: "" });
    setEditMode(false);
    setError("");
  };

  // --- Render Function ---
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Physical Wellness Tracker</h2>
      <div className="card p-3 mb-4">
        <h5 className="mb-3">{editMode ? "Edit Entry" : "Add New Entry"}</h5>
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <DatePicker
              selected={newEntry.date ? parseDateWithoutUTC(newEntry.date) : null}
            //  onChange={(date) => setNewEntry({ ...newEntry, date })}
              onChange={(date) => {
                const formattedDate = formatDate(date);  // Convert to yyyy-mm-dd for saving
                setNewEntry({ ...newEntry, date: formattedDate });
                setError("");
              }}
              className="form-control"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Steps"
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
        {error && <div className="text-danger mt-2">{error}</div>}
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-secondary me-2" onClick={resetForm}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {editMode ? "Update Entry" : "Add Entry"}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("steps")} style={{ cursor: "pointer" }}>
                Steps {sortConfig.key === "steps" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => handleSort("calories")} style={{ cursor: "pointer" }}>
                Calories {sortConfig.key === "calories" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toISOString().split("T")[0]}</td>
                <td>{entry.steps}</td>
                <td>{entry.calories}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(entry)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(entry._id)}>
                    Delete
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