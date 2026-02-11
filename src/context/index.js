import { createContext } from "react"

const AuthContext = createContext(null);
const ProfileContext = createContext(null);
const PostContext = createContext(null);

export { AuthContext, ProfileContext, PostContext }