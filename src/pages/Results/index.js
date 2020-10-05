import React, { useEffect, useState } from 'react'
import { Container, Spinner, Col, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import { searchMovie } from '../../redux/actions/search'
import { movieResults, isSearchLoading } from '../../redux/selectors'
import MovieResult from '../../components/MovieResult'
import './styles.css'
import Error404 from '../../components/Error404'
import InfiniteScroll from 'react-infinite-scroll-component';

export default () => {
    const dispatch = useDispatch()
    const movies = useSelector(state => movieResults(state))
    const isLoading = useSelector(state => isSearchLoading(state))

    const [isLooked, setIsLooked] = useState(false)
    const [search, setSearch] = useState({ title: '' })
    const [page, setPage] = useState(1);
    const [moviesToShow, setMoviesToShow] = useState([])

    //cargar star wars si el textbox está vacio
    const loadStarWars = () => {
        if (search.title === '') {
            setSearch({ title: 'star wars' })
        } else
            if (movies === undefined && !isLooked) {
                setSearch({ title: 'star wars' })
            }
        setIsLooked(true);
    }

    useEffect(() => {
        loadStarWars();
        dispatch(searchMovie({ movieName: search.title }))
    }, [search.title])

    useEffect(() => {
        if (movies) {
            if (movies.length > 0) {
                handleShow()
            }
        }
    }, [movies])

    //maneja los items a mostrar de 4 en 4
    const handleShow = () => {

        let newList = [];
        if (movies && movies.length > 0) {
            newList = movies.slice(0, page * 4)
            setMoviesToShow(newList)
            setPage(page + 1)
        }
    };

    //renderizado de peliculas encontradas
    const renderMovies = () => {
        if (moviesToShow) {
            if (moviesToShow.length > 0) {
                return moviesToShow.map((value, index) => <MovieResult key={index}{...value.show} />)
            }
        }
        else if (movies.length === 0) {
            return <Error404 className="m-5" />
        }

        if (isLoading) {
            return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>)
        }
    }

    const searchNewMovie = event => {
        setPage(1)
        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <Container >
            <Header />
            <Row className="mt-5">
                <Col>
                    <Form >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control name="title" type="text" placeholder="Buscar" onChange={searchNewMovie} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <h1 className="text-center text-white" >Peliculas</h1>
            <Col >

                <InfiniteScroll
                    className="col-12"
                    dataLength={moviesToShow.length}
                    next={handleShow}
                    hasMore={true}
                >
                    {renderMovies()}
                </InfiniteScroll>

            </Col>
        </Container >
    )

}