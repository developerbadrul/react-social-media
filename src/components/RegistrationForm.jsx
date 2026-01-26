
const RegistrationForm = () => {
    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-7.5"
        >
            {/* Name */}
            <div className="form-control">
                <label className="auth-label" htmlFor="name">Name</label>
                <input className="auth-input" name="name" type="text" id="name" required />
            </div>

            {/* Email */}
            <div className="form-control">
                <label className="auth-label" htmlFor="email">Email</label>
                <input
                    className="auth-input"
                    name="email"
                    type="email"
                    id="email"
                    required
                />
            </div>

            {/* Password */}
            <div className="form-control">
                <label className="auth-label" htmlFor="password">Password</label>
                <input
                    className="auth-input"
                    name="password"
                    type="password"
                    id="password"
                    required
                />
            </div>

            {/* Confirm Password */}
            <div className="form-control">
                <label className="auth-label" htmlFor="confirmPassword">Retype Password</label>
                <input
                    className="auth-input"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    required
                />
            </div>

            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;