**Overview**
This project is a React application that displays a list of students and allows users to search for students by name or department. Each student is displayed as a student card, with a dynamic background color based on their academic year.

**App.jsx:**

Manages a searchable student list using React state (useState).

Implements a filtering feature based on the student's name or department.

Uses .map() to dynamically render student components.

**Student.jsx:**

A reusable component that displays student information.

Implements dynamic background colors based on the year property.

Uses PropTypes for type validation.

**What I Learned**

*State Management in React (useState):*

Created a search bar that updates dynamically.

Used useState to store and update the search term.

*List Filtering in React:*

Used .filter() to filter student names and departments dynamically.

*Dynamic Styling:*

Changed the background color of student cards based on the academic year.

*PropTypes for Type Safety:*

Ensured rollNo, name, dept, and year have correct types.
