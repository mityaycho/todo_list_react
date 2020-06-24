import React from 'react';
import './App.css';
import { Button } from "./Button";

class AddNewItemForm extends React.Component {
  state = {
    error: false,
    title: ""
  };

  onAddItemClick = () => {
    let newText = this.state.title;
    this.setState({title: ""});

    if (newText === "") {
      this.setState({error: true});
    } else {
      this.setState({error: false});
      // передаём новый текст наружу
      this.props.addItem(newText);
    }
  };

  onTitleChanged = (e) => {
    this.setState({
      error: false,
      title: e.currentTarget.value
    });
  };

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onAddItemClick();
    }
  };


  render = () => {
    let classNameForInput = this.state.error ? "error" : "input";

    return (
      <div className="todoList-newTaskForm">
        <input className={classNameForInput} type="text"
               placeholder={this.props.placeholder}
               onChange={this.onTitleChanged}
               onKeyPress={this.onKeyPress}
               value={this.state.title}
        />
        <Button className="universe-button" title="add" onClick={this.onAddItemClick}/>
      </div>
    );
  };
};

export default AddNewItemForm;

