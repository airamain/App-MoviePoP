import React, { useEffect, useState } from 'react'
import { Container, Spinner, Col, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Header/Header'
import { searchMovie } from '../../redux/actions/search'
import { movieResults, isSearchLoading } from '../../redux/selectors'
import MovieResult from '../../components/MovieResult'
import './styles.css'
import Error404 from '../../components/Error404'


export default () => {
    const dispatch = useDispatch()
    const movies = useSelector(state => movieResults(state))
    const isLoading = useSelector(state => isSearchLoading(state))
    const [isLooked, setIsLooked] = useState(false)
    const [search, setSearch] = useState({ title: '' })

    useEffect(() => {

        if (movies === undefined && !isLooked) {
            setIsLooked(true);
            dispatch(searchMovie({ movieName: "star wars" }))
        }
    })

    const renderMovies = () => {

        if (movies) {
            if (movies.length > 0) {
                return movies.map((value, index) => <MovieResult key={index}{...value.show} />)
            }
            else if (movies.length === 0) {
                return <Error404 className="m-5"/>
            }
        }
        else if (isLoading) {
            return (<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>)
        }
    }
    console.log("movies", movies)
    useEffect(() => {
        if (search.title !== '') {
            setIsLooked(true);
            dispatch(searchMovie({ movieName: search.title }))
        }

    }, [search.title])

    const searchNewMovie = event => {
        setSearch({
            ...search,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <Container>
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
            <Row>
                <div className="row mb-0 mx-auto">
                    {renderMovies()}
                </div>
            </Row>
        </Container>
    )

}