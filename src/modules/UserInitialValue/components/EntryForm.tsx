
import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useUserInitialValueContext } from '../context/features/useUserInitialValueContext';



const validationSchema = Yup.object().shape({
    key: Yup.string()
        .required("key is required"),
    value: Yup.string()
        .required("value is required"),

})



const EntryForm = () => {
    const { selectedUserInitialValue: data, action } = useUserInitialValueContext()

    return (
        data &&
            (action === 'delete') ?
            <DeleteForm />
            :
            <FormikForm />
    )

}

export default EntryForm

const FormikForm = () => {

    const { selectedUserInitialValue: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useUserInitialValueContext()
    const [isScrollable, setIsScrollable] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollableDivRef = useRef(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // setIsProcessing(true)
            handleMutation(values)
                .then(() => {
                    console.log('hello...')
                    setModalOpen(false)
                })
                .finally(() => {

                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false); 
                    });

                }, 1000);
        }
    })

     

    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">
            

            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                <div   className="flex-1 overflow-y-auto grid grid-rows-auto gap-4">
                    <div className=" flex flex-col gap-4 max-h-80 w-full px-4 mx-auto"> 
                        <FormikInputBox semi={true} formik={formik} name="key" label="Key" />

                        <FormikInputBox semi={true} formik={formik} name="value" label="Value" />

                       
                    </div>
                </div>

                {/* Fixed Footer with Save Button */}
                <div className="flex justify-center items-center sticky bottom-0 
            border-t-6 border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                    <div className="flex gap-2 items-center text-red-600">
                        {action === "delete" && "Are your sure you want to delete this entry?"}
                    </div>
                    <Button type="submit" className="btn bg-primary btn-wide flex items-center gap-2" disabled={formik.isSubmitting}>
                        {formik.isSubmitting && (
                            <Loader className="w-6 h-6 ml-n2 animate-spin" />

                        )}
                        {action === "delete" ? "Delete" : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
const DeleteForm = () => {

    const { selectedUserInitialValue: initialValues,
        entryMode, action,
        handleMutation, setModalOpen } = useUserInitialValueContext()
    const [isScrollable, setIsScrollable] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollableDivRef = useRef(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            // setIsProcessing(true)
            handleMutation(values)
                .then(() => {
                    setModalOpen(false)
                })
                .finally(() => {

                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        console.log('hello... finally')
                    });

                }, 1000);
        }
    })

    const handleScroll = () => {
        if (scrollableDivRef.current) {
            const { scrollTop } = scrollableDivRef.current;
            setIsScrolled(scrollTop > 0); // Check if scrolled
        }
    };

    useEffect(() => {
        const checkScrollable = () => {
            if (scrollableDivRef.current) {
                const { scrollHeight, clientHeight } = scrollableDivRef.current;
                setIsScrollable(scrollHeight > clientHeight); // Check if content is scrollable
            }
        };
        checkScrollable();
        window.addEventListener('resize', checkScrollable); // Re-check on resize
        return () => window.removeEventListener('resize', checkScrollable);
    }, []);


    return (
        <div className="grid grid-rows-[1fr] h-full max-h-full relative">


            <form onSubmit={formik.handleSubmit} className="flex flex-col h-full ">
                {/* Scrollable Content */}

                <div ref={scrollableDivRef}
                    onScroll={handleScroll} className="flex-1 overflow-y-auto grid grid-rows-auto gap-4">

                </div>

                {/* Fixed Footer with Save Button */}
                <div className="flex flex-col gap-4 justify-center items-center sticky bottom-0 
              border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                    <div className="flex gap-2 text-xl items-start
                     text-red-600 dark:text-red-400 px-4 justify-center text-center">
                        {action === "delete" && ' Are you absolutely sure you want to permanently delete this record? This action is irreversible and cannot be undone. '}
                    </div>
                    <div className="flex flex-row gap-4 border-t-2 border-blue-300/50 dark:border-blue-300/20 py-4 px-4 mt-2">
                        <Button type="submit" className="btn bg-red-400 dark:bg-red-500 btn-wide flex items-center gap-2" disabled={formik.isSubmitting}>
                            {formik.isSubmitting && (
                                <Loader className="w-6 h-6 ml-n2 animate-spin" />

                            )}
                            {action === "delete" ? "Delete" : "Save"}
                        </Button>
                        <Button type="button" 
                        onClick={()=>setModalOpen(false)} className="btn bg-background btn-wide flex items-center gap-2"  >
                            {"Cancel"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}