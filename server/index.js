import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.js'
import moduleRoutes from './routes/modules.js'
import userRoutes from './routes/users.js'
import { notFound } from './middlewares/errorHandlers.js';

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb" , extended: true}));
app.use(express.urlencoded({limit: "30mb" , extended: true}));
app.use(cors());
app.get('/', (req,res)=> {
    res.send("Hello to Onboardin-GS");
})
app.use('/tasks', taskRoutes);
app.use('/modules', moduleRoutes);
app.use('/users', userRoutes);
app.use(notFound);
// app.use(logger);
// app.use(errorHandler);
