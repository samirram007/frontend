

import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

import { Outlet } from "react-router";

const DefaultLayout = () => {

    // console.log("DefaultLayout context", context);



    return (
        <div className="">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="max-w-screen w-full relative flex  h-screen overflow-hidden ">
                {/* <!-- ===== Sidebar Start ===== --> */}
                {/* <Sidebar /> */}
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">


                        {/* <Header /> */}
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main className="">
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                <Suspense fallback={<Toaster />}>
                                    <Outlet />
                                </Suspense>

                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                        {/* <Footer /> */}
                    </div>
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
}

export default DefaultLayout