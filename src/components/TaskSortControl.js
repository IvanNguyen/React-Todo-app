import React, { Component } from 'react';

class TaskSortControl extends Component {

    constructor(props){
        super(props);
        this.state ={
            sort :{
                by: 'name',
                type: 1
            }
        };
    }
    handleClick=(sortBy, sortType)=>{
        this.props.Sort(sortBy,sortType);
        this.setState({
            sort : {
                by : sortBy,
                type: sortType
            }
        });      
    }
    render() {
        var {sort}=this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sort <i className="fas fa-sort-down"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=> this.handleClick('name',1)}>
                            <a role="button"
                                href="#top" 
                                className={(sort.by === 'name' && sort.type === 1)
                                            ? 'sort_selected' : ''
                                        }
                            >
                            <i className="fas fa-sort-alpha-down"> A-Z</i>
                            </a>
                        </li>
                        <li onClick={()=> this.handleClick('name',-1)}>
                            <a role="button"
                                href="#top"
                                className={(sort.by === 'name' && sort.type === -1)
                                ? 'sort_selected' : ''
                            }
                            >
                            <i className="fas fa-sort-alpha-up"> Z-A</i>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={()=> this.handleClick('status',1)}>
                            <a role="button"
                                href="#top"
                                className={(sort.by === 'status' && sort.type === 1)
                                ? 'sort_selected' : ''
                            }
                            >
                                To Do
                            </a>
                        </li>
                        <li onClick={ () => this.handleClick('status', -1) } >
                            <a role="button"
                                href="#top"
                                className={(sort.by === 'status' && sort.type === -1)
                                ? 'sort_selected' : ''
                            }
                            >
                                Completed
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default TaskSortControl;