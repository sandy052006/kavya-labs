import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero" aria-labelledby="hero-heading">
        <div className="hero-bg" aria-hidden="true">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="grid-overlay"></div>
        </div>

        <div className="hero-badge" id="hero-badge">
          <span className="badge-dot" aria-hidden="true"></span>
          <span>Seed round open &nbsp;·&nbsp; Now accepting waitlist</span>
        </div>

        <h1 className="hero-heading" id="hero-heading">
          Health intelligence<br />
          <span className="gradient-text">built for what&apos;s next</span>
        </h1>

        <p className="hero-subheading" id="hero-subheading">
          Kavya Labs turns fragmented clinical data into predictive insights —
          so providers can act before symptoms appear.
        </p>

        <div className="hero-actions" id="hero-actions">
          <Link href="#waitlist" className="btn btn-primary btn-lg" id="hero-primary-cta">
            <span>Join the waitlist</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="#features" className="btn btn-ghost btn-lg" id="hero-secondary-cta">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6.5 5.5L10.5 8 6.5 10.5V5.5z" fill="currentColor" />
            </svg>
            <span>See how it works</span>
          </Link>
        </div>

        {/* Trust bar */}
        <div className="trust-bar" id="trust-bar" aria-label="Social proof">
          <div className="trust-stat">
            <span><span className="trust-number">12</span><span className="trust-suffix">+</span></span>
            <span className="trust-label">Hospital partners</span>
          </div>
          <div className="trust-divider" aria-hidden="true"></div>
          <div className="trust-stat">
            <span><span className="trust-number">94</span><span className="trust-suffix">%</span></span>
            <span className="trust-label">Prediction accuracy</span>
          </div>
          <div className="trust-divider" aria-hidden="true"></div>
          <div className="trust-stat">
            <span><span className="trust-number">2</span><span className="trust-suffix">M+</span></span>
            <span className="trust-label">Patient records analyzed</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="hero-visual" id="hero-visual" aria-hidden="true">
          <div className="dashboard-card">
            <div className="dashboard-header">
              <div className="dashboard-dot red"></div>
              <div className="dashboard-dot yellow"></div>
              <div className="dashboard-dot green"></div>
              <span className="dashboard-title">Patient Risk Intelligence</span>
            </div>
            <div className="dashboard-body">
              <div className="chart-row">
                <span className="chart-label">Cardiac risk</span>
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ width: "23%", background: "#14b8a6" }}></div>
                </div>
                <span className="chart-val low">Low</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Readmission</span>
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ width: "61%", background: "#f59e0b" }}></div>
                </div>
                <span className="chart-val mid">Moderate</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Sepsis</span>
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ width: "8%", background: "#14b8a6" }}></div>
                </div>
                <span className="chart-val low">Low</span>
              </div>
              <div className="chart-row">
                <span className="chart-label">Deterioration</span>
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ width: "79%", background: "#ef4444" }}></div>
                </div>
                <span className="chart-val high">High</span>
              </div>
            </div>
            <div className="dashboard-alert">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" fill="#ef444422" stroke="#ef4444" strokeWidth="1" />
                <path d="M7 4v3M7 9.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Alert: Patient #4821 — escalation recommended</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works" id="how-it-works" aria-labelledby="hiw-heading">
        <div className="container">
          <div className="section-label">How it works</div>
          <h2 className="section-heading" id="hiw-heading">
            From data chaos to<br /><span className="gradient-text">clinical clarity</span>
          </h2>
          <div className="steps-row">
            <div className="step" id="step-1">
              <div className="step-num">01</div>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 10h16M4 14h10" stroke="url(#g1)" strokeWidth="1.5" strokeLinecap="round" />
                  <defs><linearGradient id="g1" x1="4" y1="6" x2="20" y2="14"><stop stopColor="#14b8a6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
                </svg>
              </div>
              <h3 className="step-title">Ingest</h3>
              <p className="step-desc">Connect EHRs, labs, imaging, and wearables via our FHIR-native API in minutes — no custom ETL.</p>
            </div>
            <div className="step-arrow" aria-hidden="true">
              <svg width="32" height="16" viewBox="0 0 32 16"><path d="M0 8h28M22 2l6 6-6 6" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" /></svg>
            </div>
            <div className="step" id="step-2">
              <div className="step-num">02</div>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="url(#g2)" strokeWidth="1.5" />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" />
                  <defs><linearGradient id="g2" x1="3" y1="3" x2="21" y2="21"><stop stopColor="#14b8a6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
                </svg>
              </div>
              <h3 className="step-title">Analyze</h3>
              <p className="step-desc">Our multimodal AI synthesizes every data point, surfacing patterns invisible to the human eye.</p>
            </div>
            <div className="step-arrow" aria-hidden="true">
              <svg width="32" height="16" viewBox="0 0 32 16"><path d="M0 8h28M22 2l6 6-6 6" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" /></svg>
            </div>
            <div className="step" id="step-3">
              <div className="step-num">03</div>
              <div className="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="url(#g3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="url(#g3)" strokeWidth="1.5" />
                  <defs><linearGradient id="g3" x1="2" y1="2" x2="22" y2="22"><stop stopColor="#14b8a6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
                </svg>
              </div>
              <h3 className="step-title">Act</h3>
              <p className="step-desc">Clinicians receive prioritized, explainable alerts — at the right time, in the right workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features" id="features" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-label">Features</div>
          <h2 className="section-heading" id="features-heading">
            Everything your team<br /><span className="gradient-text">needs to intervene earlier</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "56px", fontSize: "1.05rem" }}>
            Purpose-built for health systems that can&apos;t afford to react too late.
          </p>
          <div className="features-grid">
            {[
              { id: "feature-predictive", title: "Predictive Risk Scoring", desc: "Dynamic patient risk scores update in real time as new labs, vitals, and notes arrive — stratifying your census automatically.", tag: "Core AI Engine" },
              { id: "feature-ehr", title: "EHR-Native Integration", desc: "Plug into Epic, Cerner, Meditech and 40+ systems via FHIR R4. Zero disruption to existing workflows." },
              { id: "feature-explainability", title: "Explainable AI", desc: "Every prediction comes with plain-language rationale. Clinicians understand the why — not just the score." },
              { id: "feature-alerts", title: "Smart Alert Routing", desc: "Alerts go to the right person, at the right time — with priority tuned to reduce alarm fatigue by up to 60%." },
              { id: "feature-compliance", title: "HIPAA & SOC 2 Ready", desc: "End-to-end encryption, audit logs, and role-based access — compliance baked in, not bolted on." },
              { id: "feature-analytics", title: "Population Analytics", desc: "Zoom out from individual patients to your entire cohort. Identify systemic risk patterns and benchmark against peers.", tag: "Coming Q3", accent: true },
            ].map((f) => (
              <div key={f.id} className={`feature-card${f.accent ? " feature-card--accent" : ""}`} id={f.id}>
                <div className="feature-card-inner">
                  <div className="feature-icon-wrap">
                    <svg className="feature-icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="10" stroke="url(#fi-grad)" strokeWidth="1.5" />
                      <path d="M7 11l3 3 5-5" stroke="url(#fi-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <defs><linearGradient id="fi-grad" x1="1" y1="1" x2="21" y2="21"><stop stopColor="#14b8a6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
                    </svg>
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  {f.tag && <div className="feature-tag">{f.tag}</div>}
                </div>
                <div className="feature-card-glow" aria-hidden="true"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="social-proof" id="social-proof" aria-labelledby="sp-heading">
        <div className="container">
          <h2 className="section-heading sp-heading" id="sp-heading">
            &ldquo;Kavya Labs flagged a deteriorating patient<br />
            <span className="gradient-text">6 hours before our team noticed.&rdquo;</span>
          </h2>
          <div className="quote-meta">
            <div className="quote-avatar" aria-hidden="true">DR</div>
            <div>
              <div className="quote-name">Dr. Rohit Mehta</div>
              <div className="quote-role">Chief Medical Officer, Apollo Health Network</div>
            </div>
          </div>
          <div className="logos-row" aria-label="Partner logos">
            {["Apollo Health", "Medify Systems", "HealthBridge", "CliniqAI", "Vivante Medical"].map((name) => (
              <div key={name} className="logo-pill">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WAITLIST ===== */}
      <section className="waitlist" id="waitlist" aria-labelledby="waitlist-heading">
        <div className="container">
          <div className="waitlist-card">
            <div className="waitlist-blob" aria-hidden="true"></div>
            <div className="waitlist-content">
              <div className="section-label">Early access</div>
              <h2 className="waitlist-heading" id="waitlist-heading">
                Ready to see it<br /><span className="gradient-text">in your hospital?</span>
              </h2>
              <p className="waitlist-sub">
                Join 200+ healthcare leaders already on the waitlist. We&apos;re onboarding pilot partners in Q4 2026.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="footer" aria-label="Site footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link href="/" className="logo" aria-label="Kavya Labs home">
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f0f0ff" }}>
                  Kavya<span className="gradient-text">Labs</span>
                </span>
              </Link>
              <p className="footer-tagline">Health intelligence, reimagined.<br />Making the invisible, visible.</p>
              <div className="footer-social" aria-label="Social media links">
                {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                  <a key={s} href="#" className="social-link" aria-label={s}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-links-group">
              {[
                { title: "Product", links: ["Features", "Integrations", "Security", "Changelog"] },
                { title: "Company", links: ["About us", "Blog", "Careers", "Press kit"] },
                { title: "Resources", links: ["Documentation", "API reference", "Support", "Status"] },
                { title: "Legal", links: ["Privacy policy", "Terms of service", "HIPAA notice", "Cookie policy"] },
              ].map((col) => (
                <div key={col.title} className="footer-col">
                  <h4 className="footer-col-title">{col.title}</h4>
                  <ul className="footer-link-list">
                    {col.links.map((link) => (
                      <li key={link}><a href="#" className="footer-link">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">&copy; 2026 Kavya Labs, Inc. All rights reserved.</p>
            <p className="footer-copy">Bengaluru, India &amp; San Francisco, CA</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
