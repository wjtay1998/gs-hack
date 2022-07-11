import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.js'
import moduleRoutes from './routes/modules.js'
import userRoutes from './routes/users.js'
import bodyparser from 'body-parser';
// import { notFound } from './middlewares/errorHandlers.js';

const app = express();
app.use(express.json({limit: "30mb" , extended: true}));
app.use(express.urlencoded({limit: "30mb" , extended: true}));
app.use(cors());
// app.use(cors({origin:true,credentials: true}));
app.options('*', cors())
app.get('/', (req,res)=> {
    res.send("Hello to Onboardin-GS v1");
})
app.use('/tasks', taskRoutes);
app.use('/modules', moduleRoutes);
app.use('/users', userRoutes);
// app.use(logger);
// app.use(errorHandler);

const PORT=3000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
