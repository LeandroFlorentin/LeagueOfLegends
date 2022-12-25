import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { traerPersonaje, clearPersonaje } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, CardMedia, Typography, Box, Stack, Avatar } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import Cargando from '../Cargando/index.js'

const DetailCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const personaje = useSelector(state => state.personaje)
    const [numero, setNumero] = useState(0)
    const [nombre, setNombre] = useState("")
    const { id } = useParams()

    useEffect(() => {
        dispatch(traerPersonaje(id))
        return () => dispatch(clearPersonaje())
    }, [])

    const cambioAspecto = (skin) => {
        setNumero(skin.num)
        setNombre(skin.name)
    }

    const principio = () => {
        const destino = document.getElementById('arriba')
        destino.scrollIntoView({
            top: destino,
        })
    }

    return (
        <>
            {
                personaje?.name ?
                    <>
                        <div id='arriba' ref={principio} style={{
                            position: 'absolute',
                            top: '0',
                        }}></div>
                        <ArrowBack sx={{
                            position: 'absolute',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            top: '0'
                        }}
                            color='secondary'
                            onClick={() => navigate('/')}
                        />
                        <Box sx={{ backgroundColor: 'primary.main', height: 'auto' }}>
                            <Grid
                                container
                                sx={{
                                    height: 'auto',
                                }}
                                xs={12}
                                spacing={2.5}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <Stack
                                        direction='row'
                                        sx={{ justifyContent: 'center' }}
                                    >
                                        <Stack direction='column' sx={{
                                            marginTop: '30px'
                                        }}
                                        >
                                            <Box sx={{
                                                overflowY: 'auto',
                                                height: '500px',
                                                marginRight: '2px',
                                                '&::-webkit-scrollbar': {
                                                    width: '4px',
                                                    backgroundColor: 'transparent',
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                    webkitBoxShadow: 'transparent',
                                                    borderRadius: '10px',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    borderRadius: '10px',
                                                    webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
                                                    backgroundColor: 'primary.light',
                                                }
                                            }}>
                                                {
                                                    personaje.skins?.map((skin, ubi) => {
                                                        return (
                                                            <Avatar
                                                                key={ubi}
                                                                alt="Remy Sharp"
                                                                onClick={() => cambioAspecto(skin)}
                                                                sx={{ cursor: 'pointer', marginBottom: '10px', marginRight: '10px' }}
                                                                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${personaje.id}_${skin.num}.jpg`
                                                                } />
                                                        )
                                                    })
                                                }
                                            </Box>
                                        </Stack>
                                        <Stack>
                                            <Typography variant='h5' color='secondary' sx={{ display: 'flex', justifyContent: 'center' }}><strong>{
                                                !nombre.length ?
                                                    personaje.id
                                                    :
                                                    nombre === 'default'
                                                        ?
                                                        personaje.id
                                                        :
                                                        nombre
                                            }</strong></Typography>
                                            <CardMedia
                                                component='img'
                                                height="500px"
                                                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${personaje.id}_${numero}.jpg`}
                                                alt={personaje.id}
                                                sx={{
                                                    borderRadius: '10px',
                                                }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                    <Box sx={{
                                        backgroundColor: 'primary.light',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        marginTop: '30px'
                                    }}
                                    >
                                        <Container>
                                            <Typography
                                                variant='h3'
                                                color='secondary'
                                                sx={{
                                                    margin: '0 10px',
                                                    textAlign: 'center',
                                                    '&::first-letter': {
                                                        textTransform: 'uppercase'
                                                    }
                                                }}
                                            >{`${personaje.title}`}</Typography>
                                            <Typography
                                                color='secondary'
                                                variant='subtitle1'
                                                sx={{ margin: '20px', textAlign: 'center' }}
                                            >{personaje.lore}</Typography>
                                            <Stack direction='row' sx={{ justifyContent: 'center' }}>
                                                <Typography color='secondary' variant='h6' sx={{ marginRight: '10px' }}>Tags:</Typography>
                                                {
                                                    personaje.tags?.map((tag, ubi) => {
                                                        return (
                                                            <Typography color='secondary' sx={{ marginRight: '10px' }} variant='h6'>{tag}</Typography>
                                                        )
                                                    })
                                                }
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item lg={6}>
                                    <Box sx={{
                                        backgroundColor: 'primary.light',
                                        borderRadius: '10px',
                                        padding: '10px'
                                    }}
                                    >
                                        <Typography color='secondary' variant='h4' sx={{ textAlign: 'center' }}>Fortalezas</Typography>
                                        {
                                            personaje.allytips?.length ?
                                                personaje.allytips?.map((tip, ubi) => {
                                                    return (
                                                        <Box key={ubi} sx={{ margin: '20px 0' }}>
                                                            <Typography color='secondary' variant='p'>• {tip}</Typography>
                                                        </Box>
                                                    )
                                                })
                                                :
                                                <Box sx={{ margin: '20px 0' }}>
                                                    <Typography color='secondary' variant='p'>• Sin fortalezas.</Typography>
                                                </Box>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Box sx={{
                                        backgroundColor: 'primary.light',
                                        borderRadius: '10px',
                                        padding: '10px'
                                    }}
                                    >
                                        <Typography color='secondary' variant='h4' sx={{ textAlign: 'center' }}>Debilidades</Typography>
                                        {
                                            personaje.enemytips?.length ?
                                                personaje.enemytips?.map((tip, ubi) => {
                                                    return (
                                                        <Box key={ubi} sx={{ margin: '20px 0' }}>
                                                            <Typography color='secondary' variant='p'>• {tip}</Typography>
                                                        </Box>
                                                    )
                                                })
                                                :
                                                <Box sx={{ margin: '20px 0' }}>
                                                    <Typography color='secondary' variant='p'>• Sin debilidades.</Typography>
                                                </Box>
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                    :
                    <Cargando />
            }
        </>
    )
}

export default DetailCard;
