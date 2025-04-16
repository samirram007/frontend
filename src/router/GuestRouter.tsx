

import GuestLayout from '@/core/layouts/GuestLayout'
import { Login } from '@/modules/auth'




import { Navigate, Route, Routes } from 'react-router'

const GuestRouter: React.FC<{}> = () => {
  return (
    <Routes>

      <Route path="/" element={<GuestLayout />} >


        {/* <Route index element={<Landing />} /> */}
        <Route index element={<Navigate to="/login" />} />
        {/* <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book" element={<HotelBooking />} /> */}

        <Route path="/login" element={
          <>
            <Login />
          </>
        }
        />
        <Route path="/register" element={
          <>

            {/* <Register /> */}
          </>
        }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default GuestRouter