import React from 'react';
import '../src/App.css';
import {Button} from './Button';

class TodoListFilter extends React.Component {

  state = {
    isHidden: false
  };

  onAllFilterClick = () => this.props.changeFilter("All");

  onCompletedFilterClick = () => this.props.changeFilter("Completed");

  onActiveFilterClick = () => this.props.changeFilter("Active");

  onShowFiltersClick = () => this.setState({isHidden: true});

  onHideFiltersClick = () => this.setState({isHidden: false});

  render = () => {

    let classForAll = this.props.filterValue === "All" ? "filter-active" : "universe-button";
    let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "universe-button";
    let classForActive = this.props.filterValue === "Active" ? "filter-active" : "universe-button";

    return (
      <div className="filter-container">
        <div className="todoList-filter">
          {!this.state.isHidden &&
          <div className="buttons-filter">
            <Button className={classForAll} title="All" onClick={this.onAllFilterClick}/>
            <Button className={classForCompleted} title="Completed" onClick={this.onCompletedFilterClick}/>
            <Button className={classForActive} title="Active" onClick={this.onActiveFilterClick}/>
          </div>
          }
          {!this.state.isHidden && <span className="universe-button show-btn" onClick={this.onShowFiltersClick}>hide</span>}
          {this.state.isHidden && <span className="universe-button show-btn" onClick={this.onHideFiltersClick}>show</span>}
        </div>
      </div>
    );
  }
}

export default TodoListFilter;

