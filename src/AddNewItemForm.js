import React from 'react';
import './App.css';

class AddNewItemForm extends React.Component {
  state = {
    error: false,
    title: ""
  }

  onAddTitleClick = () => {
    let newTitle = this.state.title;

    if (newTitle.trim() === "") {
      this.setState({error: true});
    } else {
      this.setState({error: false});
      this.setState({title: ""});
      this.props.addItem(newTitle);
    }
  }

  onTitleChanged = (e) => {
    this.setState({
      error: false,
      title: e.currentTarget.value
    });
  }

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.onAddTitleClick()
    }
  }


  render = () => {
    let classNameForInput = this.state.error ? "error" : "";

    return (
      <div className="newItemForm">
        <input className={classNameForInput} type="text" placeholder="New item name"
               onChange={this.onTitleChanged}
               onKeyPress={this.onKeyPress}
               value={this.state.title}
        />
        <button onClick={this.onAddTitleClick}>Add</button>
      </div>
    );
  }
}

export default AddNewItemForm;

