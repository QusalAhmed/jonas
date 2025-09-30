'use client'

import style from './styles.module.scss'

import React, { useEffect } from 'react'

// Tiptap
import { TextStyleKit } from '@tiptap/extension-text-style'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState, findParentNode, posToDOMRect } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'

// ShadCN UI
import { Button } from "@/components/ui/button"

const extensions = [
    TextStyleKit.configure({
        // fontSize: {
        //     types: ['heading', 'paragraph'],
        // }
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: false,
        }
    }),
]

function MenuBar({editor}: { editor: Editor | null }) {
    // Read the current editor's state and re-render the component when it changes
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor ? ctx.editor.isActive('bold') : false,
                canBold: ctx.editor ? ctx.editor.can().chain().toggleBold().run() : false,
                isItalic: ctx.editor ? ctx.editor.isActive('italic') : false,
                canItalic: ctx.editor ? ctx.editor.can().chain().toggleItalic().run() : false,
                isStrike: ctx.editor ? ctx.editor.isActive('strike') : false,
                canStrike: ctx.editor ? ctx.editor.can().chain().toggleStrike().run() : false,
                isCode: ctx.editor ? ctx.editor.isActive('code') : false,
                canCode: ctx.editor ? ctx.editor.can().chain().toggleCode().run() : false,
                canClearMarks: ctx.editor ? ctx.editor.can().chain().unsetAllMarks().run() : false,
                isParagraph: ctx.editor ? ctx.editor.isActive('paragraph') : false,
                isHeading1: ctx.editor ? ctx.editor.isActive('heading', {level: 1}) : false,
                isHeading2: ctx.editor ? ctx.editor.isActive('heading', {level: 2}) : false,
                isHeading3: ctx.editor ? ctx.editor.isActive('heading', {level: 3}) : false,
                isHeading4: ctx.editor ? ctx.editor.isActive('heading', {level: 4}) : false,
                isHeading5: ctx.editor ? ctx.editor.isActive('heading', {level: 5}) : false,
                isHeading6: ctx.editor ? ctx.editor.isActive('heading', {level: 6}) : false,
                isBulletList: ctx.editor ? ctx.editor.isActive('bulletList') : false,
                isOrderedList: ctx.editor ? ctx.editor.isActive('orderedList') : false,
                isCodeBlock: ctx.editor ? ctx.editor.isActive('codeBlock') : false,
                isBlockquote: ctx.editor ? ctx.editor.isActive('blockquote') : false,
                canUndo: ctx.editor ? ctx.editor.can().chain().undo().run() : false,
                canRedo: ctx.editor ? ctx.editor.can().chain().redo().run() : false,
            }
        },
    })

    // If the editor is not ready, render nothing. useEditorState handles null editor safely, but
    // event handlers must guard against null editor.
    const [fontSize, setFontSize] = React.useState<string>('16px')
    function normalizeFontSize(value: string) {
        const v = value.trim()
        if (!v) return '16px'
        if (/^\d+$/.test(v)) return `${v}px`
        return v
    }
    if (!editor) return null

    return (
        <div className={style.controlGroup}>
            <div className={style.buttonGroup}>
                {/* Use the project's Button component for consistent styling. Keep accessibility props. */}
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editorState?.canBold} className={editorState?.isBold ? style.isActive : ''}>Bold</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editorState?.canItalic} className={editorState?.isItalic ? style.isActive : ''}>Italic</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editorState?.canStrike} className={editorState?.isStrike ? style.isActive : ''}>Strike</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={!editorState?.canCode} className={editorState?.isCode ? style.isActive : ''}>Code</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setParagraph().run()}
                        className={editorState?.isParagraph ? style.isActive : ''}>Paragraph</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={editorState?.isHeading1 ? style.isActive : ''}>H1</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={editorState?.isHeading2 ? style.isActive : ''}>H2</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        className={editorState?.isHeading3 ? style.isActive : ''}>H3</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                        className={editorState?.isHeading4 ? style.isActive : ''}>H4</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                        className={editorState?.isHeading5 ? style.isActive : ''}>H5</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                        className={editorState?.isHeading6 ? style.isActive : ''}>H6</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editorState?.isBulletList ? style.isActive : ''}>Bullet</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editorState?.isOrderedList ? style.isActive : ''}>Ordered</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editorState?.isCodeBlock ? style.isActive : ''}>Code block</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editorState?.isBlockquote ? style.isActive : ''}>Blockquote</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().setHardBreak().run()}>BR</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editorState?.canUndo}>Undo</Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editorState?.canRedo}>Redo</Button>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={fontSize}
                        onChange={e => setFontSize(e.target.value)}
                        placeholder="16px"
                        className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <select
                        value={fontSize}
                        onChange={e => setFontSize(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="16px">16px</option>
                        <option value="18px">18px</option>
                        <option value="24px">24px</option>
                        <option value="32px">32px</option>
                        <option value="48px">48px</option>
                    </select>
                    <Button type="button" size="sm" variant="ghost"
                            onClick={() => editor.chain().focus().setFontSize(normalizeFontSize(fontSize)).run()}
                    >
                        Set size
                    </Button>
                </div>
            </div>
        </div>
    )
}

function BubbleMarksMenu({ editor }: { editor: Editor | null }) {
    const state = useEditorState({
        editor,
        selector: ctx => ({
            isBold: ctx.editor ? ctx.editor.isActive('bold') : false,
            isItalic: ctx.editor ? ctx.editor.isActive('italic') : false,
            isStrike: ctx.editor ? ctx.editor.isActive('strike') : false,
        }),
    })

    if (!editor) return null

    return (
        <div className={style.bubbleMenu}>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={state?.isBold ? style.isActive : ''}
                variant="ghost"
                size={'sm'}
            >
                {state?.isBold ? 'Bolded' : 'Bold'}
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={state?.isItalic ? style.isActive : ''}
                variant="ghost"
                size={'sm'}
            >
                Italic
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={state?.isStrike ? style.isActive : ''}
                variant="ghost"
                size={'sm'}
            >
                Strike
            </Button>
        </div>
    )
}

const TipTap = (
    { setEditorContent, autoFocus = false }: { setEditorContent: (content: string) => void, autoFocus?: boolean }
) => {
    const editor = useEditor({
        extensions,
        content: '',
        // Ensure the editor does not render before hydration to avoid focus jumps
        immediatelyRender: false,
        // Explicitly control autofocus behavior
        autofocus: autoFocus ? 'end' : false,
        onUpdate: ({ editor }) => {
            localStorage.setItem('editorContent', editor.getHTML())
            console.log(editor.getJSON())
            setEditorContent(editor.getHTML())
        },
    })

    // Restore content once when the editor instance is ready, without stealing focus
    useEffect(() => {
        if (!editor) return
        const savedContent = localStorage.getItem('editorContent')
        editor.commands.setContent(savedContent || '<p>Hello World! 🌎️</p>')
        // Do not call focus() here to avoid auto-focusing when editing
    }, [editor]);

    return (
        <>
            {editor ? (
                <div className={'relative flex flex-col'}>
                    <MenuBar editor={editor} />
                    <EditorContent editor={editor} className={style.tiptap} />
                </div>
            ) : null}

            {editor && (
                <>
                    <BubbleMenu editor={editor}
                                options={{
                                    placement: 'bottom',
                                    offset: 8, flip: true,
                                }}
                                className={'bg-white border-amber-300 border-2 rounded-md p-1'}
                    >
                        <BubbleMarksMenu editor={editor} />
                    </BubbleMenu>

                    <BubbleMenu
                        editor={editor}
                        shouldShow={() => editor.isActive('bulletList') || editor.isActive('orderedList')}
                        getReferencedVirtualElement={() => {
                            const parentNode = findParentNode(
                                node => node.type.name === 'bulletList' || node.type.name === 'orderedList',
                            )(editor.state.selection)
                            if (parentNode) {
                                const domRect = posToDOMRect(editor.view, parentNode.start, parentNode.start + parentNode.node.nodeSize)
                                return {
                                    getBoundingClientRect: () => domRect,
                                    getClientRects: () => [domRect],
                                }
                            }
                            return null
                        }}
                        options={{ placement: 'top-start', offset: 8 }}
                    >
                        <div className="bubble-menu">
                            <Button
                                type="button"
                                onClick={() => {
                                    const chain = editor.chain().focus()
                                    if (editor.isActive('bulletList')) {
                                        chain.toggleOrderedList()
                                    } else {
                                        chain.toggleBulletList()
                                    }
                                    chain.run()
                                }}
                                size={'sm'}
                            >
                                Toggle list type
                            </Button>
                        </div>
                    </BubbleMenu>
                </>
            )}
        </>
    )
}

export default TipTap
