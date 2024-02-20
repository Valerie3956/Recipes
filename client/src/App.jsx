import React, { useState } from 'react'
import Search from "./Components/Search"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Cook from "./Components/Cook"
import Favorites from "./Components/Favorites"
import { Routes, Route } from 'react-router-dom'
import { ContextStoreProvider } from './Components/ContextStore'

function App() {

  return (
<div className = "container">
<Header />
<ContextStoreProvider>
<Routes>
  
<Route path = "/" element = {<Search />}/>
<Route path = "cook" element = {<Cook />}/>
<Route path = "favorites" element = {<Favorites />}/>
  
</Routes>
</ContextStoreProvider>
<Footer />
</div>
  )
}

export default App
