"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { getSnapshot, loadSnapshot, Tldraw, track, useEditor } from 'tldraw'
import { Dock, DockIcon } from "@/components/ui/dock";

import 'tldraw/tldraw.css'
import { toast } from "sonner"
import './custom-ui.css'
import { ThemeToggleButton4 } from '@/components/ui/skiper4';
import { ModeToggle } from '@/components/ModeToggle';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useChatSidebar } from '@/lib/zustand/store';

const page = () => {

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
		<Tldraw hideUi inferDarkMode>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <CustomUi />
            </div>
		</Tldraw>
	</div>
  ) 
}
const CustomUi = track(() => {
	const editor = useEditor()
	const { setTheme, theme } = useTheme()
    const { openChat, closeChat, open } = useChatSidebar()
    const save = useCallback(() => {
		// [2]
		const { document, session } = getSnapshot(editor.store)
		// [3]
		localStorage.setItem('snapshot', JSON.stringify({ document, session }))
        console.log("saved", document)
        toast.success("The document has been saved successfully.")
	}, [editor])

	const load = useCallback(() => {
		const snapshot = localStorage.getItem('snapshot')
		if (!snapshot) return

		// [4]
		loadSnapshot(editor.store, JSON.parse(snapshot))
        toast.success("The document has been loaded successfully.")
	}, [editor])

	const [showCheckMark, setShowCheckMark] = useState(false)
	useEffect(() => {
		if (showCheckMark) {
			const timeout = setTimeout(() => {
				setShowCheckMark(false)
			}, 1000)
			return () => clearTimeout(timeout)
		}
		return
	})
	return (
		<div className="">
			
            <Dock>
                <DockIcon
                    src="/arrow-pointer-solid-full-dark.svg"
                    name="select"
                    data-isactive={editor.getCurrentToolId() === 'select'}
					onClick={() => editor.setCurrentTool('select')}
                />
                <DockIcon
                    name="eraser"
                    src="/eraser-solid-full.svg"
                    data-isactive={editor.getCurrentToolId() === 'eraser'}
					onClick={() => editor.setCurrentTool('eraser')}
                />
                <DockIcon
                    name="draw"
                    src="/pen-solid-full.svg"
                    className=''
                    data-isactive={editor.getCurrentToolId() === 'draw'}
					onClick={() => editor.setCurrentTool('draw')}
                />
				<DockIcon
                    name="text"
                    src="/i-cursor-solid-full (1).svg"
                    className=''
                    data-isactive={editor.getCurrentToolId() === 'text'}
					onClick={() => editor.setCurrentTool('text')}
                />
				<DockIcon
                    name="Mode toggle"
                    className=''
					src={theme === "dark" ? "/moon-solid-full.svg" : "/sun-solid-full.svg"}
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                 />
				<DockIcon
                    name="Ai"
                    className=''
					src="/star-solid-full.svg"
                    onClick={() => openChat()}
                    
                 />
                 <DockIcon
                    name="Save"
                    className=''
					src="/floppy-disk-regular-full.svg"
                    onClick={() => {
					save()
					setShowCheckMark(true)
				}}/>
                <DockIcon
                    name="Load"
                    className=''
					src="/floppy-disk-regular-full.svg"
                    onClick={() => {
					load()
					setShowCheckMark(true)
				}}/>
            </Dock>
		</div>
	)
})

export default page