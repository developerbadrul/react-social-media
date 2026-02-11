import { useForm } from "react-hook-form";
import Field from "./Field";
import { publicApi } from "../apis/axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors, isSubmitting },
        getValues,
        setError,
        handleSubmit
    } = useForm({
        mode: "onTouched",
        shouldFocusError: true
    });

    const submitForm = async (data) => {
        const { confirmPassword, ...formData } = data;

        try {
            let response = await publicApi.post(`/auth/register`, formData);
            if (response?.status === 201) {
                navigate("/login")
            }

        } catch (error) {
            console.error(error);
            const message =
                error.response?.data?.message ||
                "Registration failed. Please try again.";

            setError("root.server", {
                type: "server",
                message,
            });
        }

    }

    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-7.5"
            onSubmit={handleSubmit(submitForm)}
            noValidate
        >
            {/* Name */}
            <Field label="First Name" error={errors.firstName}>
                <input
                    className={`auth-input ${errors.firstName ? "border-red-500" : ""}`}
                    type="text"
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
                    type="text"
                    placeholder="Enter Last Name"
                    id="lastName"
                    {...register('lastName', {
                        required: "Last Name is Required"
                    })}
                />
            </Field>

            {/* Email */}
            <Field label="Email" error={errors.email}>
                <input
                    className={`auth-input ${errors.email ? "border-red-500" : ""}`}
                    type="email"
                    placeholder="Enter Your Email"
                    id="email"
                    {...register('email', {
                        required: "Email is Required"
                    })}
                />
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password}>
                <input
                    className={`auth-input ${errors.password ? "border-red-500" : ""}`}
                    type="password"
                    placeholder="Enter Your Password"
                    id="password"
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
                    type="password"
                    placeholder="Enter Your Password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                        required: "Confirm Password is Required",
                        validate: (value) => value === getValues("password") || "Passwords do not match"
                    })}
                />
            </Field>

            {errors?.root?.server && (
                <p className="text-red-500 mt-2">
                    {errors.root.server.message}
                </p>
            )}

            <button
                className="auth-input bg-green-500 font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registering..." : "Register"}
            </button>
        </form>
    );
};

export default RegistrationForm;