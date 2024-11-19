import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './components/NavBar'

function App() {
  const [searchStr, setSearchStr] = useState('')

  return (
    <>
      <NavBar searchStr={searchStr} setSearchStr={setSearchStr} />
      <main className="container">
        <Outlet context={{ searchStr }} />
      </main>
    </>
  )
}

export default App
