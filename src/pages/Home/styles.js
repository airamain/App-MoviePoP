import { makeStyles } from '@material-ui/styles';

const centeredStyleObj = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default makeStyles({
    container: {
        flexDirection: 'column',
        ...centeredStyleObj
    },
    cardContainer: {
        flexDirection: 'column',
        ...centeredStyleObj,
        width: 600,
        padding:50
    },
    title: {
        fontSize: '4rem'
    }
    // movieIcon:{
    //     fontSize:'4rem'
    // }

})