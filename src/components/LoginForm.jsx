

const LoginForm = () => {
    return (
        <form
            className="border-b border-[#3F3F3F] pb-10 lg:pb-15"
        >
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

            <div className="form-control">
                {/* Changed htmlFor to match the password ID */}
                <label className="auth-label" htmlFor="password">Password</label>
                <input
                    className="auth-input"
                    name="password"
                    type="password"
                    id="password"
                    required
                />
            </div>

            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;