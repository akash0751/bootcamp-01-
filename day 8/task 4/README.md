**Overview**

This project is a React application that displays a student's details in a card format. It utilizes React components and props to dynamically pass and render student information.

App.jsx: Imports and renders the Student component, passing student details (rollNo, name, dept, year) as props.

Student.jsx: A reusable component that displays student information and includes PropTypes validation for type safety.

**What I Learned**

*Component-Based Architecture:*

Created a reusable Student component.

Passed data from App.jsx to Student.jsx using props.

*Props Handling in React:*

Defined required and optional props.

Used PropTypes for type validation.

JSX Syntax: Rendered dynamic content using {props.name}.

Modular Code Structure: Separated concerns by keeping App.jsx and Student.jsx independent.
