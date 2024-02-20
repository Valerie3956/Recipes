import React, {useContext} from "react"
import {ContextStore} from "./ContextStore"

export default function Favorites(props){

    const {favoriteRecipeList} = useContext(ContextStore)
    console.log(favoriteRecipeList)
    return(
        <div className = "favorites">
        {favoriteRecipeList}
        </div>
    )
}