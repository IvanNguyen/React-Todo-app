import React, { Component } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
//import _ from 'lodash';  // import nguyen thu vien lodash se rat nang ! ko nen
// import { filter } from 'lodash'; // import nhung ham` can dung ma thoi !!!
import { findIndex} from 'lodash';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      tasks: [],
      isDisplayForm: false,
      taskEditting: null, // state chứa task được chọn để edit
      filter : {
        name: '',
        status: 0
      },
      keyWord: '',
      sort: {
        by: 'name',
        type: 1
      }      
    };
  }
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }  
  }
  onGenerateData = () => {
    const id = require('crypto-random-string');
    var tasks = [
      {
        id: id(10),
        name: 'Hoc lap trinh',
        status: true
      },
      {
        id: id(10),
        name: 'Mua quan ao mua dong',
        status: false
      },
      {
        id: id(10),
        name: 'Lam viec nha',
        status: false
      },
      {
        id: id(10),
        name: 'ban hang online',
        status: true
      },
      {
        id: id(10),
        name: 'Giao hang cho khach',
        status: true
      },
      {
        id: id(10),
        name: 'Da banh ',
        status: false
      }
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  toogleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditting !== null){
      this.setState({
        isDisplayForm : true,
        taskEditting: null
      });
    }
    this.setState({
      isDisplayForm: true
    });  
  }
  closeForm = () => {
    this.setState({
      isDisplayForm : false
    });
  }
  showForm =()=>{
    this.setState({
      isDisplayForm: true
    });
  }
  Submit = (newTask) => {
    const id = require('crypto-random-string');
    if(newTask.id === '') { // Add new task
      var tasks = {
        id : newTask.id = id(10),
        name : newTask.newTaskName,
        status : newTask.status
      };
      this.state.tasks.push(tasks);
    } 
    else{ // Edit task
      this.state.tasks.forEach(task=>{
        if(task.id === newTask.id){
          task.name = newTask.newTaskName;
          task.status = newTask.status
        }
      });
    }    
    this.setState({
      tasks: this.state.tasks,
      taskEditting: '',
      status: true
    });   
    localStorage.setItem('tasks',JSON.stringify(this.state.tasks));
  }
  updateStatus=(id)=>{
    const {tasks} = this.state;
    tasks.forEach(task => {
      if(task.id ===id){
        task.status = !task.status;
      }     
    });
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  deleteTask=(id)=>{
    const {tasks} = this.state;
    var index = findIndex(tasks, task => {
      return task.id === id;
    });
    tasks.splice(index,1);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  editTask = (task) => {
    this.showForm();
    // Tạo nơi lưu trữ task đang được edit, sau đó update nó lên form hiển thị
    this.setState({
      taskEditting: task
    });
  }
  Filter=(filterName,filterStatus)=>{
    // console.log(typeof filterStatus);
    filterStatus = parseInt(filterStatus,10);
    this.setState({
      filter : {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }
  Search=(keyWord)=>{
    this.setState({
      keyWord: keyWord
    }); 
  }
  Sort=(sortBy,sortType)=>{
    this.setState({
      sort: {
        by: sortBy,
        type: sortType
      }
    });
  }
  nullKeyWord=(keyWord)=>{
    var nullKeyWord = keyWord;
    if(nullKeyWord === ''){
      this.setState({
        keyWord: ''
      });
    }
  }
  render() {
    var {tasks, isDisplayForm, taskEditting, filter,sort} = this.state; // var tasks = this.state.tasks;
    //filter name  
    if(filter.name){
      tasks = tasks.filter(task =>{
        return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //tra ve nhung task co task name tim thay giong filter.name
      });
    }
    //SU DUNG THU VIEN --- LODASH
    // tasks = filter(tasks,(task) => {
    //   return task.name.toLowerCase().indexOf(filter.name) !== -1;
    // });

    //fiter status
    tasks = tasks.filter(task => {
      if(filter.status === 0){
        return task;
      }else{
        return task.status === (filter.status === 1 ? true : false);
      }
      });
    //Search keyword
    if(this.state.keyWord){
      tasks = tasks.filter(task =>{
        return task.name.toLowerCase().indexOf(this.state.keyWord) !== -1;
      });
    } 
    //Sort
    if(sort.by === 'name'){
      tasks.sort((a,b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return sort.type;
        else if ( a.name.toLowerCase() < b.name.toLowerCase()) return -sort.type;
        else return 0;
      });
    }
    if(sort.by === 'status'){
      tasks.sort((a,b) => {
        if (a.status > b.status) return -sort.type;
        else if ( a.status < b.status) return sort.type;
        else return 0;
      });
    }
    
    var elmTaskForm = isDisplayForm ? <TaskForm 
                                        onCloseForm={this.closeForm}
                                        onSubmit={this.Submit}
                                        task={taskEditting}
                                      />
                                       : '';
    return (
      <div className="container">
                {/* <!-- Trigger the modal with a button --> */}
                <button type="button" className="btn btn-info btn-lg hide" data-toggle="modal" data-target="#myModal">Open Modal</button>
                {/* <!-- Modal --> */}
                <div id="myModal" className="modal fade " role="dialog">
                  <div className="modal-dialog">                 
                    {/* <!-- Modal content--> */}
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title" style={{fontWeight:"bold", fontSize:"35px",textAlign: "center",color: "green"}}>WELCOME BACK</h4>
                      </div>
                      <div className="modal-body" style={{fontWeight:"bold", fontSize:"30px",textAlign: "center"}}>
                        <p>Have a great day ( ^ - ^ )</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                    <h1>--- TO-DO LIST ---</h1><hr/>
                </div>
                <div className="row">
                    
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                      {elmTaskForm}
                    </div>
                    
                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" 
                                className="btn btn-primary"
                                onClick={this.toogleForm}
                        >
                          <i className="fa fa-plus"></i> Add new task
                        </button>&nbsp;
                        <button type="button" 
                                className="btn btn-danger mr-5"
                                onClick={this.onGenerateData}
                                >
                            <span className="fa fa-plus"></span> Generate Data
                        </button>
                        <TaskControl 
                            Search={this.Search}
                            Sort={this.Sort}
                            nullKeyWord={this.nullKeyWord}
                        />
                        <TaskList
                           tasks={tasks} // tasks={this.state.tasks}
                           updateStatus={this.updateStatus}
                           deleteTask={this.deleteTask}
                           editTask={this.editTask}
                           Filter={this.Filter}
                        />
                    </div>
                </div>
            </div>
    );
  }
}
export default App;
