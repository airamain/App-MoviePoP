import React from 'react'
import './style.css'
import { withRouter, Link } from 'react-router-dom'
import imgDefault from '../../images/img-default.jpeg'
import Error404 from '../Error404'

const MovieResult = (props) => {

    if (props !== '') {
        return (
            <div  className="col-lg-4 col-md-4 col-sm-6 col-xs-6 mb-3 mx-auto text-center my-5">
                <h3 className="text-center text-white">{props.name}</h3>
                {props.image !== null ? <Link to={`/movies/${props.id}`}> <img src={props.image.medium} alt="img" /></Link> : <img src={imgDefault} alt="img" />
                }
            </div >
        )
    } else {
        return (<div className="m-5"><Error404 /></div>)
    }

}
export default withRouter(MovieResult);