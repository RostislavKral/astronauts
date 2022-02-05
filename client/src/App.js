import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import useStyles from "./styles";
import {AppBar, Paper, Typography} from "@material-ui/core";
import {DataGrid} from "@mui/x-data-grid"
import astronaut from "./images/astronaut.svg"
import axios from "axios";
import moment from "moment";

const App = () => {
    const classes = useStyles();

    const [astronauts, setAstronauts] = useState([])

    useEffect(() => {
        const getAstronauts = async () => {
            const astronauts = await fetchAstronauts()
            setAstronauts(astronauts)

        }

        getAstronauts()
    }, [])


    const fetchAstronauts = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/');

            return data;
        } catch (e) {
            console.log(e)
        }


    }




    const columns = [
        {field: '_id', headerName: 'ID', width: 240},
        {field: 'firstName', headerName: 'First name', width: 130},
        {field: 'lastName', headerName: 'Last name', width: 130},
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
            valueGetter: (params) => `${moment().diff(params.row.birthDate, 'years')}`
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'superPower',
            headerName: 'Superpower',
            width: 130,
        },
        {
            headerName: 'Actions',
            width: 100
        }
    ];


    const rows = astronauts.map((astronaut) => {
        astronaut.id = astronaut._id
        return astronaut;
    });

    return (
        <Container maxWidth={"lg"}>
            <AppBar className={classes.appBar}>
                <Typography className={classes.login} align={"right"}> LOGIN </Typography>
            </AppBar>
            <div style={{paddingTop: 100, paddingLeft:100}}>
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
        </Container>
    );
}

export default App;