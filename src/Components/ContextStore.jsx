import React, { useState } from "react"
import { useEffect } from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'
import RecipeList from "./RecipeList";
import FavoriteRecipe from "./FavoriteRecipe";
import dotenv from "dotenv"
dotenv.config()

const ContextStore = React.createContext()

function ContextStoreProvider(props) {

    const navigate = useNavigate()

    //states

    const [formData, setFormData] = React.useState({
        search: "",
    })

    const [recipes, setRecipes] = React.useState([])

    const [cook, setCook] = React.useState({
        title: "",
        ingredients: "",
        instructions: "",
        servings: "",
        id: "",
        isFavorite: false
    })

    const [favorites, setFavorites] = React.useState([])

    //SEARCH COMPONENT
    //form which makes an API call

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const search = formData.search
    const apiKey = process.env.API_KEY

    function handleSubmit(event) {
        event.preventDefault()

        axios.get('https://api.api-ninjas.com/v1/recipe?query=' + search, {
            headers: { "X-Api-Key": apiKey },
            contentType: "application/json"
        })
            .then(response => setRecipes(response.data.map(x => {
                return {
                    title: x.title,
                    ingredients: x.ingredients,
                    instructions: x.instructions,
                    servings: x.servings,
                    id: uuidv4(),
                    isFavorite: false
                }
            }))
            )
            .catch(err => console.log(err))
    }



    // map through array of recipes and generate recipe list

    const recipeList = recipes.map(x => {
        return <RecipeList
            title={x.title}
            servings={x.servings}
            ingredients={x.ingredients}
            instructions={x.instructions}
            id={x.id}
            key={recipes.indexOf(x)}
            selectRecipe={selectRecipe}
            isFavorite={x.isFavorite}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
        />
    })

    // select a recipe from search and put it in Cook state

    function selectRecipe(event, id) {

        const selectedRecipe = recipes.find(recipe => recipe.id === id)
        console.log(selectedRecipe)

        setCook({
            title: selectedRecipe.title,
            ingredients: selectedRecipe.ingredients,
            instructions: selectedRecipe.instructions,
            servings: selectedRecipe.servings,
            id: selectedRecipe.id,
            isFavorite: selectedRecipe.isFavorite
        })
        navigate("/cook")
    }

    //select recipe from favorites and put it in cook state

    function cookFavorite(event, id) {

        const selectedRecipe = favorites.find(recipe => recipe.id === id)
        console.log(selectedRecipe)

        setCook({
            title: selectedRecipe.title,
            ingredients: selectedRecipe.ingredients,
            instructions: selectedRecipe.instructions,
            servings: selectedRecipe.servings,
            id: selectedRecipe.id,
            isFavorite: selectedRecipe.isFavorite
        })
        navigate("/cook")
    }

    //display favorite recipes

    const favoriteRecipeList = favorites.map(x => {
        return <FavoriteRecipe
            title={x.title}
            servings={x.servings}
            ingredients={x.ingredients}
            instructions={x.instructions}
            id={x.id}
            key={favorites.indexOf(x)}
            cookFavorite={cookFavorite}
            removeFromFavoritesPage = {removeFromFavoritesPage}
            isFavorite={x.isFavorite}
        />
    })

    //toggle favorites

// toggle favorites from cook page

    function addFavorite(cook) {
        setCook(prevCook => ({
            ...prevCook,
            isFavorite: true
        }));


    }
    console.log(cook);
    console.log(favorites);

    
    function removeFavorite(id) {
        setCook(prevCook => {
            return {
                ...prevCook,
                isFavorite: false
            }
        })
    }

    // add/remove favorites from cook page

    React.useEffect(() => {
        if (cook.isFavorite) {
            if (
                favorites.every(x => x.id !== cook.id)
            ) {
                setFavorites(prevFavorites => [...prevFavorites, cook]);
            }

        } else {
            setFavorites(prevFavorites => {
                const newFavList = prevFavorites.filter(arr => arr.id !== cook.id)
                return newFavList
            })
        }
    }, [cook])

    // remove favorites from FAVORITES page

    function removeFromFavoritesPage(id){
        setFavorites(prevFavorites => {
            const newFavList = prevFavorites.filter(arr => arr.id !== id)
            return newFavList
        })
    }

    return (
        <ContextStore.Provider
            value={{
                handleChange,
                handleSubmit,
                search,
                recipes,
                selectRecipe,
                recipeList,
                cook,
                addFavorite,
                removeFavorite,
                favoriteRecipeList,
                FavoriteRecipe,
                cookFavorite,
                removeFromFavoritesPage
            }}
        >
            {props.children}
        </ContextStore.Provider>
    )
}

export { ContextStore, ContextStoreProvider }
