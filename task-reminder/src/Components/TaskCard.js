import React, { useState } from "react";
import user from "../images/user.png";


const TaskCard = (props) => {
  const { id, task, reminder } = props.Task;
  const [selectedDateTime, setSelectedDateTime] = useState("");

  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  return (
    <div className="item" style={{ marginBottom: "1rem" }}>
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <div className="header">{task}</div>
        <div>{reminder}</div>

        <input
          type="datetime-local"
          min="2025-05-19T13:45"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          style={{ marginTop: "8px" }}
        />

        {selectedDateTime && (
          <div style={{ marginTop: "5px", color: "gray" }}>
            Selected Date & Time: {new Date(selectedDateTime).toLocaleString()}
          </div>
        )}
      </div>
      <i
        className="trash icon"
        style={{ color: "grey", marginTop: "7px", cursor: "pointer", float: "right" }}
        onClick={() => props.clickHandler(id)}
        ></i>
    </div>
  );
};

export default TaskCard;
