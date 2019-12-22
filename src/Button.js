import React from 'react';

export const Button = (props) => <button className="universe-button"
                                         onClick={props.onClick}>{props.title}</button>