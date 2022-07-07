import React, {useEffect} from 'react';
import useStyles from './styles';
import {Card, CardContent, Button, Typography} from '@mui/material';

const Task = ({task}) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} variant="body2" color="textSecondary" component="p">{task.task_name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{task.task_description}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}


export default Task;