import React from 'react'

const Filter = (props) => {
    console.log("")
    console.log("Filter.js BEGIN")
    return(
        <div>
            Search: <input 
                        onChange={props.onChange}
                        value={props.value}
                    />
        </div>
    )
}

export default Filter