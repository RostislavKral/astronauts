import React from "react";
import {Container} from "@mui/material";
import useStyles from "./styles";
import {AppBar, Paper, Typography} from "@material-ui/core";
import {DataGrid} from "@mui/x-data-grid"
import astronaut from "./images/astronaut.svg"

const App = () => {
    const classes = useStyles();

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'firstName', headerName: 'First name', width: 130},
        {field: 'lastName', headerName: 'Last name', width: 130},
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
            valueGetter: (params) => `${params.row.birthDate}`
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
        }
    ];

    const rows = [
        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
        {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
        {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
    ];

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