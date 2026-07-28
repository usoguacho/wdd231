const courseList = document.getElementById('courseList');
const courseCount = document.getElementById('courseCount');
const creditCount = document.getElementById('creditCount');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filter) {
  // Decide which courses to show based on the filter
  let filtered;
  if (filter === 'all') {
    filtered = courses;
  } else {
    filtered = courses.filter(course => course.subject.toLowerCase() === filter);
  }

  // Clear out whatever is currently displayed
  courseList.innerHTML = '';

  // Build a card for each course
  filtered.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p class="course-title">${course.title}</p>
      <p class="course-credits">${course.credits} credits</p>
      <p class="course-description">${course.description}</p>
      <p class="course-tech">${course.technology.join(', ')}</p>
    `;

    courseList.appendChild(card);
  });

  // Update the summary counts
  courseCount.textContent = filtered.length;
  creditCount.textContent = filtered.reduce((total, course) => total + course.credits, 0);
}

// Wire up each filter button
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update which button looks "active"
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Re-render the course list using this button's filter
    renderCourses(button.dataset.filter);
  });
});

// Show all courses on initial page load
renderCourses('all');