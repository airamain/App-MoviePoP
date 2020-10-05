import React, { useEffect } from 'react';
import { Container, CircularProgress, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchMovieById } from '../../redux/actions/search'
import { movieResult as movieResultSelector } from '../../redux/selectors'
import { Link } from 'react-router-dom'


export default ({ match }) => {
    const dispatch = useDispatch();
    const movieResult = useSelector(state => movieResultSelector(state))
    const movieId = match.params.id;

    useEffect(() => {
        if ((movieResult && movieResult.imdbID !== movieId) || !movieResult) {
            dispatch(searchMovieById({ movieId }))
        }

    }, [movieId])

    if (!movieResult) {
        return <CircularProgress size={50} color="primary" />
    }

    //Funcion para eliminar codigo html del texto
    const quitarHTML = (cadena) => {
        let newCadena = cadena.replace(/<[^>]*>?/g, " ");
        return newCadena;
    }

    //convierte el array en string
    const crearCadena = (array) => {
        let cadena = "";
        cadena = array.join(", ")//separador
        return cadena;
    }

    return (
        <Container className="mx-lg-5">
            <div className="header">
                <Link to="/results" className="iconFa m-5"><FontAwesomeIcon icon={faArrowLeft} size="2x" /></Link>
            </div>
            <Container className="text-center mt-3">
                <Typography className="text-white my-3" variant="h3">{movieResult.name}</Typography>
                <img src={movieResult.image.medium} alt="imagen resultante" />
                <Typography> <Rating className="pr-0" name="half-rating-read" value={(movieResult.rating.average) / 2} readOnly /></Typography>
                <Typography variant="h3" className="text-white">Título</Typography>
                <div className="text-justify">
                    <Typography className="text-white my-3">Idioma: {movieResult.language}</Typography>
                    {movieResult.genres && movieResult.genres.length > 0 ? <Typography className="text-white my-3">Generos: {crearCadena(movieResult.genres)}</Typography> : null}
                    <Typography className="text-white my-3">Fecha de Estreno: {movieResult.premiered}</Typography>
                </div>{movieResult.summary ? <div><Typography variant="h3" className="text-white">Sipnosis: </Typography>
                    <p className="text-white my-3">{quitarHTML(movieResult.summary)}</p> </div> : null}
            </Container>
        </Container>
    )
}