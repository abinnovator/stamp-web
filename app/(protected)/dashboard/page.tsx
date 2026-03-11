"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import { StickyNote, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const router = useRouter()
  
  const stamps = useQuery(api.stamps.get)
  const calendars = useQuery(api.calendars.get)
  const createStampMutation = useMutation(api.stamps.create)
  const storeUser = useMutation(api.users.store)

  // Ensure user record exists in Convex on first load
  useEffect(() => {
    storeUser()
  }, [])

  const isLoading = stamps === undefined || calendars === undefined

  // 2. Handle Creation Logic
  const handleCreate = async () => {
    try {
      const newId = await createStampMutation({
        type: "note",
        title: "New Research Note",
        content: {},
        position: { x: Math.random() * 400, y: Math.random() * 200, width: 200, height: 150 },
      })
      
      // Optionally navigate to the specific stamp editor
      // router.push(`/dashboard/stamp/${newId}`)
    } catch (error) {
      console.error("Mutation failed:", error)
    }
  }

  return (
    <div className="bg-[#191919] min-h-screen text-white font-sans">
      {/* Header Section */}
      <div className="py-8 px-8 md:px-72">
        <h1 className="text-center text-3xl pt-8 pb-6 font-bold tracking-tight">Good evening</h1>

        {/* Recently Visited Grid */}
        <div className="flex flex-col gap-5 pt-3">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-[#ADA9A3] font-medium">Recently visited</h2>
            <button 
              onClick={handleCreate}
              className="p-1 hover:bg-[#2a2a2a] rounded-full transition-colors group"
            >
              <Plus className="text-[#ADA9A3] group-hover:text-white" size={20} />
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-row gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[200px] h-[130px] rounded-2xl bg-[#252525] animate-pulse" />
              ))}
            </div>
          ) : stamps.length === 0 ? (
            <div className="py-10 border-2 border-dashed border-[#2a2a2a] rounded-2xl text-center">
               <p className="text-[#ADA9A3] text-sm">No stamps yet. Click the + to start your research.</p>
            </div>
          ) : (
            <div className="flex flex-row gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {stamps.map((stamp) => (
                <Link key={stamp._id} href={`/dashboard/stamp/${stamp._id}`}>
                  <div className="flex flex-col border-2 border-transparent bg-[#252525] rounded-2xl py-4 px-5 justify-between gap-8 w-[200px] cursor-pointer transition-all hover:border-[#ADA9A3] hover:bg-[#2a2a2a]">
                    <StickyNote className="text-[#ADA9A3]" size={24} />
                    <div>
                        <h3 className="font-medium truncate mb-1">{stamp.title}</h3>
                        <p className="text-[#666] text-xs">
                        {new Date(stamp.lastModified).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                        })}
                        </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Canvas Section */}
      {/* <div className="px-8 md:px-72 pb-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-[#ADA9A3] font-medium">Canvas Workspace</h2>
        </div>

        <div className="relative w-full bg-[#141414] rounded-3xl border border-[#2a2a2a] overflow-hidden shadow-inner" style={{ height: 600 }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-[#ADA9A3] text-sm italic">
              Synchronizing canvas...
            </div>
          ) : (
            stamps.map((stamp) => (
              <div
                key={stamp._id}
                className="absolute flex flex-col bg-[#252525] rounded-xl py-3 px-4 shadow-xl border border-[#333] cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-500/50 transition-shadow"
                style={{
                  left: stamp.position.x,
                  top: stamp.position.y,
                  width: stamp.position.width,
                  height: stamp.position.height,
                }}
              >
                <div className="flex items-center gap-2 mb-2 border-b border-[#333] pb-2">
                    <StickyNote size={14} className="text-blue-400" />
                    <span className="text-[10px] uppercase tracking-widest text-[#666] font-bold">{stamp.type}</span>
                </div>
                <p className="font-semibold text-sm truncate text-gray-200">{stamp.title}</p>
                <div className="mt-auto pt-2">
                    <Link 
                        href={`/dashboard/stamp/${stamp._id}`}
                        className="text-[10px] text-blue-400 hover:underline"
                    >
                        Open Editor →
                    </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div> */}
    </div>
  )
}