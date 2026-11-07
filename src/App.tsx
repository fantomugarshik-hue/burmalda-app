import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { dict } from "./i18n";
import type { Lang } from "./i18n";
import { formatMoney } from "./lib";
import type { Display, Unit } from "./lib";
import { CasesScreen, GamesScreen, LeadersScreen, ProfileScreen } from "./screens";

type Tab = "games" | "cases" | "leaders" | "profile";
type Settings = { lang: Lang; display: Display };
const DEFAULTS: Settings = { lang: "ru", display: "native" };

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem("bg_settings");
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* ничего страшного, берём настройки по умолчанию */ }
  return DEFAULTS;
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}>✕</button></div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>("games");
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [modal, setModal] = useState<"settings" | "balance" | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // ДЕМО-кошелёк. Позже баланс будем брать из базы.
  const [unit, setUnit] = useState<Unit>("stars");
  const balance = unit === "stars" ? 150 : 10;
  const tickets = 30;

  const [payTab, setPayTab] = useState<"dep" | "wd">("dep");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"crypto" | "stars">("crypto");

  const t = dict[settings.lang];
  const fmt = (a: number, u: Unit = unit) => formatMoney(a, u, settings.display);
  const unitLabel = unit === "stars" ? "⭐" : "USDT";

  const tg = (window as any).Telegram?.WebApp;
  const tgUser = tg?.initDataUnsafe?.user;
  const user = {
    id: tgUser?.id ?? 123456,
    name: tgUser?.first_name ?? "Гость",
    username: tgUser?.username as string | undefined,
  };

  useEffect(() => {
    try {
      tg?.ready(); tg?.expand();
      tg?.setHeaderColor?.("#0b0d12"); tg?.setBackgroundColor?.("#0b0d12");
    } catch { /* вне Telegram этих функций нет */ }
  }, [tg]);

  useEffect(() => {
    try { localStorage.setItem("bg_settings", JSON.stringify(settings)); } catch { /* ок */ }
  }, [settings]);

  const toast = useCallback((m: string) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(null), 2000);
  }, []);

  const num = parseFloat(amount);
  const receive = isNaN(num) ? 0 : method === "stars" ? num * 0.9 : num;

  const submitWithdraw = () => {
    if (isNaN(num) || num <= 0 || num > balance) return toast(t.badAmount);
    toast(t.sent);
    setAmount("");
    setModal(null);
  };

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "games", icon: "🎮", label: t.games },
    { id: "cases", icon: "🎁", label: t.cases },
    { id: "leaders", icon: "🏆", label: t.leaders },
    { id: "profile", icon: "👤", label: t.profile },
  ];

  return (
    <div className="app">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setModal("settings")}>⚙️</button>
        <button className="balance" onClick={() => setModal("balance")}>
          {fmt(balance)} <span className="plus">+</span>
        </button>
      </header>

      {tab === "games" && <GamesScreen t={t} toast={toast} goCases={() => setTab("cases")} />}
      {tab === "cases" && <CasesScreen t={t} toast={toast} tickets={tickets} />}
      {tab === "leaders" && <LeadersScreen t={t} fmt={fmt} />}
      {tab === "profile" && <ProfileScreen t={t} toast={toast} fmt={fmt} tickets={tickets} user={user} />}

      <nav className="tabbar">
        {tabs.map((x) => (
          <button key={x.id} className={tab === x.id ? "tab on" : "tab"} onClick={() => setTab(x.id)}>
            <span>{x.icon}</span><small>{x.label}</small>
          </button>
        ))}
      </nav>

      {modal === "settings" && (
        <Modal title={t.settings} onClose={() => setModal(null)}>
          <label className="label">{t.language}</label>
          <div className="seg">
            {(["ru", "en"] as Lang[]).map((l) => (
              <button key={l} className={settings.lang === l ? "on" : ""} onClick={() => setSettings({ ...settings, lang: l })}>
                {l === "ru" ? "Русский" : "English"}
              </button>
            ))}
          </div>
          <label className="label">{t.currency}</label>
          <div className="seg">
            {([["native", t.curNative], ["usd", t.curUsd], ["rub", t.curRub]] as [Display, string][]).map(([d, name]) => (
              <button key={d} className={settings.display === d ? "on" : ""} onClick={() => setSettings({ ...settings, display: d })}>
                {name}
              </button>
            ))}
          </div>
          <label className="label">{t.demoWallet}</label>
          <div className="seg">
            <button className={unit === "stars" ? "on" : ""} onClick={() => setUnit("stars")}>{t.walletStars}</button>
            <button className={unit === "usdt" ? "on" : ""} onClick={() => setUnit("usdt")}>{t.walletCrypto}</button>
          </div>
        </Modal>
      )}

      {modal === "balance" && (
        <Modal title={fmt(balance)} onClose={() => setModal(null)}>
          <div className="seg">
            <button className={payTab === "dep" ? "on" : ""} onClick={() => setPayTab("dep")}>{t.deposit}</button>
            <button className={payTab === "wd" ? "on" : ""} onClick={() => setPayTab("wd")}>{t.withdraw}</button>
          </div>
          {payTab === "dep" ? (
            <>
              <button className="btn wide" onClick={() => toast(t.soon)}>⭐ {t.depStars}</button>
              <button className="btn wide" onClick={() => toast(t.soon)}>₮ {t.depCrypto}</button>
            </>
          ) : (
            <>
              <label className="label">{t.amount} ({unitLabel})</label>
              <input className="input" type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <label className="label">{t.method}</label>
              <div className="seg">
                <button className={method === "crypto" ? "on" : ""} onClick={() => setMethod("crypto")}>{t.mCrypto}</button>
                <button className={method === "stars" ? "on" : ""} onClick={() => setMethod("stars")}>{t.mStars}</button>
              </div>
              <p>{t.youGet}: <b>{receive.toFixed(2)} {unitLabel}</b></p>
              <button className="btn wide green" onClick={submitWithdraw}>{t.send}</button>
            </>
          )}
        </Modal>
      )}

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}
