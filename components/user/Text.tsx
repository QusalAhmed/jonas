import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useNode } from "@craftjs/core";
import {Editor, EditorState} from 'draft-js';

export const Text = ({text, fontSize = 18}: { text: string; fontSize?: number }) => {
    const {connectors: {connect, drag}, hasSelectedNode, hasDraggedNode, actions: {setProp}} = useNode((state) => ({
        hasSelectedNode: state.events.selected,
        hasDraggedNode: state.events.dragged
    }));
    const [editable, setEditable] = useState(false);
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    useEffect(() => {
        !hasSelectedNode && setEditable(false)
    }, [hasSelectedNode]);

    function handleEditorChange(editorState: EditorState) {
        setEditorState(editorState);
        const content = editorState.getCurrentContent().getPlainText();
        setProp((props: { text: string; }) => props.text = content, 500);
    }

    return (
        <div ref={(ref) => {
            if (ref) connect(drag(ref));
        }}
             onDoubleClick={() => {
                 setEditable(true)
             }}
             className="bg-amber-100 m-2 p-2 rounded-lg text-center text-gray-800"
        >
            {!editable && <Typography fontSize={fontSize}>{text}</Typography>}
            {editable && <Editor editorState={editorState} onChange={handleEditorChange}/>}
        </div>
    );
};