import "./LoginForm.css";

export default function LoginForm() {
    return (
        <>
            <div className="login-form-container">
                <div className="login-form">
                     <form>
                        <label className="login-form-label">Pseudo
                            <br></br>
                            <input type="text" placeholder="Value" className="login-form-field" />
                        </label>
                                                    <br></br>
                        <label className="login-form-label">Email
                            <br></br>
                            <input type="email" placeholder="Value" className="login-form-field" />
                        </label>
                                                    <br></br>
                        <label className="login-form-label">Mot de passe
                            <br></br>
                            <input type="password" placeholder="Value" className="login-form-field" />
                        </label>
                                                    <br></br>
                        <label className="login-form-label">Confirmer le mot de passe
                            <br></br>
                            <input type="password" placeholder="Value" className="login-form-field" />
                        </label>
                        <button type="submit">Se connecter</button>
                    </form>
                </div>
            </div>
        </>
    )
}