import { FormikInputBox } from "@/components/form-components/FormikInputBox"
import { FormikSubmit } from "@/components/form-components/FormikSubmit"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FormikHelpers, useFormik } from "formik"
import { Axe, LogIn } from "lucide-react"
import React from "react"
import * as Yup from "yup"
import { LoginProps } from "../contexts/AuthContextProvider"
import { useAuth } from "../contexts/features/useAuth"
const validationSchema = Yup.object().shape({
    password: Yup.string().required("password field is required"),
    email: Yup.string().required("email is required"),
});
export default function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const { login, logout, fetchProfile } = useAuth()
    const formik = useFormik<LoginProps>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (
            values: LoginProps,
            formikHelpers: FormikHelpers<LoginProps>
        ) => {
            try {
                formikHelpers.setSubmitting(true);
                await login(values); // no need for `as LoginProps`, already typed
                console.log("Submitting login");
            } finally {
                formikHelpers.setSubmitting(false);
            }
        },
    });
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>

                    <CardTitle><div className="flex items-center gap-2.5 justify-start"><LogIn />  <Axe />Login to your account</div></CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit} className="grid gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <FormikInputBox
                                    formik={formik}
                                    semi
                                    type={"text"}
                                    extClass={"align-self-right"}
                                    name="email"
                                    label="User Id or Email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="grid gap-3">

                                <FormikInputBox
                                    formik={formik}
                                    semi
                                    type={"password"}
                                    extClass={"align-self-right"}
                                    name="password"
                                    label="Password"
                                    placeholder={"Enter your password"}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                {/* <Button type="submit" className="w-full">
                                    Login
                                </Button> */}
                                <FormikSubmit
                                    formik={formik}
                                    btnColor=""
                                    label="Login"
                                    className="self-center w-full py-3 font-bold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:ring-4 active:ring-blue-300/20 focus:bg-blue-600 active:text-white "
                                />

                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>

                    </form>
                </CardContent>
                {/* <Button onPress={logout} className="self-center w-full py-3 font-bold text-white transition-all rounded-lg bg-red-600 hover:bg-red-700">
                    Logout
                </Button>
                <Button onPress={fetchProfile} className="
                    self-center w-full py-3 font-bold text-white transition-all rounded-lg bg-green-600 hover:bg-green-700">
                    profile
                </Button> */}
            </Card>
        </div>
    )
}
