import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const res = await auth.signup({ name, email, password });
    if (res.ok) {
      history.push("/");
    } else {
      setError(res.error || "Signup failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create account — Akash</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-danger">{error}</div>}
        <button className="btn btn-success mt-2" type="submit">Create account</button>
      </form>
    </div>
  );
}
