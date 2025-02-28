**Overview**

This project is a React application that allows users to add, search, and remove students dynamically. The app displays a list of students with their name, department, and year, while dynamically updating the UI using React state (useState).

**Key Features**

Add new students using an input form.

Search students by name or department.

Remove students with a delete button.

Dynamic background colors based on the academic year.

Live filtering as the user types.

**App.jsx:**

Manages the student list (useState).

Implements add, search, and remove functionality.

Uses .map() to render filtered student components dynamically.

**Student.jsx:**

A reusable React component that displays student information.

Uses dynamic background colors based on the year.

Implements PropTypes for type validation.

**What I Learned**

*Managing State in React (useState):*

Stored and updated student data dynamically.

Allowed users to add and remove students in real time.

*List Filtering & Searching:*

Used .filter() to dynamically search for students.

*Event Handling in React:*

Implemented onChange() for search and input fields.

Used onClick() to handle button actions.

*Component Reusability:*

Created a Student component and reused it for each student entry.
