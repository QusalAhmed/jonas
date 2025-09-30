import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: {id: string, children: React.ReactNode}) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
        border: isOver ? '1px solid green' : undefined,
        padding: '10px',
        margin: '10px',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isOver ? 'lightgreen' : 'cornsilk',
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}