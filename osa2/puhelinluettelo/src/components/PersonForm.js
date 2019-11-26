import React from 'react'

const PersonForm = (props) => {
    console.log("")
    console.log("PersonForm.js BEGIN")
    console.log("PersonForm props: ", props)
    return (
        <form onSubmit={props.onSubmit}>
            <div>
            Name: <input
                    value={props.nameValue} 
                    onChange={props.nameOnChange}
                    />
            </div>
            <div>
            Number: <input
                        value={props.numberValue}
                        onChange={props.numberOnChange}
                    />
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm