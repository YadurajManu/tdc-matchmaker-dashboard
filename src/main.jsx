import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Briefcase, HeartHandshake, Mail, MapPin, Search, Send, UserRoundCheck } from "lucide-react";
import { customers, matchPool } from "./data.js";
import { rankedMatches } from "./matchEngine.js";
import "./styles.css";

const credentials = { username: "yaduraj", password: "tdc123" };

function money(value) {
  return `₹${(value / 100000).toFixed(1)} LPA`;
}

function years(profile) {
  return `${profile.age} yrs`;
}

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (form.username === credentials.username && form.password === credentials.password) {
      onLogin();
      return;
    }
    setError("Use yaduraj / tdc123 for the assignment demo.");
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="brand-mark">TDC</div>
        <h1>Matchmaker Dashboard</h1>
        <p>Internal workspace for verified biodata, journey tracking, and curated introductions.</p>
        <form onSubmit={submit}>
          <label>
            Username
            <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} autoComplete="username" />
          </label>
          <label>
            Password
            <input value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} type="password" autoComplete="current-password" />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit">Sign in</button>
        </form>
        <span className="demo-creds">Sample login: yaduraj / tdc123</span>
      </section>
    </main>
  );
}

function Field({ label, value }) {
  return (
    <div className="field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CustomerList({ selected, onSelect }) {
  const [query, setQuery] = useState("");
  const filtered = customers.filter((customer) => `${customer.firstName} ${customer.lastName} ${customer.city} ${customer.statusTag}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <h2>Customers</h2>
        <span>{filtered.length} assigned</span>
      </div>
      <label className="search">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search assigned clients" />
      </label>
      <div className="customer-list">
        {filtered.map((customer) => (
          <button className={selected.id === customer.id ? "customer active" : "customer"} key={customer.id} onClick={() => onSelect(customer)} aria-pressed={selected.id === customer.id}>
            <span>
              <strong>{customer.firstName} {customer.lastName}</strong>
              <small>{years(customer)} · {customer.city} · {customer.maritalStatus}</small>
            </span>
            <em>{customer.statusTag}</em>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ProfileDetail({ customer, note, setNote }) {
  return (
    <section className="profile">
      <div className="section-title">
        <span><UserRoundCheck size={18} /> Verified biodata</span>
        <em>{customer.statusTag}</em>
      </div>
      <div className="profile-hero">
        <div>
          <h2>{customer.firstName} {customer.lastName}</h2>
          <p>{customer.designation} at {customer.currentCompany}</p>
        </div>
        <div className="hero-meta">
          <span><MapPin size={15} /> {customer.city}</span>
          <span><Briefcase size={15} /> {money(customer.income)}</span>
        </div>
      </div>
      <div className="field-grid">
        <Field label="Gender" value={customer.gender} />
        <Field label="Date of Birth" value={customer.dateOfBirth} />
        <Field label="Country / City" value={`${customer.country}, ${customer.city}`} />
        <Field label="Height" value={`${customer.heightCm} cm`} />
        <Field label="Email" value={customer.email} />
        <Field label="Phone" value={customer.phone} />
        <Field label="College" value={customer.undergraduateCollege} />
        <Field label="Degree" value={customer.degree} />
        <Field label="Company" value={customer.currentCompany} />
        <Field label="Designation" value={customer.designation} />
        <Field label="Marital Status" value={customer.maritalStatus} />
        <Field label="Languages" value={customer.languagesKnown.join(", ")} />
        <Field label="Siblings" value={customer.siblings} />
        <Field label="Caste / Religion" value={`${customer.caste}, ${customer.religion}`} />
        <Field label="Want Kids" value={customer.wantKids} />
        <Field label="Open to Relocate" value={customer.openToRelocate} />
        <Field label="Open to Pets" value={customer.openToPets} />
        <Field label="Diet" value={customer.diet} />
        <Field label="Family Type" value={customer.familyType} />
        <Field label="Manglik" value={customer.manglik} />
        <Field label="Values" value={customer.values.join(", ")} />
        <Field label="Interest" value={customer.interests} />
      </div>
      <label className="notes">
        Matchmaker notes
        <textarea value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
    </section>
  );
}

function MatchCard({ candidate, onSend }) {
  return (
    <article className="match-card">
      <div className="score">
        <strong>{candidate.match.score}</strong>
        <span>FIT SCORE</span>
      </div>
      <div className="match-main">
        <h3>{candidate.firstName} {candidate.lastName}</h3>
        <p>{years(candidate)} · {candidate.city} · {candidate.designation}</p>
        <span className="match-label">{candidate.match.label}</span>
        <div className="chips">
          {candidate.match.reasons.map((reason) => <span key={reason}>{reason}</span>)}
        </div>
      </div>
      <button className="icon-button" onClick={() => onSend(candidate)} aria-label={`Send match for ${candidate.firstName}`} title={`Send ${candidate.firstName}'s profile`}>
        <Send size={18} />
      </button>
    </article>
  );
}

function Dashboard() {
  const [selected, setSelected] = useState(customers[0]);
  const [notes, setNotes] = useState(Object.fromEntries(customers.map((customer) => [customer.id, customer.matchmakerNotes])));
  const [sentMatch, setSentMatch] = useState(null);
  const matches = useMemo(() => rankedMatches(selected, matchPool, 8), [selected]);

  return (
    <main className="app-shell">
      <CustomerList selected={selected} onSelect={setSelected} />
      <div className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">The Date Crew</span>
            <h1>Matchmaker Workbench</h1>
          </div>
          <div className="pool-count"><HeartHandshake size={18} /> {matchPool.length} profiles in pool</div>
        </header>
        <div className="content-grid">
          <ProfileDetail customer={selected} note={notes[selected.id]} setNote={(value) => setNotes({ ...notes, [selected.id]: value })} />
          <section className="matches">
            <div className="section-title">
              <span><HeartHandshake size={18} /> Suggested matches</span>
              <em>{matches.length} shortlisted</em>
            </div>
            {matches.map((candidate) => <MatchCard key={candidate.id} candidate={candidate} onSend={setSentMatch} />)}
          </section>
        </div>
      </div>
      {sentMatch && (
        <div className="modal" role="dialog" aria-modal="true">
          <section className="modal-card">
            <Mail size={24} />
            <h2>Mock email ready</h2>
            <p>
              Sending {sentMatch.firstName} {sentMatch.lastName}'s profile to {selected.firstName} with:
            </p>
            <blockquote>{sentMatch.match.intro}</blockquote>
            <button onClick={() => setSentMatch(null)}>Done</button>
          </section>
        </div>
      )}
    </main>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />;
}

createRoot(document.getElementById("root")).render(<App />);
