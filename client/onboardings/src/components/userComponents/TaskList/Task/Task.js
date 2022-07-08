import React, {useEffect} from 'react';
import useStyles from './styles';
import {Card, CardContent, Button, Typography} from '@mui/material';

const Task = ({task}) => {
    const classes = useStyles();
    return (
        <div>
            <Card display= 'flex' borderRadius= '15px' height= '100%' position= 'relative'>
                <CardContent>
                    <Typography align='center' padding= '0 16px' variant="body2" color="textSecondary" component="p">{task.task_name}</Typography>
                    <Typography align='center' variant="body2" color="textSecondary" component="p">{task.task_description}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Task;