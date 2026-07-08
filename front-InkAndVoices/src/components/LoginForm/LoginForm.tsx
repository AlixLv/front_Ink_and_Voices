import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./LoginForm.css";
// import { useNavigate } from "react-router-dom";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
        // const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
                        // navigate("/");  // ← Rediriger vers home après login
        alert("Connecté!");  //

        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    return (
        <>
            <div className="login-form-container">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <label className="login-form-label">Email
                            <br></br>
                            <input 
                                type="email" 
                                placeholder="Value" 
                                className="login-form-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <label className="login-form-label">Mot de passe
                            <br></br>
                            <input 
                                type="password" 
                                placeholder="Value" 
                                className="login-form-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br></br>
                        <button type="submit">Se connecter</button>
                    </form>
                </div>
            </div>
        </>
    )
}