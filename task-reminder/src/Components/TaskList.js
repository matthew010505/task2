import React from "react";
import TaskCard from "./TaskCard";

const TaskList = (props) => {
  const deleteTaskHandler = (id) => {
    props.getTaskId(id);
  };

  const renderTasklist = props.Tasks.map((Task) => {
    return <TaskCard Task={Task} clickHandler={deleteTaskHandler} key={Task.id} />;
  });

  return <div className="ui celled list">{renderTasklist}</div>;
};

export default TaskList;

