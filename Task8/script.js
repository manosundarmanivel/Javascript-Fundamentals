const routes = {
    "": getHomePage(),
    "home": getHomePage(),
    "jobs": getJobsPage(),
    "contact": getContactPage(),
};


function loadContent() {
    const hash = location.hash.slice(1);
    document.getElementById("content").innerHTML = routes[hash] || `<h2>Page Not Found</h2>`;
}


function getHomePage() {
    return `<h2>Welcome to Job Portal</h2>
        <p>Find your dream job here!</p>
        <img src="https://source.unsplash.com/800x400/?career,office" alt="Career Image">`;
}


function getJobsPage(searchQuery = "") {
    const jobs = [
        { title: "Frontend Developer", company: "Presidio", img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg" },
        { title: "Backend Engineer", company: "Profilio", img: "https://images.pexels.com/photos/5483074/pexels-photo-5483074.jpeg" },
        { title: "Data Scientist", company: "Nutz Technologies", img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg" },
        { title: "UX Designer", company: "Ippo Pay", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" }
    ];
    

    let filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredJobs.length === 0) {
        return `<p>No jobs found for "${searchQuery}"</p>`;
    }

    return `` + 
        filteredJobs.map(job => `
            <div class="job-card">
                <img src="${job.img}" alt="${job.title}">
                   <h3>${job.title} - <strong>${job.company}</strong></h3>
            </div>
        `).join("");
}


function getContactPage() {
    return `<h2>Contact Us</h2>
        <p>Email: hr@jobportal.com</p>
        <p>Phone: 123-456-7890</p>
        <img src="https://source.unsplash.com/800x400/?office,team" alt="Office Image">`;
}


window.addEventListener("hashchange", loadContent);
window.addEventListener("load", loadContent);


document.getElementById("search").addEventListener("input", function() {
    if (location.hash === "#jobs") {
        document.getElementById("content").innerHTML = getJobsPage(this.value);
    }
});
