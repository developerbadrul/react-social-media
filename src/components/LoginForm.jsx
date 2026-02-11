import { useForm } from "react-hook-form";
import Field from "./Field";
import { publicApi } from "../apis/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm(
        {
            defaultValues: {
                email: "saadh392@mail.com",
                password: "bestPassw0rd"
            }
        });

    const onSubmit = async (formData) => {
        // console.log(formData);

        try {
            const response = await publicApi.post('/auth/login', formData)
            // console.log(response);

            if (response.status !== 200) {
                throw new Error("Server Down")
            }

            if (response.status === 200) {
                const { token, user } = response.data;

                if (token) {
                    const authToken = token.token;
                    const refreshToken = token.refreshToken;

                    console.log("login time auth token", authToken);
                    setAuth({ user, authToken, refreshToken });

                    navigate('/');
                }
            }

        } catch (error) {
            // console.log(error.message);
            setError('root.random', {
                type: 'random',
                message: `Server Message:  ${error?.message}`
            })
        }
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
            <p className="text-red-500">{errors?.root?.random?.message}</p>
            <Field>
                <button
                    className="auth-input bg-green-500 font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Loging.........." : "Login"}
                </button>
            </Field>
        </form>
    );
};

export default LoginForm;