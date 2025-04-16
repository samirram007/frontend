import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/modules/auth/contexts/features/useAuth'
import React from 'react'



const Dashboard: React.FC<{}> = () => {
    const { logout, fetchProfile } = useAuth()
    return (
        <div>

            <p>Dashboard</p>
            <ThemeToggle />
            <Button onClick={logout} className="self-center w-full py-3 font-bold text-white transition-all rounded-lg bg-red-600 hover:bg-red-700">
                Logout
            </Button>
            <Button onClick={fetchProfile} className="
                    self-center w-full py-3 font-bold text-white transition-all rounded-lg bg-green-600 hover:bg-green-700">
                profile
            </Button>
        </div>
    )
}

export default Dashboard