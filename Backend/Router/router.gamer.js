import express from 'express';
import { createRecord, getRecordAll } from '../Controller/gamer.controller.js';

const router = express.Router();

router.post('/newRecord', createRecord);
router.get('/getRecord', getRecordAll);

export default router;
