import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    traerPersonajes,
    traerGeneros,
    filtrar,
    meterFavoritos
} from '../../redux/actions';
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Checkbox,
    FormControlLabel
} from '@mui/material'
import {
    FavoriteBorder,
    Favorite
} from '@mui/icons-material'
import Teemo from '../../teemo.png'
import Notify from 'notiflix'

const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const personajes = useSelector(state => state.personajes)
    const buscar = useSelector(state => state.busco)
    const generos = useSelector(state => state.generos)
    const filtros = useSelector(state => state.filtros)
    const pagina = useSelector(state => state.pagina)
    const favoritos = useSelector(state => state.favoritos)
    const modo = useSelector(state => state.modo)

    Notify.Notify.init({
        success: {
            background: `${!modo ? '#4dd0e1' : '#6a1b9a'}`,
        },
    });

    useEffect(() => {
        dispatch(traerPersonajes(pagina, buscar, filtros.Tank, filtros.Mage, filtros.Assassin, filtros.Fighter, filtros.Marksman, filtros.Support))
        dispatch(traerGeneros())
    }, [filtros])

    const filtramosGen = (e) => {
        let filtro = e.target.value
        for (const genero in filtros) {
            if (filtros[genero] === filtro) filtro = undefined
        }
        dispatch(filtrar(filtro, e.target.value))
    }

    const subirFavorito = (personaje) => {
        let arrayStore = JSON.parse(localStorage.getItem("favoritos"))
        if (arrayStore === null) {
            arrayStore = []
            localStorage.setItem("favoritos", JSON.stringify([...arrayStore, personaje]))
            dispatch(meterFavoritos(JSON.parse(localStorage.getItem("favoritos"))))
        }
        else {
            let sinRepetir = arrayStore.find(ele => ele.name === personaje.name) ? arrayStore.filter(ele => ele.name !== personaje.name) : [...arrayStore, personaje]
            localStorage.setItem("favoritos", JSON.stringify(sinRepetir))
            if (arrayStore.find(ele => ele.name === personaje.name)) Notify.Notify.success(`${personaje.name} eliminado con exito`, {
                backgroundColor: '#ff0'
            })
            if (!arrayStore.find(ele => ele.name === personaje.name)) Notify.Notify.success(`${personaje.name} Agregado con exito`, {
                backgroundColor: '#ff0'
            })
            dispatch(meterFavoritos(JSON.parse(localStorage.getItem("favoritos"))))
        }
    }

    return (
        <>
            <Box sx={{ backgroundColor: 'primary.main' }}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box>
                        {
                            generos?.map((gen, ubi) => {
                                return (
                                    <FormControlLabel
                                        key={ubi}
                                        sx={{
                                            color: 'secondary.main'
                                        }}
                                        control={
                                            <Checkbox
                                                sx={{
                                                    color: 'secondary.main',
                                                    '&.Mui-checked': {
                                                        color: 'secondary.main',
                                                    },
                                                }}
                                                color='primary'
                                                value={gen}
                                                checked={filtros[gen]}
                                                onChange={filtramosGen}
                                            />
                                        }
                                        label={gen}
                                    />
                                )
                            })
                        }
                    </Box>
                </Container>
                <Box>
                    <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', minHeight: "100vh" }}>
                        {
                            personajes.results?.length ?
                                personajes.results?.map((perso, ubi) => {
                                    return (
                                        <Card
                                            key={ubi}
                                            sx={{ maxWidth: 345, margin: '20px 0', backgroundColor: 'primary.light' }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={perso.imagen}
                                                alt={perso.id}
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => navigate(`/${perso.id}`)}
                                            />
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                        color='secondary'
                                                    >
                                                        {perso.name}
                                                    </Typography>
                                                    {
                                                        favoritos?.find(ele => ele.id === perso.id) ?
                                                            <Favorite
                                                                color='secondary'
                                                                sx={{ cursor: 'pointer' }}
                                                                onClick={() => subirFavorito(perso)}
                                                            />
                                                            :
                                                            <FavoriteBorder
                                                                color='secondary'
                                                                sx={{ cursor: 'pointer' }}
                                                                onClick={() => subirFavorito(perso)}
                                                            />
                                                    }
                                                </Box>
                                                <Typography variant="body2" color='secondary'>
                                                    {perso.blurb}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    variant='outlined'
                                                    size="small"
                                                    color='secondary'
                                                    onClick={() => navigate(`/${perso.id}`)}
                                                >Ver mas</Button>
                                            </CardActions>
                                        </Card>
                                    )
                                })
                                :
                                <Box sx={{ width: '100vw', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography color='secondary' variant='h2'>Sin resultados</Typography>
                                    <img src={Teemo} style={{ width: '320px' }} />
                                </Box>
                        }
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default Cards;
