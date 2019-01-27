import React, { Component } from 'react';

class TaskItem extends Component {

    updateStatus =()=>{
        this.props.updateStatus(this.props.task.id);
    }
    Delete=()=>{
        this.props.deleteTask(this.props.task.id);
    }
    editTask=()=>{
        this.props.editTask(this.props.task);
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">                   
                    <span 
                        className={task.status === true ? 'label label-danger' : 'label label-info'}
                        onClick={this.updateStatus}
                        >
                        {task.status === true ? 'To Do' : 'Completed'}
                    </span>                  
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        onClick={this.editTask}
                        >
                        <span className="fa fa-pencil mr-5"></span>Edit
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        onClick={this.Delete}
                        >
                        <span className="fa fa-trash mr-5"></span>Delete
                    </button>
                </td>
            </tr>
        );
    }
}
export default TaskItem;