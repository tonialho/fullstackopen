import React from 'react'

const Search = (props) => {
    return(
        <div>
            <form>
                <input 
                    onChange={props.onChange}
                    value={props.value}
                />
            </form>
        </div>
    )
}

export default Search