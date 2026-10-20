function Recruiter() {
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
          Manage your jobs and applications.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Add Job</h3>
            <p>Post a new job opportunity.</p>
            <button onClick={() => window.location.href = "/add-job"}>
              Add Job
            </button>
          </div>

          <div className="dashboard-card">
            <h3>My Jobs</h3>
            <p>View and manage your posted jobs.</p>
            <button onClick={() => window.location.href = "/my-jobs"}>
              My Jobs
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Applications</h3>
            <p>View applications from job seekers.</p>
            <button
              onClick={() =>
                window.location.href = "/recruiter-applications"
              }
            >
              Applications
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Recruiter;