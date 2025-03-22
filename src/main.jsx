import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
// import { createHashRouter, RouterProvider } from 'react-router-dom'

import Home from './components/Home.jsx'
import DeckPage from './components/DeckPage.jsx'
import PlayPage from './components/PlayPage.jsx'

// const router = createHashRouter([
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/deckpage',
    element: <DeckPage></DeckPage>
  },
  {
    path: '/deckpage/:folderId/:deckId',
    element: <DeckPage></DeckPage>
  },
  {
    path: '/playpage/:folderId/:deckId',
    element: <PlayPage></PlayPage>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
