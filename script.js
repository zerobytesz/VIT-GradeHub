// Shared info HTML including detailed guide, grading, conversion, FAQs
const SHARED_INFO_HTML = `
<h2>VIT CGPA Calculator Guide</h2>

<p>This tool is tailored for students at the Vellore Institute of Technology (VIT) to conveniently assess their academic performance. By entering the grades and credit hours for each subject, it calculates your overall CGPA or GPA efficiently. This article explains the grading system at VIT and provides a step-by-step walkthrough for CGPA calculation.</p>

<h3>VIT Grading System</h3>
<table>
  <thead>
    <tr><th>Grade</th><th>Points</th></tr>
  </thead>
  <tbody>
    <tr><td>S</td><td>10</td></tr>
    <tr><td>A</td><td>9</td></tr>
    <tr><td>B</td><td>8</td></tr>
    <tr><td>C</td><td>7</td></tr>
    <tr><td>D</td><td>6</td></tr>
    <tr><td>E</td><td>5</td></tr>
    <tr><td>F</td><td>0</td></tr>
  </tbody>
</table>

<h3>How CGPA is Computed</h3>
<p><b>Formula:</b> CGPA = Total Grade Points / Total Credits</p>
<p>Each course's grade point is multiplied by its credit, summed across all subjects, and divided by the total credits taken.</p>

<h3>Step-by-Step Calculation</h3>
<ul>
  <li>📝 <b>Gather Data:</b> Note down the grades and corresponding credits for each course.</li>
  <li>🧮 <b>Course GPA:</b> Multiply the grade point with the credit for each subject.</li>
  <li>📊 <b>Semester GPA:</b> Add all course grade points in a semester, divide by total semester credits.</li>
  <li>🎓 <b>Final CGPA:</b> Multiply each SGPA by its semester's total credits, sum all, and divide by total credits taken.</li>
</ul>

<h3>Example:</h3>
<p>Courses: A (9) in 3 credits, B (8) in 4 credits, A- (8.5) in 2 credits<br>
Semester GPA = (27 + 32 + 17) / 9 = 8.44</p>
<p>Previous SGPA = 8.2 (for 9 credits), then:<br>
<b>CGPA = (8.2 × 9 + 8.44 × 9) / 18 = 8.32</b></p>

<h3>CGPA to Percentage Conversion</h3>
<p><b>Formula:</b> Percentage = CGPA × 10</p>
<table>
  <thead>
    <tr><th>CGPA</th><th>Percentage</th></tr>
  </thead>
  <tbody>
    <tr><td>10</td><td>100%</td></tr>
    <tr><td>9.0 - 9.9</td><td>90 - 99%</td></tr>
    <tr><td>8.0 - 8.9</td><td>80 - 89%</td></tr>
    <tr><td>7.0 - 7.9</td><td>70 - 79%</td></tr>
    <tr><td>6.0 - 6.9</td><td>60 - 69%</td></tr>
    <tr><td>5.0 - 5.9</td><td>50 - 59%</td></tr>
    <tr><td>Below 5.0</td><td>Below 50%</td></tr>
  </tbody>
</table>

<h3>FAQs</h3>
<ul>
  <li><b>What is CGPA?</b><br>It’s the average of your academic performance across all semesters at VIT.</li>
  <li><b>How do I calculate GPA for a subject?</b><br>Multiply the grade point by the subject’s credit hours.</li>
  <li><b>What’s the formula VIT uses?</b><br>CGPA = ∑(GradePoints × Credits) / ∑Credits</li>
  <li><b>Where can I check my CGPA?</b><br>Log into the VTOP portal, go to Academics, and view your CGPA there.</li>
</ul>

<hr/>

<p><b>Made by students, for students. Contact:</b> vitcgpacalculator@gmail.com
</p>
`;

// Add a new semester row in CGPA section
function addSemester() {
  const div = document.createElement("div");
  div.className = "row";
  div.innerHTML = `
        <input type="number" step="0.01" placeholder="SGPA" min="0" max="10" required />
        <input type="number" step="1" placeholder="Credits" min="1" required />
        <button type="button" class="delete" onclick="removeRow(this)">X</button>
    `;
  document.getElementById("semesters").appendChild(div);
}

// Add a new subject row in GPA section
function addSubject() {
  const div = document.createElement("div");
  div.className = "row";
  div.innerHTML = `
        <input type="number" step="0.01" placeholder="Grade Point" min="0" max="10" required />
        <input type="number" step="1" placeholder="Credits" min="1" required />
        <button type="button" class="delete" onclick="removeRow(this)">X</button>
    `;
  document.getElementById("subjects").appendChild(div);
}

// Remove a row (either from CGPA or GPA section)
function removeRow(button) {
  button.parentElement.remove();
}

// Run this after DOM loads
document.addEventListener("DOMContentLoaded", function () {
  // Initialize with one row in both sections
  addSemester();
  addSubject();

  // Show CGPA tab by default
  showTab("cgpa", null);

  // Insert shared info HTML into both CGPA and GPA tabs
  document.getElementById("shared-info").innerHTML = SHARED_INFO_HTML;
  document.getElementById("shared-info-gpa").innerHTML = SHARED_INFO_HTML;

  // CGPA Calculation
  document.getElementById("cgpa-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const rows = document.querySelectorAll("#semesters .row");
    let totalPoints = 0,
      totalCredits = 0;
    rows.forEach((row) => {
      const inputs = row.querySelectorAll("input");
      const sgpa = parseFloat(inputs[0].value);
      const credits = parseFloat(inputs[1].value);
      if (!isNaN(sgpa) && !isNaN(credits)) {
        totalPoints += sgpa * credits;
        totalCredits += credits;
      }
    });
    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById("result").innerText = `Your CGPA is: ${cgpa}`;
  });

  // GPA Calculation
  document.getElementById("gpa-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const rows = document.querySelectorAll("#subjects .row");
    let totalPoints = 0,
      totalCredits = 0;
    rows.forEach((row) => {
      const inputs = row.querySelectorAll("input");
      const grade = parseFloat(inputs[0].value);
      const credits = parseFloat(inputs[1].value);
      if (!isNaN(grade) && !isNaN(credits)) {
        totalPoints += grade * credits;
        totalCredits += credits;
      }
    });
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById(
      "gpa-result"
    ).innerText = `Your Semester GPA is: ${gpa}`;
  });
});

// Show selected tab and highlight active button
function showTab(tabId, event) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";

  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (event) event.target.classList.add("active");
}
