import { useState } from "react";
import { adminLogin } from "../api/index";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await adminLogin(password);
      onSuccess();
    } catch {
      setError("Wrong password, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-180px", left: "-140px",
          width: "460px", height: "460px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,184,214,0.38), rgba(247,184,214,0) 70%)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%", right: "-180px",
          width: "520px", height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(185,167,245,0.30), rgba(185,167,245,0) 72%)",
          pointerEvents: "none"
        }}
      />
      <div className="login-card">
        <div className="lock-icon" />
        <h2 className="login-title">just for Josh</h2>
        <p className="login-sub">enter your secret password to read the memories</p>
        <input
          type="password"
          className="pw-input"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
        />
        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "opening..." : "open the slam book"}
        </button>
        {error && <p className="pw-err">{error}</p>}
      </div>
    </div>
  );
}