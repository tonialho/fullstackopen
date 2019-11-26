import React from 'react'

const Header = ({course}) => 
    <h1>{course}</h1>

const Content = ({parts}) => {
    console.log('Content {parts}:', parts)
    return (
        parts.map((part, i) => 
        <p key={i}>
            {part.name} {part.exercises} 
        </p>
        )
    )
}

const Total = ({parts}) => {
    console.log('Total {parts}:', parts)
    const exercises = parts.map(part => part.exercises)
    console.log('exercises:', exercises)

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    console.log('reducer', reducer)
    const total = exercises.reduce(reducer)
    console.log('total', total)

    return (
        <b>Yhteensä {total} tehtävää</b>
    )
}

const Course = ({courses}) => {
    console.log('Course.js BEGIN')
    console.log('Course.js courses: ', courses)
    return (
        courses.map((course, i) =>
        <div key={i}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
        )
    )
}

export default Course