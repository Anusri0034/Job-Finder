import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://job-finder-l7og.onrender.com/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const applyJob = async (jobId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    if (user.role !== "jobseeker") {
      alert("Only job seekers can apply for jobs");
      return;
    }

    try {
      const response = await fetch(
        "https://job-finder-l7og.onrender.com/api/applications/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            jobId: jobId,
            userId: user.id
          })
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to apply for job");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

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

        <h1>Available Jobs</h1>

        <p className="jobs-subtitle">
          Find the right opportunity for your career.
        </p>

        <input
          type="text"
          className="job-search"
          placeholder="Search by job title, company or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="job-list">

          {filteredJobs.length === 0 ? (
            <p className="no-jobs">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
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

                <p className="job-description">
                  {job.description}
                </p>

                <button onClick={() => applyJob(job._id)}>
                  Apply Job
                </button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Jobs;