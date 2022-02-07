import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    TextField
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useStyles from "./styles";
import axios from "axios";

const CreateAstronautForm = ({callback, showSuccessAlert}) => {

    const classes = useStyles();


    const [open, setOpen] = useState(false)
    const [astronaut, setAstronaut] = useState({firstName: '', lastName: '', age: '', superpower: '', birthDate: ''})

    const submit = async (e) => {
        e.preventDefault()

        try {
            await axios.post('http://localhost:5000/', astronaut);

            callback()
        } catch (e) {
            console.log(e)
        }

        setAstronaut({firstName: '', lastName: '', age: '', superpower: '', birthDate: ''})

        closeDialog()
        showSuccessAlert()

    }

    const openDialog = () => {
        setOpen(true);
    }

    const closeDialog = () => {
        setOpen(false);
    }


    return (

        <div>
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
                    <form id={"createForm"} onSubmit={submit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First name"
                            type="text"
                            value={astronaut.firstName}
                            onChange={(e) => setAstronaut({...astronaut, firstName: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="lastName"
                            label="Last name"
                            type="text"
                            value={astronaut.lastName}
                            onChange={(e) => setAstronaut({...astronaut, lastName: e.target.value})}

                            fullWidth
                        />
                        <TextField
                            margin={"dense"}
                            id="birthDate"
                            type="date"
                            value={astronaut.birthDate}
                            onChange={(e) => setAstronaut({...astronaut, birthDate: e.target.value})}

                        />
                        <TextField
                            margin="dense"
                            id="superpower"
                            label="Superpower"
                            type="text"
                            fullWidth
                            value={astronaut.superpower}
                            onChange={(e) => setAstronaut({...astronaut, superpower: e.target.value})}

                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button type={"submit"} form={"createForm"} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
}

export default CreateAstronautForm;