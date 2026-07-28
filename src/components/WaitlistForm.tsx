"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Simulate API call — wire to real backend in Week 3
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    console.log("[Kavya Labs] Waitlist signup:", email);
  };

  if (status === "success") {
    return (
      <div style={{ marginTop: "8px" }}>
        <p style={{ color: "#14b8a6", fontSize: "1rem", fontWeight: 600 }}>
          🎉 You&apos;re on the list! We&apos;ll be in touch soon.
        </p>
        <p style={{ color: "#5c5c7a", fontSize: "0.8rem", marginTop: "6px" }}>
          Confirmation sent to <strong style={{ color: "#9898b8" }}>{email}</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <input
          type="email"
          className="form-input"
          placeholder="Work email address"
          aria-label="Work email address"
          id="waitlist-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          style={status === "error" ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.12)" } : {}}
          required
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          id="waitlist-submit"
          disabled={status === "loading"}
          style={{ minWidth: "148px", position: "relative" }}
        >
          {status === "loading" ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: "14px", height: "14px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTop: "2px solid #fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "spin 0.7s linear infinite"
              }} />
              Submitting…
            </span>
          ) : "Request access"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "8px" }}>
          Please enter a valid email address.
        </p>
      )}
      {status === "idle" && (
        <p className="form-fine">No spam. No credit card. Just early access.</p>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
