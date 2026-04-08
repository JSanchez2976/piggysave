import { useEffect, useState } from "react"
import Auth from "./components/Auth/Auth"
import Splash from "./components/Splash"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer);
  },[])

  if(loading) return <Splash/>

  return <Auth/>
}

export default App