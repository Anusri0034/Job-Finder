import { useState } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import JobSeeker from "./JobSeeker";
import Recruiter from "./Recruiter";
import AddJob from "./AddJob";
import Jobs from "./Jobs";
import MyApplications from "./MyApplications";
import MyJobs from "./MyJobs";
import EditJob from "./EditJob";
import RecruiterApplications from "./RecruiterApplications";


function Home() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  if (page === "register") return <Register />;
  if (page === "login") return <Login />;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">Job Finder</div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/jobs" onClick={closeMenu}>Jobs</a>

          <button onClick={() => window.location.href = "/login"}>
            Login
          </button>

          <button onClick={() => window.location.href = "/register"}>
            Register
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>
            Discover the right job and build your career with Job Finder.
          </p>

          <div className="search-box">
            <input type="text" placeholder="Search for jobs..." />
            <button onClick={() => window.location.href = "/jobs"}>
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="jobs-section" id="jobs">
        <h2>Find Your Next Opportunity</h2>
        <p>Explore job opportunities from different companies.</p>

        <div className="job-cards">
          <div className="job-card">
            <h3>Frontend Developer</h3>
            <p>ABC Technologies</p>
            <span>Chennai</span>
          </div>

          <div className="job-card">
            <h3>Backend Developer</h3>
            <p>XYZ Solutions</p>
            <span>Coimbatore</span>
          </div>

          <div className="job-card">
            <h3>Full Stack Developer</h3>
            <p>Tech Company</p>
            <span>Bangalore</span>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <h2>Why Job Finder?</h2>
        <p>
          Job Finder helps job seekers discover opportunities
          and recruiters find talented candidates.
        </p>
      </section>

      <footer>
        <p>© 2026 Job Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}


function App() {
  const path = window.location.pathname;

  if (path === "/register") {
    return <Register />;
  }

  if (path === "/login") {
    return <Login />;
  }

  if (path === "/job-seeker") {
    return <JobSeeker />;
  }
  if (path === "/recruiter") {
    return <Recruiter />;
  }

  if (path === "/add-job") {
    return <AddJob />;
  }
  if (path === "/jobs") {
    return <Jobs />;
  }
  if (path === "/my-applications") {
    return <MyApplications />;
  }
  if (path === "/my-jobs") {
    return <MyJobs />;
  }

  if (path === "/edit-job") {
    return <EditJob />;
  }
  if (path === "/recruiter-applications") {
    return <RecruiterApplications />;
  }
  return <Home />;
}

export default App;