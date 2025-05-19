import React, { useState } from "react";
import "../styles/userTable.css";

const UserTable = () => {
  // Sample User Data
  const [users, setUsers] = useState([
    { id: 1, level: "Admin" },
    { id: 2, level: "Editor" },
    { id: 3, level: "Viewer" },
    { id: 4, level: "Manager" },
  ]);

  // Search state
  const [search, setSearch] = useState("");

  // Handle Delete User
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Filter users by search input
  const filteredUsers = users.filter((user) =>
    user.id.toString().includes(search)
  );

  return (
    <div className="user-table-container">
      <h2></h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search User ID..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.level}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="no-results">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
