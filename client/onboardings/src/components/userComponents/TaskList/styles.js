import { makeStyles } from '@mui/material/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection : "column",
    padding: '10px'
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));