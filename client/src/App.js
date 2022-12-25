import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Inicio from './Components/Inicio';
import DetailCard from './Components/DetailCard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { meterFavoritos, cambiarModo, traerPersonajes } from './redux/actions';
import { ThemeProvider, createTheme } from '@mui/material';
import { purple, grey, cyan } from '@mui/material/colors'

function App() {
  const themeDark = createTheme({
    palette: {
      primary: {
        main: '#000',
        light: purple[800]
      },
      secondary: {
        main: grey[50]
      },
      warning: {
        main: purple[800]
      }
    }
  })
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
        light: cyan[300]
      },
      secondary: {
        main: grey[900]
      },
      warning: {
        main: cyan[300]
      }
    }
  })
  const modo = useSelector(state => state.modo)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(meterFavoritos(JSON.parse(localStorage.getItem("favoritos"))))
    dispatch(cambiarModo(localStorage.getItem("modo") === "true" ? true : false))
  }, [])
  return (
    <ThemeProvider theme={modo ? theme : themeDark}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/:id' element={<DetailCard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
