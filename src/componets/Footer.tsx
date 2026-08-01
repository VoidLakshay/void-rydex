import React from 'react'

function Footer() {
  return (
    <footer className="w-full text-center py-4 text-sm text-gray-500 border-t border-black/10 mt-auto">
      &copy; {new Date().getFullYear()} RydeX. All rights reserved.
    </footer>
  )
}

export default Footer
