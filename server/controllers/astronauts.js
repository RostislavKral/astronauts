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