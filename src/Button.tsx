import React from 'react';

export const Button: React.FC = (props: any) => <button className={props.className}
                                         onClick={props.onClick}>{props.title}</button>;