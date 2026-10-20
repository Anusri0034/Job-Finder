import { useState } from "react";

function AddJob() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/jobs/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    recruiterId: user.id
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            setFormData({
                title: "",
                company: "",
                location: "",
                description: "",
                salary: ""
            });
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-box">

                <h2>Add New Job</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>

                    <button type="submit">
                        Add Job
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddJob;