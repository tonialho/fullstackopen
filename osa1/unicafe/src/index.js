import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Statistic = ({text, value}) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    )
}


const Statistics = ({g, n, b, a}) => {
    if (a === 0) {
        return (
            <>
                <p>Anna palautetta</p>
            </>
        )
    }

    return (
        <table>
            <Statistic text="good" value={g} />
            <Statistic text="neutral" value={n} />
            <Statistic text="bad" value={b} />
            <Statistic text="all" value={a} />
            <Statistic text="avg" value={(g*1 + n*0 + b*-1) / a} />
            <Statistic text="positive" value={(g / a * 100) + " %"} />
        </table>
    )
}

const Button = ({value, text}) => (
    <button onClick={value}>
        {text}
    </button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleGood = () => {
        handleAll(all + 1)
        setGood(good + 1)
    }

    const handleNeutral = () => {
        handleAll(all + 1)
        setNeutral(neutral + 1)
    }

    const handleBad = () => {
        handleAll(all + 1)
        setBad(bad + 1)
    }

    const handleAll = () => setAll(all + 1)
  
    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button value={handleGood} text="good" />
                <Button value={handleNeutral} text="neutral" />
                <Button value={handleBad} text="bad" />
            </div>
            <div>
                <h1>statistics</h1>
                <Statistics g={good} n={neutral} b={bad} a={all} />
            </div>
        </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )