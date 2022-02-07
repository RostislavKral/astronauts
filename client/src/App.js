import React, {useEffect, useState} from "react";
import {Alert, Button, Container} from "@mui/material";
import useStyles from "./styles";
import {AppBar, Paper, Typography} from "@material-ui/core";
import {DataGrid} from "@mui/x-data-grid"
import astronaut from "./images/astronaut.svg"
import axios from "axios";
import moment from "moment";
import CreateAstronautForm from "./components/Forms/CreateAstronautForm";
import url from "./url"

const App = () => {
    const classes = useStyles();

    const [astronauts, setAstronauts] = useState([])
    const getAstronauts = async () => {
        const astronauts = await fetchAstronauts()
        setAstronauts(astronauts)

    }

    useEffect(() => {
        getAstronauts()
    }, [])

    const fetchAstronauts = async () => {
        try {
            const {data} = await axios.get(url);

            return data;
        } catch (e) {
            console.log(e)
        }
    }


    const deleteAstronaut = async (id) => {
        try {
            await axios.delete(`${url}/delete/${id}`)

            setAstronauts(astronauts.filter((astronaut) => {
                return astronaut.id === id ? '' : astronaut
            }))

            setAlert({type: 'error', msg: 'Astronaut was successfully deleted', isVisible: 'visible'});

            setTimeout(() => {
                setAlert({type: '', msg: '', isVisible: 'hidden'});
            }, 5000)

        } catch (e) {
            console.log(e)
        }
    }

    const showSuccessAlert = () => {
        setAlert({type: 'success', msg: 'Astronaut was successfully created', isVisible: 'visible'});

        setTimeout(() => {
            setAlert({type: '', msg: '', isVisible: 'hidden'});
        }, 5000)
    }

    const columns = [
        {
            field: '_id', headerName: 'ID', width: 240
        },

        {
            field: 'firstName',
            headerName: 'First name',
            width: 130
        },

        {
            field: 'lastName', headerName: 'Last name', width: 130
        },

        {
            field: 'birthDate',
            headerName: 'Age',
            type: 'number',
            width: 90,
            valueGetter: (params) => `${moment().diff(params.row.birthDate, 'years')}`
        },

        {
            field: 'fullName',
            headerName: 'Full name',
            sortable: false,
            width: 160,
            valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },

        {
            field: 'superpower',
            headerName: 'Superpower',
            width: 130,
        },

        {
            headerName: 'Actions',
            field: 'actions',
            width: 100,
            renderCell: ((params) => {
                return (<Button variant={"contained"} color={"error"} size={"small"} onClick={() => {
                    deleteAstronaut(params.id)
                }}>Delete</Button>)
            }), disableClickEventBubbling: true,
        }];


    const rows = astronauts.map((astronaut) => {
        astronaut.id = astronaut._id;
        return astronaut;
    });


    const [alert, setAlert] = useState({type: '', isVisible: false, msg: ''})

    return (<Container maxWidth={"lg"}>
        <AppBar className={classes.appBar}>
            <Typography className={classes.login} align={"right"}> LOGIN </Typography>
        </AppBar>


        <Alert severity={alert.type} style={{marginTop: 80, visibility: alert.isVisible}}>{alert.msg}</Alert>

        <div style={{paddingLeft: 100}}>
            <img src={astronaut} alt={"Astronaut"} className={classes.astronautImg}/>
        </div>
        <div style={{height: 375, width: '100%', marginTop: 300}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={Paper}
                sx={{backgroundColor: "white"}}
            />
        </div>

        <CreateAstronautForm callback={getAstronauts} showSuccessAlert={showSuccessAlert}/>

    </Container>);
}

export default App;