"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { getSnapshot, loadSnapshot, Tldraw, track, useEditor } from 'tldraw'
import { Dock, DockIcon } from "@/components/ui/dock";

import 'tldraw/tldraw.css'
import { toast } from "sonner"
import '../custom-ui.css'
import { useTheme } from 'next-themes';

import { useChatSidebar } from '@/lib/zustand/store';
import { updateStamp } from '@/convex/stamps';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const page = async ({ params }: { params: { id: string } }) => {
    
    const { id } =await params;
    console.log(id)
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw hideUi inferDarkMode>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <CustomUi slug={id} />
            </div>
        </Tldraw>
    </div>
  ) 
}
const CustomUi = track(({slug}: {slug: string}) => {
    const editor = useEditor()
    const { setTheme, theme } = useTheme()
    const { openChat, closeChat, open } = useChatSidebar()

    const updateStampMutation = useMutation(api.stamps.updateStamp)
    // 1. Fetch the specific stamp using a query (make sure you have a 'getById' query)
    const stamp = useQuery(api.stamps.getById, { id: slug as any });

    useEffect(() => {
        // 2. Only load if the stamp data has arrived and the editor is ready
        if (stamp && stamp.content) {
            try {
            // If content is already an object, don't JSON.parse it
            const content = typeof stamp.content === 'string' 
                ? JSON.parse(stamp.content) 
                : stamp.content;

            loadSnapshot(editor.store, content);
            
            // We use a ref or a state check to ensure this toast only shows once
            console.log("Sync complete: Canvas loaded from Convex");
            } catch (e) {
            console.error("Failed to load snapshot:", e);
            }
        }
    }, [stamp, editor, slug]); // Runs whenever the data from Convex changes

    const save = useCallback(async () => {
        const { document } = getSnapshot(editor.store);
        
        // Ensure slug exists before calling the mutation
        if (!slug) {
            toast.error("Point of failure: No document ID found.");
            return;
        }

        try {
            await updateStampMutation({
                id: slug,       // This must be the Convex Id<"stamps">
                content: document,
                title: "Untitled Note", // Add the missing required field
            });
            toast.success("The document has been saved successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to sync with the cloud.");
        }
    }, [editor, slug, updateStampMutation]); // Added dependencies for safety

    

    
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
                }}/>

            </Dock>
        </div>
    )
})

export default page