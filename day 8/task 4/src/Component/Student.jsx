import PropTypes from 'prop-types'

export const Student = (props) => {
  return (
    <div className='div1'>
        <div className="row">
            <div className="col">
            <h1>STUDENT CARD</h1><hr></hr>
      <p>{props.name}</p>
      <p>{props.dept}</p>
      <p> {props.year}</p>
            </div>
        </div>
    </div>
  )
}

Student.PropTypes={
    rollNo:PropTypes.number.isRequired,
    name : PropTypes.string,
    dept: PropTypes.string,
    year: PropTypes.number 
}