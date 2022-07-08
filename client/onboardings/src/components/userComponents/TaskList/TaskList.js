import React, {useState, useEffect} from 'react';
import { Grid, CircularProgress} from '@mui/material'
import * as api from '../../../api/index.js';
import Task from './Task/Task.js';

const TaskList = ({userId}) => {
    const [taskList, setTaskList] = useState({});
    
    useEffect(() => {
        api.getUserTasks(userId).then(res => {
            var userTasklist = []
            for (const [key, value] of Object.entries(res.data)) {
                value["ID"] = key;
                userTasklist.push(value);
            }
            setTaskList(userTasklist);
        })
        }, []
    );

    return (
       !taskList.length ? <CircularProgress/> :
       <Grid flexDirection="column" display="flex" padding = "20px" container spacing={2}>
           {taskList.map((task) => (
               <Grid key = {task.task_id} item xs={12} sm={4}>
                   <Task task= {task}/>
                </Grid>
           ))}
       </Grid>
    )
}

export default TaskList;