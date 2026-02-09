import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="ui-page" aria-label="Not found">
      <div className="ui-card" style={{ padding: "var(--space-6)" }}>
        <h1 className="ui-h1">Page not found</h1>
        <p className="ui-subtitle">The page you’re looking for doesn’t exist.</p>
        <div style={{ marginTop: "var(--space-4)" }}>
          <Link to="/purchases/retail" className="ui-btn ui-btn--primary">
            Go to Purchases
          </Link>
        </div>
      </div>
    </main>
  );
}
