import React, { Component } from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-15">
                <TaskSearchControl 
                    Search={this.props.Search}
                    nullKeyWord={this.props.nullKeyWord}
                />
                <TaskSortControl
                    Sort={this.props.Sort}
                />
            </div>
        );
    }
}
export default TaskControl;