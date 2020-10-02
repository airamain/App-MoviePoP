import React, { useEffect } from 'react';
import { Container, CircularProgress, Typography, Box } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import { searchMovieById } from '../../redux/actions/search'
import { movieResult as movieResultSelector } from '../../redux/selectors'


export default ({ match }) => {
    const dispatch = useDispatch();
    const movieResult = useSelector(state => movieResultSelector(state))
    const movieId = match.params.id;

    useEffect(() => {


        if (!movieResult || movieResult && movieResult.imdbID !== movieId) {

            dispatch(searchMovieById({ movieId }))
        }

    }, [movieId])
    console.log("movie result", movieResult)

    if (!movieResult) {
        return <CircularProgress size={50} color="primary" />
    }

    const quitarHTML = (cadena) => {
        let newCadena = cadena.replace(/<[^>]*>?/g, " ");

        return newCadena;
    }

    const crearCadena = (array) => {
        let cadena = "";
        array.map((element) => {
            cadena = cadena + " " + element + " ";
        })
        return cadena;
    }

    return (
        <Container>
            < Header />
            <Container className="text-center mt-5">
                <Typography className="text-white my-3" variant="h3">{movieResult.name}</Typography>
                <img src={movieResult.image.medium} />
                <Typography> <Rating className="pr-0" name="half-rating-read" value={(movieResult.rating.average) / 2} readOnly /></Typography>
                <Typography variant="h3" className="text-white">Título</Typography>
                <div className="text-justify">
                    <Typography className="text-white my-3">Idioma: {movieResult.language}</Typography>
                    {movieResult.genres ? <Typography className="text-white my-3">Generos: {crearCadena(movieResult.genres)}</Typography> : null}
                    <Typography className="text-white my-3">Fecha de Estreno: {movieResult.premiered}</Typography>
                </div>

                <Typography variant="h3" className="text-white">Sipnosis: </Typography>
                <p className="text-white my-3">{quitarHTML(movieResult.summary)}</p>
            </Container>
        </Container>
    )
}