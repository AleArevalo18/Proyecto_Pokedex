import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navigation } from '../components/navigation/Navigation'
import { PokemonPage } from '../components/PokemonPage/pokemonPage'
import { HomePage } from '../components/pages/HomePage'
import {SearchPage} from '../components/SearchPage/searchPage'

function AppRouter() {
  return (

    <>
    
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<HomePage/>}/>
          <Route path='pokemon/:id' element= {<PokemonPage/>}/>
          <Route path='search' element={<SearchPage/>}/>
        </Route>
          <Route path='*' element={<Navigate to ='/' />}/>
      </Routes>

    </>
    
  )
}
export default AppRouter