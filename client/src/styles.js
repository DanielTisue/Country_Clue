import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  appBar: {
    // borderRadius: 15,
    // margin: '30px 0',
    padding: '10px 0',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    background: 'linear-gradient(45deg, #C916CC 20%, #16b7cc 90%)',
  },
  heading: {
    color: '#fff',
    padding: '0 3px'
  },
  image: {
   paddingLeft: '10px',
  },
}));