import React, {useContext} from "react"
import {ContextStore} from "./ContextStore"
import RecipeList from "./RecipeList"

export default function Search(props){

    const {handleChange, handleSubmit, search, recipeList} = useContext(ContextStore)

    return(
        <div className = "search">
            <form onSubmit = {handleSubmit}>
                <input 
                id = "search"
                type = "text"
                value = {search}
                onChange = {handleChange}
                name = "search"
                placeholder = "What would you like to cook today?"
                ></input>
                <button>SEARCH</button>
            </form>
            <div className = "recipeList">
                {recipeList}
            </div>
        </div>
    )
}