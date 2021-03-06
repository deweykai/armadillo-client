import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `100%`,
        marginLeft: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    homeLink: {
        '&$selected': {
            backgroundColor: 'blue',
        },
    },
    graphPaper: {
        padding: theme.spacing(2),
    },
    offset: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default useStyles;
