import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from "./Game.tsx"
import {Helmet} from "react-helmet";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
    <Helmet>
      <title>Crossing Chicken</title>
    </Helmet>
    <Game />
    </>
  </StrictMode>,
)
