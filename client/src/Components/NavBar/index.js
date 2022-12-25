import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { traerGeneros, meterFavoritos, cambiarModo } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar'
import { AppBar, Toolbar, IconButton, Switch, Box, Typography, Button, Modal, Avatar, Stack, Badge } from '@mui/material'
import { AutoStories } from '@mui/icons-material'
import Notify from 'notiflix'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    backgroundColor: 'primary.light',
    boxShadow: 24,
    color: '#fff',
    height: 'auto',
    maxHeight: '250px',
    overflow: 'auto',
    p: 4,
};

const NavBar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const favoritos = useSelector(state => state.favoritos)
    const dispatch = useDispatch()
    const modo = useSelector(state => state.modo)

    const handleChange = () => {
        dispatch(cambiarModo(!modo))
        localStorage.setItem("modo", JSON.stringify(!modo))
    }
    const eliminarFavo = (favorito) => {
        let arraySto = JSON.parse(localStorage.getItem("favoritos"))
        let newArray = arraySto.filter(fav => fav.name !== favorito)
        localStorage.setItem("favoritos", JSON.stringify(newArray))
        Notify.Notify.success(`${favorito} eliminado con exito`)
        dispatch(meterFavoritos(JSON.parse(localStorage.getItem("favoritos"))))
    }

    useEffect(() => {
        dispatch(traerGeneros())
    }, [])

    return (
        <AppBar
            position="fixed"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px',
                backgroundColor: 'primary.light'
            }}
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <div>
                        <Badge badgeContent={favoritos?.length} color='error'>
                            <AutoStories color='secondary' onClick={handleOpen} />
                        </Badge>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                ...style,
                                "&::-webkit-scrollbar": {
                                    width: "5px"
                                },
                            }}>
                                {
                                    favoritos?.length ?
                                        <Box>
                                            {
                                                favoritos?.map((favo, ubi) => {
                                                    return (
                                                        <Stack key={ubi} direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                sx={{ cursor: 'pointer', marginBottom: '10px', marginRight: '10px' }}
                                                                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${favo.name}_0.jpg`}
                                                                onClick={() => navigate(`/${favo.id}`)}
                                                            />
                                                            <Typography
                                                                color='secondary'
                                                                onClick={() =>
                                                                    navigate(`/${favo.id}`)}
                                                                sx={{ cursor: 'pointer' }}
                                                            >{favo.name}</Typography>
                                                            <Button variant='outlined' color='secondary' onClick={() => eliminarFavo(favo.name)}>Eliminar</Button>
                                                        </Stack>
                                                    )
                                                })
                                            }
                                        </Box>
                                        :
                                        <Box>
                                            <Typography color='secondary'>Sin favoritos</Typography>
                                        </Box>
                                }
                            </Box>
                        </Modal>
                    </div>
                </IconButton>
            </Toolbar>
            <SearchBar />
            <Switch
                onClick={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </AppBar>
    )
}

export default NavBar;
