import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import * as api from "../../../api/index.js";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);

  if (startIndex !== 0) {
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  }
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  if (sourceClone !== 0) {
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
  }

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle, tag) => {
  const colorMap = { HR: "#BBF1C4", Compliance: "#F8F1AE", GSAM: "#FFD5D4" };

  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",

    // change background colour if dragging
    background: isDragging ? colorMap[tag] : colorMap[tag],

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};
const getListStyle = (isDraggingOver, ind) => {
  const colourMap = [
    "#333333",
    "#DCE3E8",
    "#C1CCD6",
    "#9FB1BD",
    "#C1CCD6",
    "#DCE3E8",
    "#2A3F4D",
    "#1C2B36",
  ];
  if (ind === 0) {
    return {
      background: isDraggingOver ? "lightgrey" : colourMap[ind],
      padding: grid,
      width: 220,
      margin: "80px 50px 0 20px",
      height: "650px",
      borderRadius: "8px",
    };
  } else {
    return {
      background: isDraggingOver ? "lightgrey" : colourMap[ind],
      padding: grid,
      width: 210,
      margin: "80px 0 0 20px",
      height: "650px",
      borderRadius: "8px",
    };
  }
};

function TimeTable({ userId }) {
  const [state, setState] = useState([[], [], [], [], [], []]);

  useEffect(() => {
    api.getUserTasks(userId).then((res) => {
      var userTasklist = [];
      for (const [key, value] of Object.entries(res.data)) {
        value["ID"] = key;
        userTasklist.push(value);
      }
      setState([
        userTasklist.slice(0, 3),
        userTasklist.slice(3, 5),
        [],
        userTasklist.slice(5, 8),
        userTasklist.slice(8, 11),
        [],
      ]);
    });
  }, []);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
    }
  }

  const myMap = [
    "Unscheduled Tasks",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const isCompleted = (isCompleted) => {
    if (isCompleted) {
      return <CheckBoxIcon />;
    }
    return <CheckBoxOutlineBlankIcon />;
  };

  const title = (ind) => {
    if (ind === 0) {
      return (
        <Typography
          color="white"
          fontSize="20px"
          fontWeight="medium"
          align="center"
          padding="10px 0 15px 0"
        >
          {myMap[ind]}
        </Typography>
      );
    }
    return (
      <Typography
        fontSize="20px"
        fontWeight="bold"
        align="center"
        padding="10px 0 15px 0"
      >
        {myMap[ind]}
      </Typography>
    );
  };

  const getLink = (id) => {
    return "/taskdetails/" + id;
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver, ind)}
                  {...provided.droppableProps}
                >
                  {title(ind)}
                  {el.map((item, index) => (
                    <Draggable
                      key={item.ID}
                      draggableId={item.ID}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            item.tag
                          )}
                        >
                          <Button
                            component={Link}
                            to={getLink(item.task_id)}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              color: "black",
                              width: "200px",
                            }}
                          >
                            {item.task_name}
                            {isCompleted(item.is_completed)}
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default TimeTable;
