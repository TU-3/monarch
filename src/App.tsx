import { Button } from "@/components/ui/button"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm';
import { users } from './db/schema'

const connectionString = import.meta.env.VITE_DATABASE_URL;
console.log("Connection String: ", connectionString);

const db = drizzle(connectionString); //Disable prefetch as it is not supported for "Transaction" pool mode

// const allUsers = await db.select().from(users);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* <p>
        <h1>All Users</h1>
        {allUsers ? allUsers.map((user) => <div key={user.id}>{user.email}</div>) : "Loading..."}
      </p> */}
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
