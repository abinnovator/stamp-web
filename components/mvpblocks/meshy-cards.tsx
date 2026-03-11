export default function MeshyCards() {
  return (
    <div className="mx-auto my-8 grid w-full max-w-7xl grid-cols-2 gap-6 p-4 lg:grid-cols-4">
      <div
        className="scale-in group visible cursor-pointer"
        style={{ transform: 'translateY(0px) scale(1)' }}
      >
        <div
          className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl"
          style={{
            background:
              'url(https://images.unsplash.com/photo-1635776062360-af423602aff3?w=800&amp;q=80)',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="code"
                className="lucide lucide-code h-6 w-6 text-white"
              >
                <path d="m16 18 6-6-6-6"></path>
                <path d="m8 6-6 6 6 6"></path>
              </svg>
            </div>
            <h3 className="mb-2 font-sans text-lg font-medium text-white">
              Whiteboard
            </h3>
            <p className="mb-4 font-sans text-sm text-white/80">
              Draw like in a normal whiteboard but with extra features!
            </p>
            
          </div>
        </div>
      </div>

      <div
        className="scale-in group visible cursor-pointer"
        style={{ transform: 'transform: translateY(0px) scale(1)' }}
      >
        <div
          className="relative transform overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl"
          style={{
            background:
              'url(https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=800&amp;q=80)',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="pen-tool"
                className="lucide lucide-pen-tool h-6 w-6 text-white"
              >
                <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
                <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
                <path d="m2.3 2.3 7.286 7.286"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <h3 className="mb-2 font-sans text-lg font-medium text-white">
              Ai Research
            </h3>
            <p className="mb-4 font-sans text-sm text-white/80">
              Access ai models right from Stamp!
              (Already There)
            </p>
          </div>
        </div>
      </div>

      <div
        className="scale-in group visible cursor-pointer"
        style={{ transform: 'transform: translateY(0px) scale(1)' }}
      >
        <div
          className="relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-800 p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl"
          style={{
            background:
              'url(https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&amp;q=80)',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="bar-chart"
                className="lucide lucide-bar-chart h-6 w-6 text-white"
              >
                <line x1="12" x2="12" y1="20" y2="10"></line>
                <line x1="18" x2="18" y1="20" y2="4"></line>
                <line x1="6" x2="6" y1="20" y2="16"></line>
              </svg>
            </div>
            <h3 className="mb-2 font-sans text-lg font-medium text-white">
              Mail
            </h3>
            <p className="mb-4 font-sans text-sm text-white/80">
              Check your mail right from the app!
              (Coming soon)
            </p>
            
          </div>
        </div>
      </div>

      <div
        className="scale-in group visible cursor-pointer"
        style={{ transform: 'transform: translateY(0px) scale(1)' }}
      >
        <div
          className="relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-800 p-6 shadow-lg transition-all duration-300 group-hover:scale-105 hover:shadow-xl"
          style={{
            background:
              'url(https://images.unsplash.com/photo-1635776063328-153b13e3c245?w=800&amp;q=80)',
            backgroundSize: 'cover',
          }}
        >
          <div className="relative">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="workflow"
                className="lucide lucide-workflow h-6 w-6 text-white"
              >
                <rect width="8" height="8" x="3" y="3" rx="2"></rect>
                <path d="M7 11v4a2 2 0 0 0 2 2h4"></path>
                <rect width="8" height="8" x="13" y="13" rx="2"></rect>
              </svg>
            </div>
            <h3 className="mb-2 font-sans text-lg font-medium text-white">
              Timetables
            </h3>
            <p className="mb-4 font-sans text-sm text-white/80">
              Plan your whole day out with stamp!
              (Not there yet)
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
