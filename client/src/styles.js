import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {

        justifyContent: "right",
        height: 50,
        background: "#2c62f1",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.12), 0px 4px 4px rgba(0, 0, 0, 0.24)"
    },

    login: {
        paddingRight: "100px",
        paddingTop: "10px",
    },

    astronautImg: {
        position: "absolute",
        width: "1000px",
        height: "600px",
    },

    addButton: {
        paddingLeft: 1380,
        paddingTop: 73,
        color: "#42b508",
    }

}));