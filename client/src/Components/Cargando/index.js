import React from 'react'
import { useSelector } from 'react-redux';
import { Stack, LinearProgress, Box } from '@mui/material';
import Lol from '../../lol.png'

const Cargando = () => {
    const modo = useSelector(state => state.modo)
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: `${modo ? '#fff' : '#000'}` }}>
            <Stack>
                <img src={Lol} style={{ width: '300px', marginBottom: '40px' }} />
                <Box sx={{ width: '300px', height: 'auto' }}>
                    <LinearProgress color='warning' />
                </Box>
            </Stack>
        </div>
    )
}

export default Cargando;
