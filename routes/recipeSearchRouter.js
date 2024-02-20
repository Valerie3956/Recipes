const express = require("express")
const axios = require('axios')
const recipeSearchRouter = express.Router()
require('dotenv').config()
const apiKey = process.env.API_KEY


//test get
recipeSearchRouter.get("/:searchTerm", async(req, res, next) => {
    try{
        const searchTerm = req.params.searchTerm
        const recipe = await axios.get('https://api.api-ninjas.com/v1/recipe?query=' + searchTerm, {
                    headers: { "X-Api-Key": apiKey },
                    contentType: "application/json"
                })
        res.status(201).send(recipe.data)
    }catch(err){
        res.status(500)
        return next(err)
    }
})





module.exports = recipeSearchRouter