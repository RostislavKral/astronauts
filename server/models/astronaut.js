import mongoose from "mongoose";

const astronautSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    superpower: String,
    birthDate: Date,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Astronaut = mongoose.model('Astronauts', astronautSchema);

export default Astronaut;