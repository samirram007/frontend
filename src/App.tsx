import { Suspense } from "react"

import LoginForm from "./modules/auth/components/LoginForm"
import { useAuth } from "./modules/auth/contexts/features/useAuth"



function App() {
  const { user } = useAuth()
  return (

    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {user ?
          <Suspense fallback={<div>Loading...</div>}>

            <div className="text-center">
              <div className="text-center">Welcome, {user.name}</div>
              <div className="text-center">Email: {user.email}</div>
              <div className="text-center">Role: {user.role}</div>
              <div className="text-center">ID: {user.id}</div>
            </div>
          </Suspense>
          :
          <LoginForm />
        }
      </div>
    </div>
  )
}

export default App
