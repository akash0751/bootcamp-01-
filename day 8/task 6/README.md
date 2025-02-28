**Overview**

This project is a React application that displays a list of students with dynamic styling based on their academic year. Each student is shown on a student card with their name, department, and year, and the background color changes dynamically based on the year.

**App.jsx:**

Renders multiple Student components, each with different details.

Passes rollNo, name, dept, and year as props.

**Student.jsx:**

A reusable React component that displays student information.

Implements dynamic background colors based on the year property.

Uses PropTypes for type validation.

**What I Learned**

*Dynamic Styling in React:*

Used inline styles to change the background color dynamically based on the student’s year.

*Props Handling:*

Passed student details as props and rendered them dynamically.

*Using PropTypes:*

Ensured type safety by validating props.
Component Reusability:
Created a Student component and reused it multiple times in App.jsx.
