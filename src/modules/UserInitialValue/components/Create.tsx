







import FormikEmptyModal from '@/components/form-components/FormikEmptyModal';
import { useEffect } from 'react';
import { MdOutlineAddCircleOutline, MdOutlineCloseFullscreen } from 'react-icons/md';
import { useUserInitialValueContext } from '../context/features/useUserInitialValueContext';
import EntryForm from './EntryForm';

const Create = () => {
  const { entryMode, setAction, isModalOpen, setModalOpen } = useUserInitialValueContext();

  const handleModalClose = () => {
    setModalOpen(false)
  }
  useEffect(() => {
       setAction('create')
     },[])
  return (

    <>

      <button onClick={() => setModalOpen(true)}
        className="       cursor-pointer absolute md:relative  ">

        <MdOutlineAddCircleOutline className='text-5xl text-teal-600 cursor-pointer
                        transition-all duration-500 ease-in-out
                        active:text-teal-300 active:scale-150
                         hover:text-teal-800' />
      </button>
      {isModalOpen &&
        <FormikEmptyModal isModalOpen={isModalOpen} variant={'semi'}  >
          <div className='w-full 
          grid grid-rows-[50px_1fr]  '>

            <div className=' py-1 px-2  h-[50px]'>
              <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-1' >
                <div className='text-xl font-bold' >
                  <div>Add UserInitialValue</div>
                </div>
                <button onClick={handleModalClose} type="button"
                  className='rounded-full p-2
                  bg-slate-50/5 text-orange-500 cursor-pointer
                  hover:text-yellow-500 hover:bg-slate-600
                  active:text-orange-600 active:touch-pinch-zoom '>
                  <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                </button>
              </div>
            </div>

            <EntryForm
              handleModalClose={handleModalClose}  />

          </div >
        </FormikEmptyModal>

      }
    </>

  )
}


export default Create