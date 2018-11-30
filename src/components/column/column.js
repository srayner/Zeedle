import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnHeader from "./column-header.js";
import Task from "../task/task";
import TaskList from "../task/task-list";
import NewTask from "../task/new-task";
import NewTaskLink from "../task/new-task-link";
import { startAddTask } from "../../actions/card-actions";
import { removeList } from "../../actions/board";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  margin: 0 8px;
  border: none;
  border-radius: 3px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragging ? "darkgray" : "#e2e4e6")};
  width: 250px;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} column={this.props.list} />
    ));
  }
}

class List extends React.Component {
  render() {
    const list = this.props.list;
    const addTaskLink = (
      <NewTaskLink
        onClick={() => {
          this.props.startAddTask(list);
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add new task...
      </NewTaskLink>
    );

    const addTask = list.addingTask ? <NewTask list={list} /> : addTaskLink;
    return (
      <Draggable draggableId={list.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <ColumnHeader
              dragHandleProps={provided.dragHandleProps}
              title={list.title}
              onDelete={this.props.removeListHandler}
              index={this.props.index}
            />

            <Droppable droppableId={list.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} list={list} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            {addTask}
          </Container>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    startAddTask: column => dispatch(startAddTask(column)),
    removeListHandler: index => dispatch(removeList(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
