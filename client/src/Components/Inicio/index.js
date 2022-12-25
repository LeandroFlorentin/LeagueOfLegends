import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { traerPersonajes } from '../../redux/actions/index.js'
import Cards from '../Cards/index.js'
import Pagination from '../Paginacion/index.js'
import NavBar from '../NavBar/index.js'
import { Grid } from '@mui/material'
import Cargando from '../Cargando/index.js';

const Inicio = () => {
    const dispatch = useDispatch()
    const personajes = useSelector(state => state.personajes)

    useEffect(() => {
        !personajes.results?.length && dispatch(traerPersonajes())
    }, [])
    return (
        <>{
            personajes.results?.length ?
                <>
                    <NavBar />
                    <Grid container sx={{ marginTop: '80px' }}>
                        <Grid item xs={12}>
                            <Cards />
                        </Grid>
                        <Grid item xs={12}>
                            <Pagination />
                        </Grid>
                    </Grid>
                </>
                :
                <Cargando />
        }
        </>
    )
}

export default Inicio;
