import React from 'react'
import Course from './components/Course'

const App = () => {
    console.log('App.js BEGIN')
    const courses = [
        {
            name: 'Half Stack -sovelluskehitys',
            parts: [
                {
                    name: 'Reactin perusteet ',
                    exercises: 10
                },
                {
                    name: 'Tiedonvälitys propseilla ',
                    exercises: 7
                },
                {
                    name: 'Komponenttien tila ',
                    exercises: 14
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

  return (
      <div>
          <Course courses={courses} />
      </div>
  )
}

export default App