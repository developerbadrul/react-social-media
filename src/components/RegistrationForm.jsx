import { useForm } from "react-hook-form";
import Field from "./Field";
import { publicApi } from "../apis/axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        setError,
        handleSubmit
    } = useForm();

    const submitForm = async (data) => {
        const { confirmPassword, ...formData } = data;

        try {
            let response = await publicApi.post(`/auth/register`, formData);
            if (response?.status === 201) {
                navigate("/login")
            }

        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error.message}`,
            });
        }

    }

    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-7.5"
            onSubmit={handleSubmit(submitForm)}
        >
            {/* Name */}
            <Field label="First Name" error={errors.firstName}>
                <input
                    className={`auth-input ${errors.firstName ? "border-red-500" : ""}`}
                    name="name" type="text"
                    placeholder="Enter Your First Name"
                    id="firstName"
                    {...register('firstName', {
                        required: "First Name is Required"
                    })}
                />
            </Field>

            <Field label="Last Name" error={errors.lastName}>
                <input
                    className={`auth-input ${errors.lastName ? "border-red-500" : ""}`}
                    name="name" type="text"
                    placeholder="Enter Last Name"
                    id="firstName"
                    {...register('lastName', {
                        required: "Last Name is Required"
                    })}
                />
            </Field>

            {/* Email */}
            <Field label="Email" error={errors.email}>
                <input
                    className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                    name="name" type="email"
                    placeholder="Enter Your Email"
                    id="firstName"
                    {...register('email', {
                        required: "Email is Required"
                    })}
                />
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password}>
                <input
                    className={`auth-input ${errors.password ? "border-red-500" : ""}`}
                    name="name" type="password"
                    placeholder="Enter Your Password"
                    id="firstName"
                    {...register('password', {
                        required: "Password is Required",
                        minLength: { value: 8, message: "Password must be at least 8 characters" }
                    })}
                />
            </Field>

            {/* Confirm Password */}

            <Field label="Retype Password" error={errors.confirmPassword}>
                <input
                    className={`auth-input ${errors.confirmPassword ? "border-red-500" : ""}`}
                    name="name" type="password"
                    placeholder="Enter Your Password"
                    id="firstName"
                    {...register('confirmPassword', {
                        required: "Confirm Password is Required",
                        validate: (value, formValues) => value === formValues.password || "Passwords do not match"
                    })}
                />
            </Field>

            <p className="text-red-500">{errors?.root?.random?.message}</p>

            <button
                className="auth-input bg-green-500 font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;