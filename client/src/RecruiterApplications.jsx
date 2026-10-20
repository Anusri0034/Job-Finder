import { useEffect, useState } from "react";

function RecruiterApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    fetch(
      `https://job-finder-l7og.onrender.com/api/applications/recruiter/${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      });
  }, []);

  return (
    <div className="jobs-page">

      <nav className="navbar">
        <div className="logo">Job Finder</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/recruiter">Dashboard</a>
          <a href="/my-jobs">My Jobs</a>
        </div>
      </nav>

      <div className="jobs-container">

        <h1>Applications</h1>

        <p className="jobs-subtitle">
          View applications received for your jobs.
        </p>

        <div className="job-list">

          {applications.length === 0 ? (
            <p className="no-jobs">
              No applications received yet.
            </p>
          ) : (
            applications.map((application) => (
              <div className="job-card" key={application._id}>

                <h3>{application.jobId.title}</h3>

                <p>
                  <strong>Applicant:</strong>{" "}
                  {application.userId.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {application.userId.email}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {application.jobId.company}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {application.jobId.location}
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

export default RecruiterApplications;