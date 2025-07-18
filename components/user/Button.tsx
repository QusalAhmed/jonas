import React from "react";
import { Button as MaterialButton } from "@mui/material";
import { useNode } from "@craftjs/core";

export const Button = ({size, variant, color, children}: {
    size: "small" | "medium" | "large";
    variant: "text" | "outlined" | "contained",
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    children: React.ReactNode
}) => {
    const {connectors: {connect, drag}} = useNode();
    return (
        <span className={'m-2'}>
            <MaterialButton ref={(ref) => {
                if (ref) connect(drag(ref));
            }}
                            size={size}
                            variant={variant}
                            color={color}
            >
                {children}
            </MaterialButton>
        </span>
    )
}