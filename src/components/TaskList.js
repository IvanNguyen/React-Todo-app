import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state={
            filterName: '',
            filterStatus: 0
        };
    }
    onChange =(event)=>{
        var {filterName,filterStatus}=this.state;
        var target = event.target;
        var name = target.name;
        var value = target.value;
        // if(name === filterName){
        //     this.props.Filter(value);
        // }
        this.props.Filter(
            name === 'filterName' ? value : filterName,
            name === 'filterStatus' ? value : filterStatus
        );
        this.setState({
            [name]:value
        });
    }
    render() {
        var {tasks} =this.props;
        var {filterName,filterStatus} =this.state;
        var elmTasks = tasks.map((task,index)=> {// var elmTasks = this.props.tasks.map((task,index)=> {
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task}
                        updateStatus={this.props.updateStatus}
                        deleteTask={this.props.deleteTask}
                        editTask={this.props.editTask}
                        />
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">No</th>
                                <th className="text-center">Task</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        value={filterName}
                                        onChange={this.onChange}
                                        placeholder="Filter"
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        value={filterStatus}
                                        onChange={this.onChange}
                                    >
                                        <option value={0}>All</option>
                                        <option value={-1}>Completed</option>
                                        <option value={1}>To do</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                           {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default TaskList;