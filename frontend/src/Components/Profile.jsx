import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:5000/api/users/profile/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateName = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.put(
        `http://localhost:5000/api/users/profile/${userId}`,
        {
          name: newName,
        }
      );

      setUser(res.data);
      setEditMode(false);
      setNewName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>

        <div className="profile-info">
          <div className="name-section">
            <p>
              <strong>👤 Name:</strong> {user.name}
            </p>

            {!editMode ? (
              <button
                className="profile-btn"
                onClick={() => setEditMode(true)}
              >
                ✏️ Edit Username
              </button>
            ) : (
              <div className="edit-name">
                <input 
                  type="text"
                  placeholder="Enter new username"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                <button
                  className="profile-btn"
                  onClick={handleUpdateName}
                >
                  Update
                </button>

                <button
                  className="profile-btn"
                  onClick={() => {
                    setEditMode(false);
                    setNewName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <p>
            <strong>📧 Email:</strong> {user.email}
          </p>

          <p>
            <strong>📅 Joined:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>

        <div className="profile-actions">
          <button className="profile-btn" onClick={()=>{alert("You Cannot!");}}>
            🔒 Change Password
          </button>

          <button
            className="profile-btn logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;