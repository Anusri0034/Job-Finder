import { useEffect, useState } from "react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.href = "/login";
      return;
    }

    fetch("https://job-finder-l7og.onrender.com/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        const myJobs = data.filter(
          (job) => String(job.recruiterId) === String(user.id)
        );

        setJobs(myJobs);
      });
  }, []);

  const deleteJob = async (id) => {
    const response = await fetch(
      `https://job-finder-l7og.onrender.com/api/jobs/${id}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    alert(data.message);

    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div className="jobs-page">

      <nav className="navbar">
        <div className="logo">Job Finder</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/recruiter">Dashboard</a>
        </div>
      </nav>

      <div className="jobs-container">

        <h1>My Jobs</h1>

        <p className="jobs-subtitle">
          Manage your posted jobs.
        </p>

        <div className="job-list">

          {jobs.length === 0 ? (
            <p className="no-jobs">
              You have not posted any jobs.
            </p>
          ) : (
            jobs.map((job) => (
              <div className="job-card" key={job._id}>

                <h3>{job.title}</h3>

                <p>
                  <strong>Company:</strong> {job.company}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

                <p>{job.description}</p>

                <button
                  onClick={() =>
                    window.location.href =
                    `/edit-job?id=${job._id}`
                  }
                >
                  Edit Job
                </button>

                <button onClick={() => deleteJob(job._id)}>
                  Delete Job
                </button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default MyJobs;