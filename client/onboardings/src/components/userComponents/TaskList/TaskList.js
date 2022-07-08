import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material'
import * as api from '../../../api/index.js';
import Task from './Task/Task.js';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const TaskList = ({ userId }) => {
    const [taskList, setTaskList] = useState({});

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    }

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

    const grid = 8;
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    return (
        !taskList.length ? <CircularProgress /> :
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {taskList.map((item, index) => (
                                <Draggable key={item.ID} draggableId={item.ID} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.task_name}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
    );
}

export default TaskList;