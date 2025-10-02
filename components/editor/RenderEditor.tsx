import styles from "@/app/posts/styles.module.scss"

import React, { useMemo } from 'react'

// Tiptap
import { renderToReactElement } from '@tiptap/static-renderer/pm/react'
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";


/**
 * This example demonstrates how to render a Prosemirror Node (or JSON Content) to a React Element.
 * It will use your extensions to render the content based on each Node's/Mark's `renderHTML` method.
 * This can be useful if you want to render content to React without having an actual editor instance.
 *
 * You have complete control over the rendering process. And can replace it how each Node/Mark is rendered.
 */
export default function RenderEditor({ json }: { json: object }) {
    const output = useMemo(() => {
        return renderToReactElement({
            content: json,
            extensions: [
                TextStyleKit.configure({}),
                StarterKit.configure({
                    bulletList: {
                        keepMarks: true,
                    }
                }),
            ],
        })
    }, [json])

    return <div className={styles.tiptap}>{output}</div>
}