import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField } from '@mui/material';
import { buscador } from '../../redux/actions';

const SearchBar = () => {
    const dispatch = useDispatch()
    const buscamos = useSelector(state => state.busco)
    const filtros = useSelector(state => state.filtros)
    const modo = useSelector(state => state.modo)
    const { Fighter, Tank, Mage, Assassin, Marksman, Support } = filtros
    const busqueda = (e) => {
        dispatch(buscador(e.target.value, Fighter, Tank, Mage, Assassin, Marksman, Support))
    }
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <TextField
                fullWidth
                label="Buscar"
                id="fullWidth"
                value={buscamos}
                onChange={busqueda}
                color='secondary'
                focused
                sx={{
                    backgroundColor: 'primary.light',
                }}
                InputProps={{ inputProps: { style: { color: `${modo ? "#000" : "#fff"}` } } }}
            />
        </Box>
    )
}

export default SearchBar; 
