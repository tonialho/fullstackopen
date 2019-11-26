import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SeletedAnecdote = ({anecdote}) => {
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdote}</p>
        </div>
    )
}

// ONGELMA: Tämä ei uudelleenrenderöi painettaessa "vote", vain painettassa "next"
const MostVoted = ({anecdotes, votes}) => {
    const indexOfMostVoted = votes.indexOf(Math.max(...votes))
    console.log("votes", votes)
    return (
        <>
            <h1>Anecdote with most votes</h1>
            {anecdotes[indexOfMostVoted]}
            <p>Votes on this anecdote: {votes[indexOfMostVoted]}</p>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0), null)

    const selectNext = (max) => {
        const next = Math.floor(Math.random()*max)
        setSelected(next)
    }

    const vote = (selected) => {
        const newVotes = votes
        newVotes[selected] = newVotes[selected] + 1
        setVotes(newVotes)
        console.log("Anecdote n:o", selected, "has", newVotes[selected], "votes now")
    }

    return (
        <div>
            <SeletedAnecdote anecdote={anecdotes[selected]} />
            <button onClick={ () => vote(selected)}>vote</button>
            <button onClick={ () => selectNext(anecdotes.length)}>next</button>
            <MostVoted anecdotes={props.anecdotes} votes={votes} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)