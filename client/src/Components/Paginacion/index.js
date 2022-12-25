import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Pagination } from '@mui/material';
import { traerPersonajes, traerGeneros } from '../../redux/actions';

const Paginacion = () => {
    const dispatch = useDispatch()
    const personajes = useSelector(state => state.personajes)
    const buscamos = useSelector(state => state.busco)
    const filtros = useSelector(state => state.filtros)
    const pagina = useSelector(state => state.pagina)
    const { Fighter, Tank, Mage, Assassin, Marksman, Support } = filtros
    useEffect(() => {
        dispatch(traerGeneros())
    }, [])
    const cambioPagina = (event, value) => {
        dispatch(traerPersonajes(value, buscamos, Tank, Mage, Assassin, Fighter, Marksman, Support))
    };
    return (
        <Stack spacing={2} sx={{ alignItems: 'center', backgroundColor: 'primary.light' }}>
            <Pagination
                color='secondary'
                count={personajes.paginas}
                variant="outlined"
                shape="rounded"
                onChange={cambioPagina}
                defaultPage={pagina}
            />
        </Stack>
    )
}

export default Paginacion;
