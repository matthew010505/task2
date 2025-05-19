import React from "react";

class AddTask extends React.Component {
  state = {
    task: "",
    reminder: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.task === "" || this.state.reminder === "") {
      alert("Fill the mandatory fields");
      return;
    }
    this.props.addTaskHandler(this.state);
    this.setState({ task: "", reminder: "" });
  };

  render() {
    return (
      <div className="ui main">
        <h2>Add Task</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Enter Task ID</label>
            <input
              type="text"
              name="task"
              placeholder="Enter task id"
              value={this.state.task}
              onChange={(e) => this.setState({ task: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Enter Description</label>
            <input
              type="text"
              name="reminder"
              placeholder="Enter description"
              value={this.state.reminder}
              onChange={(e) => this.setState({ reminder: e.target.value })}
            />
          </div>
          <button className="ui button blue" type="submit">
            Add task
          </button>
        </form>
      </div>
    );
  }
}

export default AddTask;
