import { useEffect, useState } from "react";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    fetch(`http://localhost:5000/api/applications/user/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="jobs-page">

      <nav className="navbar">
        <div className="logo">Job Finder</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/job-seeker">Dashboard</a>
          <a href="/jobs">Jobs</a>
        </div>
      </nav>

      <div className="jobs-container">

        <h1>My Applications</h1>

        <p className="jobs-subtitle">
          View the jobs you have applied for.
        </p>

        <div className="job-list">

          {applications.length === 0 ? (
            <p className="no-jobs">
              You have not applied for any jobs.
            </p>
          ) : (
            applications.map((application) => (
              <div className="job-card" key={application._id}>

                <h3>{application.jobId.title}</h3>

                <p>
                  <strong>Company:</strong>{" "}
                  {application.jobId.company}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {application.jobId.location}
                </p>

                <p>
                  <strong>Salary:</strong>{" "}
                  {application.jobId.salary}
                </p>

                <p>
                  <strong>Status:</strong> Applied
                </p>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default MyApplications;