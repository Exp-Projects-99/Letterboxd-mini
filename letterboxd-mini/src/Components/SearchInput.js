import React from 'react';

const SearchInput = ({ inputValue, setSearch}) => {
    return (
        <div className='col col-sm-4'>
            <input
                onChange={(event) => setSearch(event.target.value)}
                value={inputValue}
                type='text'
                className={'form-control input-box'}
                placeholder='Search...'
            ></input>
        </div>
    )
}

export default SearchInput;