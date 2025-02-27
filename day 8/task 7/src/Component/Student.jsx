import PropTypes from 'prop-types';

export const Student = ({ name, dept, year }) => {
    const getBackgroundColor = (year) => {
        const yearStr = String(year).toLowerCase();
        if (yearStr === "2024-2028") return "lightgreen";
        if (yearStr === "2023-2025") return "lightyellow";
        if (yearStr === "2022-2026") return "red";
        return "lightgray";
    };

    return (
        <div className='div1' style={{ backgroundColor: getBackgroundColor(year) }}>
            <h1>STUDENT CARD</h1>
            <hr />
            <p>{name}</p>
            <p>{dept}</p>
            <p>{year}</p>
        </div>
    );
};

Student.propTypes = {
    rollNo: PropTypes.number.isRequired,
    name: PropTypes.string,
    dept: PropTypes.string,
    year: PropTypes.string 
};

