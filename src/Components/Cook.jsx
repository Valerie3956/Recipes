import React, {useContext} from "react"
import {ContextStore} from "./ContextStore"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons"

export default function Cook(props){

// const solidHeart = <FontAwesomeIcon icon="fa-solid fa-heart" />
// const emptyHeart = <FontAwesomeIcon icon="fa-regular fa-heart" />

    const {cook, addFavorite, removeFavorite} = useContext(ContextStore)

    const ingredients = cook.ingredients.split("|")
    const listItems = ingredients.map(ingredient => (<li key = {ingredient}>{ingredient}</li>))

const instructions = cook.instructions.split(". ")
const instructionsList = instructions.map(step  => (<li key = {step}>{step}</li>))

    return(
        <div className = "cook">
        {cook.title !== "" &&
        <div >
           {cook.isFavorite === false && <h2 onClick = {() => addFavorite(cook)}><FontAwesomeIcon icon= {emptyHeart} /></h2>}
           {cook.isFavorite && <h2 onClick = {() => removeFavorite(cook.id)}><FontAwesomeIcon icon= {solidHeart} /></h2>}
        <h2>Title: {cook.title}</h2>
        <h4>Servings: {cook.servings}</h4>
        <h3>Ingredients List: <ul>{listItems}</ul></h3>
        <h3>Instructions: <ol>{instructionsList}</ol></h3>
        </div>}
            </div>

    )
}