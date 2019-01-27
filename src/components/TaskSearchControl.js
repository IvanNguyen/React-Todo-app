import React, { Component } from 'react';

class TaskSearchControl extends Component {

    constructor(props){
        super(props);
        this.state={
            keyWord: ''
        };
    }
    handleChange=(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var nullKeyWord = value;
        this.props.nullKeyWord(nullKeyWord);
        this.setState({
            [name]:value.toLowerCase()
        });
    }
    Search=()=>{
        this.props.Search(this.state.keyWord);
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input               
                        type="text"
                        name="keyWord"                  
                        className="form-control"
                        onChange={this.handleChange}
                        placeholder="Input your task's name"                   
                    />
                    <span className="input-group-btn">
                        <button 
                            className="btn btn-primary" 
                            type="button"
                            onClick={this.Search}
                             >
                            <span className="fa fa-search mr-5"></span>Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
export default TaskSearchControl;