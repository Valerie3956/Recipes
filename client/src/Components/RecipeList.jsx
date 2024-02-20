import React, {useContext} from "react"
import { ContextStore } from "./ContextStore"


export default function RecipeList(props){

    return(
        <div className = "recipe">
            <div className = "recipe--details">
            <h2>{props.title}</h2>
            <h3>{props.servings}</h3>
            </div>
            <button onClick = {(event) => props.selectRecipe(event, props.id)}>Cook this recipe!</button>
        </div>
    )
}