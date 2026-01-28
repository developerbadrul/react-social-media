import { useForm } from "react-hook-form";
import Field from "./Field";


const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                email: "saadh392@mail.com",
                password: "bestPassw0rd"
            }
        });

    const onSubmit = (data) => {
        console.log(data);
        
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-b border-[#3F3F3F] pb-10 lg:pb-15"
        >

            <Field label="Email" error={errors.email}>
                <input
                    {...register("email", {
                        required: "Email is Required"
                    })}
                    className="auth-input"
                    type="email"
                    id="email"
                />
            </Field>

            <Field label="Password" error={errors.password}>
                <input
                    {...register("password", {
                        required: "Password is Required",
                        minLength: { value: 8, message: "Your password must be at least 8 characters." }
                    })}
                    className="auth-input"
                    type="password"
                    id="password"
                />
            </Field>

            <Field>
                <button
                    className="auth-input bg-green-500 font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    );
};

export default LoginForm;