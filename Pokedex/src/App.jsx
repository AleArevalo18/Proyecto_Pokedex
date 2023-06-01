import { useState } from 'react'

import './App.css'

// Importación del router
import  AppRouter  from './assets/router/appRouter'
import { PokemonProvider } from './assets/context/PokemonProvider'

function App() {

  return (
    <>

      <PokemonProvider>
        <AppRouter/>
      </PokemonProvider>
      
    </>
  )
}

export default App
