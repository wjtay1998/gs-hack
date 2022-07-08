import React, { useState , useEffect} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as api from '../../../api/index.js';
import { Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  
  if (startIndex !=0) {
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

  if (sourceClone != 0) {
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
  }

  

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightblue" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightgrey" : "lightblue",
  padding: grid,
  width: 220,
  margin: '80px 0 0 20px',
  height: '600px'
});

function TimeTable({ userId }) {
  const [state, setState] = useState([[],[],[],[],[],[]]);

  useEffect(() => {
    api.getUserTasks(userId).then(res => {
        var userTasklist = []
        for (const [key, value] of Object.entries(res.data)) {
            value["ID"] = key;
            userTasklist.push(value);
        }
        console.log(userTasklist);
        setState([userTasklist,[],[],[],[],[]]);
            })
        }, []
    );

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

  const myMap = ['Task List', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                    <Typography align = "center" padding="5px">{myMap[ind]}</Typography>
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
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {item.task_name}
                          </div>
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