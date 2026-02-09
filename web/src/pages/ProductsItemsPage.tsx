import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Tabs } from "../components/Tabs";
import { useNotice } from "../components/NoticeCenter";
import { IconSparkle } from "../components/icons";

const departments = ["Grocery", "Deli", "Bakery", "Beverages"];
const categories = ["Snacks", "Dairy", "Produce", "Frozen"];
const priceGroups = ["Group A", "Group B", "Group C"];

function makeDraftSuggestion(name: string, category: string) {
  const templates = [
    `${name} (${category}) sourced fresh, optimized for shelf life and margin. Include storage temp and rotation notes.`,
    `${name} for daily retail; highlight origin, primary ingredients, allergen flags, and suggested upsell pairings.`,
    `${name}: concise POS-friendly copy with unit size, case qty, handling instructions, and promo eligibility.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

export function ProductsItemsPage() {
  const [activeTab, setActiveTab] = useState("item");
  const [itemName, setItemName] = useState("Yumi Ice Cream Bar");
  const [department, setDepartment] = useState(departments[0]);
  const [category, setCategory] = useState(categories[0]);
  const [priceGroup, setPriceGroup] = useState(priceGroups[0]);
  const [description, setDescription] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const { push } = useNotice();

  const summary = useMemo(() => {
    return {
      itemName,
      department,
      category,
      priceGroup,
      description,
    };
  }, [category, department, description, itemName, priceGroup]);

  function handleSave() {
    push({ tone: "success", title: "Item saved", message: "Item details stored locally (demo)." });
  }

  function runAssist() {
    setAiBusy(true);
    window.setTimeout(() => {
      const draft = makeDraftSuggestion(itemName || "New Item", category);
      setDescription(draft);
      setAiBusy(false);
      push({ tone: "info", title: "Draft ready", message: "Generated a suggested description. Adjust as needed." });
    }, 900);
  }

  return (
    <main className="ui-page" aria-label="Products">
      <PageHeader title="Products · Items" subtitle="Enterprise item entry with AI-assisted description drafting." actions={null} />

      <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
        <Tabs
          label="Item sections"
          activeId={activeTab}
          onChange={setActiveTab}
          items={[
            { id: "item", label: "Item" },
            { id: "price", label: "Price" },
            { id: "pos", label: "POS Details" },
          ]}
        />
      </div>

      <section style={{ marginTop: "var(--space-4)" }} className="ui-section" aria-label="Item Details">
        <div className="ui-section-header">
          <div className="ui-section-title">Item Details</div>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <button type="button" className="ui-btn ui-btn--secondary" onClick={() => push({ tone: "info", title: "Autosave", message: "Autosave is simulated in this demo." })}>
              Autosave
            </button>
            <button type="button" className="ui-btn ui-btn--primary" onClick={handleSave}>
              Save Item
            </button>
          </div>
        </div>
        <div className="ui-section-body">
          <div className="ui-form-grid">
            <div className="ui-col-12">
              <label className="ui-label" htmlFor="item-name">Item Name</label>
              <input id="item-name" className="ui-input" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Enter item name" />
            </div>

            <div className="ui-col-4">
              <label className="ui-label" htmlFor="department">Department</label>
              <select id="department" className="ui-input" value={department} onChange={(e) => setDepartment(e.target.value)}>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="ui-col-4">
              <label className="ui-label" htmlFor="category">Category</label>
              <select id="category" className="ui-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="ui-col-4">
              <label className="ui-label" htmlFor="price-group">Price Group</label>
              <select id="price-group" className="ui-input" value={priceGroup} onChange={(e) => setPriceGroup(e.target.value)}>
                {priceGroups.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="ui-col-12">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label className="ui-label" htmlFor="description">Item Description</label>
                <button
                  type="button"
                  className="ui-btn ui-btn--secondary"
                  onClick={runAssist}
                  disabled={aiBusy}
                  aria-label="Draft description with AI"
                >
                  <IconSparkle width={18} height={18} />
                  {aiBusy ? "Drafting…" : "Draft with Copilot"}
                </button>
              </div>
              <textarea
                id="description"
                className="ui-textarea"
                placeholder="Describe the item: size, ingredients, allergens, storage, and selling points."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div style={{ marginTop: "var(--space-1)", color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
                Suggestions are generated locally in this demo. Wire this button to your AI endpoint for production.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "var(--space-4)" }} className="ui-section" aria-label="Summary">
        <div className="ui-section-header">
          <div className="ui-section-title">Summary</div>
        </div>
        <div className="ui-section-body" style={{ display: "grid", gap: "var(--space-2)", color: "var(--color-text-muted)" }}>
          <div><strong>Item:</strong> {summary.itemName}</div>
          <div><strong>Department:</strong> {summary.department}</div>
          <div><strong>Category:</strong> {summary.category}</div>
          <div><strong>Price Group:</strong> {summary.priceGroup}</div>
          <div><strong>Description:</strong> {summary.description || "(none)"}</div>
        </div>
      </section>
    </main>
  );
}
