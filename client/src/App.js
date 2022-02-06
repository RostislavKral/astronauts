import React, {useEffect, useState} from "react";
import {Container} from "@mui/material";
import useStyles from "./styles";
import {
    AppBar,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper, Slide, TextField,
    Typography
} from "@material-ui/core";
import {DataGrid} from "@mui/x-data-grid"
import astronaut from "./images/astronaut.svg"
import axios from "axios";
import moment from "moment";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const App = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false)
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

    const openDialog = () => {
        setOpen(true);
    }


    const closeDialog = () => {
        setOpen(false);
    }

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
        <Button onClick={openDialog}>
            <AddCircleIcon className={classes.addButton} fontSize={"large"} sx={{fontSize: 55}}/>
        </Button>

            <Dialog
                open={open}
                onClose={closeDialog}
                transition={Slide}
            >
                <DialogTitle id="form-dialog-title">Make a new record for astronaut</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new record for your astronaut!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="age"
                        label="Age"
                        type="number"

                    />
                    <TextField
                        margin="dense"
                        id="superpower"
                        label="Superpower"
                        type="text"
                        fullWidth
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closeDialog} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default App;