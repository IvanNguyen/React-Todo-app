import React, { Component } from 'react';


class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state={
            id: '',
            newTaskName : '',
            status : true
        };
    }
    // componentWillMount(){
    //     const {task} = this.props;
    //     if(task){
    //         this.setState({
    //             id: task.id,
    //             newTaskName: task.name,
    //             status: task.status
    //         });
    //     }
    // }
    componentWillReceiveProps(nextProps){
        if(nextProps.task === null){
            this.setState({
                id: '',
                newTaskName : '',
                status : true
            });
        }else{
            this.setState({
                id: nextProps.task.id,
                newTaskName: nextProps.task.name,
                status: nextProps.task.status
            });
        }   
    }
    closeForm = () => {
        this.props.onCloseForm();
    }
    handleChange=(e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value =  target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.onSubmit(this.state);
        //Cancel and Close The Form
        this.onClear();
        this.closeForm();
    }
    onClear = () => {
        this.setState({
            newTaskName: '',
            status: true
        });
    }
  render() {
      var { status,id } = this.state;
    return (
        <div className={id === '' ? 'panel panel-primary' : 'panel panel-warning'}>
        <div className="panel-heading">
            <h3 className="panel-title">
               {id === '' ? 'Add new task' : 'Edit task'}
                <span
                    className="fa fa-times-circle text-right"
                    onClick={this.closeForm}
                ></span>
            </h3>
        </div>
        <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Task-name :</label>
                    <input
                        type="text"
                        className="form-control"
                        name="newTaskName"
                        value={this.state.newTaskName}
                        onChange={this.handleChange}
                    />
                </div>
                <label>Status :</label>
                <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={this.handleChange}
                >
                    <option value={true}>To Do</option>
                    <option value={false}>Completed</option>
                </select><br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">
                        <span className="fa fa-plus mr-5"></span>
                        {id === '' ? 'Add' : 'Save'}
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onClear}>
                        <span className="fa fa-close mr-5"></span>Clear
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
  }
}
export default TaskForm;
