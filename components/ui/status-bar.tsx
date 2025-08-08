export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      <span className="text-sm font-medium">9:41</span>
      <div className="flex items-center space-x-1">
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
        </div>
        <div className="ml-2">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M2 3C2 1.89543 2.89543 1 4 1H14C15.1046 1 16 1.89543 16 3V9C16 10.1046 15.1046 11 14 11H4C2.89543 11 2 10.1046 2 9V3Z" stroke="black" strokeWidth="1"/>
            <path d="M16 4H17C17.5523 4 18 4.44772 18 5V7C18 7.55228 17.5523 8 17 8H16" stroke="black" strokeWidth="1"/>
          </svg>
        </div>
        <div className="w-6 h-3 bg-black rounded-sm"></div>
      </div>
    </div>
  )
}
