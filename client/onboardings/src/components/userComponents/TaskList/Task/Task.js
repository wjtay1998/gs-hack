import React, {useEffect} from 'react';
import {Card, CardContent, Typography} from '@mui/material';

const Task = ({task}) => {
    return (
        <div>
            <Card display= 'flex' borderradius= '15px' height= '100%' width="300px" position= 'relative'>
                <CardContent>
                    <Typography align='center' padding= '0 16px' variant="body2" color="textSecondary" component="p">{task.task_name}</Typography>
                    <Typography align='center' variant="body2" color="textSecondary" component="p">{task.task_description}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Task;