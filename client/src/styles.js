import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    padding: '10px 0',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  heading: {
    color: '#000',
    padding: '0 3px'
  },
  image: {
   paddingLeft: '10px',
  },
}));