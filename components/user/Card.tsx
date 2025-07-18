import React from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import { Element, useNode, type Node } from "@craftjs/core";

import { Container } from "./Container";

// Notice how CardTop and CardBottom do not specify the drag connector. This is because we won't be using these components as draggable; adding the drag handler would be pointless.

export const CardTop = ({children}: {children: React.ReactNode}) => {
    const {connectors: {connect}} = useNode();
    return (
        <div
            ref={ref => {
                if (ref) connect(ref);
            }}
            className="text-only"
        >
            {children}
        </div>
    );
}

CardTop.craft = {
    rules: {
        // Only accept Text
        canMoveIn: (incomingNodes: Node[]) => incomingNodes.every(incomingNode => incomingNode.data.type === Text)
    }
}

export const CardBottom = ({children}: {children: React.ReactNode}) => {
    const {connectors: {connect}} = useNode();
    return (
        <div ref={(ref)=> {
            if (ref) connect(ref);
        }}>
            {children}
        </div>
    )
}

CardBottom.craft = {
    rules: {
        // Only accept Buttons
        canMoveIn: (incomingNodes: Node[]) => incomingNodes.every(incomingNode => incomingNode.data.type === Button)
    }
}

export const Card = ({background, padding = 20}: {
    background: string | number | undefined;
    padding?: number;
}) => {
    return (
        <Container background={background} padding={padding}>
            <Element id="text" is={CardTop} canvas>
                <Text text="Title" fontSize={20}/>
                <Text text="Subtitle" fontSize={15}/>
            </Element>
            <Element id="buttons" is={CardBottom} canvas>
                <Button size="small" color={'info'} variant={'contained'}>Learn more</Button>
            </Element>
        </Container>
    )
}