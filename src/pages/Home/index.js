import React from 'react'
import Header from '../Header/Header'
import { Container } from 'react-bootstrap'
import styles from './styles'
import img1 from '../../images/logo-moviepop.png'



export default () => {

	const classes = styles();

	return (
		<Container>
			<Header  />
			<div className={classes.container}>
				<img className={classes.cardContainer} src={img1} alt="img1" />
			</div>
		</Container>
	)
}
