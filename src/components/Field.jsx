import { getChildId } from "../utils";

const Field = ({ children, label, htmlFor, error }) => {
    const id = htmlFor ?? getChildId(children)
    return (
        <div className="form-control">
            {label && id && <label className="auth-label" htmlFor={id}>{label}</label>}
            {children}
            {error && <div className="text-red-500">{error.message}</div>}
        </div>
    );
};

export default Field;