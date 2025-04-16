import { Suspense, useEffect, useState } from "react";



import { Progress } from "./components/ui/progress";
import { AppContextProviders } from "./core/contexts/AppContextProvider";
import { useAuth } from "./modules/auth/contexts/features/useAuth";
import GuestRouter from "./router/GuestRouter";
import PrivateRouter from "./router/PrivateRouter";

const PlayGround = () => {
  const { user, isLoading } = useAuth();


  if (isLoading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      {user ?
        <AppContextProviders><PrivateRouter /></AppContextProviders>
        :
        <GuestRouter />}
    </Suspense>
  );
};

export default PlayGround

const PageLoader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="h-dvh flex justify-center items-start">
      <Progress value={progress} className="w-dvw bg-blue-600-400  h-1" />

      {/* <span className="animate-ping ">
        <span className="animate-pulse">
          <Loader2 className="animate-spin text-4xl" />
        </span>
      </span> */}
    </div>
  )
}