
###  **Routing System**
- Uses **hash-based routing** to load different content dynamically.
- Listens for `hashchange` and `load` events to update the UI.

#### **Example:**
```js
const routes = {
    "": getHomePage(),
    "home": getHomePage(),
    "jobs": getJobsPage(),
    "contact": getContactPage(),
};

window.addEventListener("hashchange", loadContent);
window.addEventListener("load", loadContent);
```
- The `routes` object maps URL hash values to **page content**.
- The `loadContent()` function updates the page based on the `location.hash`.

### **Dynamic Page Content**
Each page has a function that returns HTML content:

#### **Example:** Home Page Content
```js
function getHomePage() {
    return `<h2>Welcome to Job Portal</h2>
        <p>Find your dream job here!</p>
        <img src="https://source.unsplash.com/800x400/?career,office" alt="Career Image">`;
}
```
- `getJobsPage()` dynamically displays jobs (filtered by search input).
- `getContactPage()` displays contact details.

### **Live Job Search**
- Filters jobs **in real-time** as the user types.
- Updates the page **without refreshing**.

#### **How It Works:**
```js
document.getElementById("search").addEventListener("input", function() {
    if (location.hash === "#jobs") {
        document.getElementById("content").innerHTML = getJobsPage(this.value);
    }
});
```
- When the user types in the search bar, `getJobsPage(searchQuery)` filters jobs based on the input.
- Updates `#content` dynamically.

### **Job Data & Filtering**
- Jobs are stored in an array and filtered using **`Array.filter()`**.

#### **Example:** Job Filtering
```js
const jobs = [
    { title: "Frontend Developer", company: "Company A" },
    { title: "Backend Engineer", company: "Company B" }
];

let filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
```
- If no jobs match, it displays `"No jobs found for [searchQuery]"`.

---

## Output
![Website Preview](assets/output.png)

