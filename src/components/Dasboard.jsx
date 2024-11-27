import { Navigate, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User on dashboard", user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">MyApp Dashboard</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <main className="dashboard-main">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Welcome, {user?.name || "User"}</h1>
            <div className="profile-image-container">
              {user?.picture ? (
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <Navigate to="/" />
              )}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email || "No email provided"}</p>
            </div>
            <div className="info-item">
              <label>Department</label>
              <p>IT Web development</p>
            </div>
            <div className="info-item">
              <label>Cost Center</label>
              <p>CT-ITDT-02</p>
            </div>
          </div>
        </div>

        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Recent Activity</h3>
            <p>No recent activity to display</p>
          </div>
          <div className="widget">
            <h3>Statistics</h3>
            <p>No statistics available</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
