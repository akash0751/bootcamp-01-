import PropTypes from 'prop-types'

export const Student = (props) => {
    const getBackgroundColor = (year) => {
        if (year.toLowerCase() === "2024-2028") return "lightgreen";
        if (year.toLowerCase() === "2023-2025") return "lightyellow";
        if (year.toLowerCase() === "2022-2026") return "red";
        return "lightgray";
      };

  return (
    
    <div className='div1' style={{backgroundColor:getBackgroundColor(props.year)}}>
            <h1>STUDENT CARD</h1><hr></hr>
      <p>{props.name}</p>
      <p>{props.dept}</p>
      <p> {props.year}</p>
    </div>
  )
}
Student.PropTypes={
    rollNo:PropTypes.number.isRequired,
    name : PropTypes.string,
    dept: PropTypes.string,
    year: PropTypes.number 
}
