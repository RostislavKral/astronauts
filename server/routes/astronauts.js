import express from "express";
import {create, index, remove} from "../controllers/astronauts.js";

const router = express.Router();

router.get('/', index);
router.post('/', create);
router.delete('/delete/:id', remove)


export default router;