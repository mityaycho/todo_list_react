import React from 'react';

export const Button = (props) => <button className={props.className}
                                         onClick={props.onClick}>{props.title}</button>;