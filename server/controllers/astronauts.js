import mongoose from "mongoose";
import Astronaut from "../models/astronaut.js";

export const index = async (req, res) => {
    try {

        const astronauts = await Astronaut.find();

        res.send(astronauts);
    } catch (e) {
        console.log(e);
    }
}

export const create = async (req, res) => {

    const {firstName, lastName, birthDate, superpower} = req.body

    const astronaut = new Astronaut({firstName, lastName, birthDate, superpower})
    try {
        await astronaut.save();

        res.status(200).json(astronaut)
    } catch (e) {
        console.log(e)

        res.status(403).json(e)
    }
}

export const remove = async (req, res) => {

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`Astronaut ${id} not found`);

    try {

        await Astronaut.findByIdAndRemove(id);

        res.status(200).json(`Astronaut ${id} was deleted successfully`);

    } catch (e) {
        console.log(e)

        res.status(403).json(e)
    }

}