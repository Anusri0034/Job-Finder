function JobSeeker() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-page">

      <nav className="navbar">
        <div className="logo">Job Finder</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">

        <h1>Welcome, {user?.name}</h1>

        <p className="dashboard-subtitle">
          Find jobs and manage your applications.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Find Jobs</h3>
            <p>Search and apply for available jobs.</p>
            <button onClick={() => window.location.href = "/jobs"}>
              Find Jobs
            </button>
          </div>

          <div className="dashboard-card">
            <h3>My Applications</h3>
            <p>View your applied jobs.</p>
            <button
              onClick={() =>
                window.location.href = "/my-applications"
              }
            >
              My Applications
            </button>
          </div>

          <div className="dashboard-card">
            <h3>My Profile</h3>
            <p>View your account information.</p>
            <button onClick={() => alert("Profile feature coming soon")}>
              My Profile
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default JobSeeker;