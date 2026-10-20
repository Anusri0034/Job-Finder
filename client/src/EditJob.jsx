import { useEffect, useState } from "react";

function EditJob() {
  const [job, setJob] = useState(null);

  const jobId = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    fetch("https://job-finder-l7og.onrender.com/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        const foundJob = data.find((item) => item._id === jobId);
        setJob(foundJob);
      });
  }, [jobId]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const updateJob = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://job-finder-l7og.onrender.com/api/jobs/${jobId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
      }
    );

    const data = await response.json();

    alert(data.message);

    window.location.href = "/my-jobs";
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h2>Edit Job</h2>

        <form onSubmit={updateJob}>

          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="Job Title"
          />

          <input
            type="text"
            name="company"
            value={job.company}
            onChange={handleChange}
            placeholder="Company"
          />

          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <input
            type="text"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            placeholder="Salary"
          />

          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <button type="submit">
            Update Job
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditJob;