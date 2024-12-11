import search from './Search.module.css'
import loupe from './../../../../images/loupe.png'
import { useState } from 'react'

const Search = ( {formData = [], onSearch } ) => {

const [value, setValue] = useState('')

const handleSubmit = (e) => {
    e.preventDefault()
}

const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    const filteredWords = formData.filter(word => word.word.toLowerCase().includes(newValue.toLowerCase()))
    onSearch(filteredWords)
}

    return(
        <div className={search.search}>
            <form className={search.search__form} onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Search the word' 
                    className={search.search__form_input}
                    value={value}
                    onChange={handleChange}>
                </input>
                <img src={loupe} alt='Loupe' className={search.search__form_img}></img>
            </form>
        </div>
    )
}

export default Search;