import { Loader } from "lucide-react"
import { Button } from "../ui/button"

export const FormikSubmit = (
    { formik, label, btnColor = `bg-primary`, ...props }
) => {

    return (
        <>

            <Button type="submit"
                {...props}
                className={`btn bg-primary btn-wide text-center motion-preset-expand   btn cursor-pointer  ${btnColor} 
                flex flex-row flex-nowrap  gap-2 text-nowrap justify-center items-center px-10
                max-w-max
                text-zinc-300
                 ${props.className}`}>

                {formik.isSubmitting && <Loader className="animate-spin" />}

                {
                    props.disabled ?
                        <Loader className="animate-spin" />
                        :
                        label
                }


            </Button>
        </>

    )
}