import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import './App.css'

type User = { id: number; email: string /*…other fields*/ }

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch(import.meta.env.VITE_API_PROXY_URL+'api/users')
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error)
  }, [])

  return (
    <>
      <div>
        <h1>Users</h1>
        {users.map(u => (
          <div key={u.id}>{u.email}</div>
        ))}
      </div>

      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>

    </>
  )
}

export default App
