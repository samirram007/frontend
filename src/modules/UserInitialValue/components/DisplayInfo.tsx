import { useUserprofile } from "@/modules/User/hooks/useUserProfile"
import { RiNodeTree } from "react-icons/ri"

const DisplayInfo = () => {
const comment="Button is placed besides Create Button"

  return (
    <>

      {/* <MenuContextProvider>
      </MenuContextProvider> */}
        {/* <ModalContent /> */}
        <DisplayInfoButton />
    </>
  )
}

export default DisplayInfo
const DisplayInfoButton = () => {
  const thisData = useUserprofile()
  // const { setUserData, setSelectedMenu, setModalOpen } = useMenuContext()

  const handleModalOpen = () => {
    //console.log( thisData?.data?.data)
    // setUserData(thisData?.data?.data?.data)
    // setSelectedMenu('Team')
    // setModalOpen(true)
  }
  return (
    <>
      <button onClick={handleModalOpen}
        className="  mr-15 md:mr-2      cursor-pointer absolute md:relative mx-2 ">
        <div className="border-4 border-teal-600 active:text-teal-300 active:scale-110
                            hover:text-teal-100 rounded-full p-1">

          <RiNodeTree className='text-2xl font-bold text-teal-600 cursor-pointer
                            transition-all duration-500 ease-in-out
                            active:text-teal-300 active:scale-150
                            hover:text-teal-800' />
        </div>
      </button>
    </>
  )
}