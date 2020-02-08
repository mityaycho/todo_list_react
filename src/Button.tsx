import React from 'react';

interface IButton {
    className: string;
    onClick: () => void;
    title: string
}

export const Button = (props: IButton) => <button className={props.className}
                                         onClick={props.onClick}>{props.title}</button>;