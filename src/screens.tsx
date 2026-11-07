import { useEffect, useState } from "react";
import type { Dict } from "./i18n";
import type { Unit } from "./lib";
import { BONUS_CASES, BOT_USERNAME, CHANNEL_URL, GAMES, LEADERS } from "./lib";

type Common = { t: Dict; toast: (msg: string) => void };
type Fmt = (amount: number, unit?: Unit) => string;

// ---------- Игры ----------
export function GamesScreen({ t, toast, goCases }: Common & { goCases: () => void }) {
  const section = (key: "best" | "slots", title: string) => (
    <>
      <h2>{title}</h2>
      <div className="grid3">
        {GAMES.filter((g) => g.section === key).map((g) => (
          <button key={g.id} className="game" style={{ background: g.bg }} onClick={() => toast(t.soon)}>
            <span className="game-icon">{g.icon}</span>
            <span className="game-name">{t[g.nameKey]}</span>
          </button>
        ))}
      </div>
    </>
  );

  return (
    <>
      <button className="banner" onClick={goCases}>
        <span className="banner-a">{t.bannerA}</span>
        <span className="banner-b">{t.bannerB}</span>
        <span className="banner-icon">🎁</span>
      </button>
      {section("best", t.bestGames)}
      {section("slots", t.slots)}
    </>
  );
}

// ---------- Кейсы ----------
function hms(ms: number) {
  const s = Math.floor(ms / 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

export function CasesScreen({ t, toast, tickets }: Common & { tickets: number }) {
  // ДЕМО: подписка и таймер хранятся только здесь. Настоящая проверка будет на сервере.
  const [subscribed, setSubscribed] = useState(false);
  const [nextAt, setNextAt] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = Math.max(0, nextAt - now);

  return (
    <>
      <div className="card">
        <h3>🎁 {t.daily}</h3>
        <p className="muted">{t.dailyDesc}</p>
        {!subscribed ? (
          <div className="row">
            <button className="btn" onClick={() => (window as any).Telegram?.WebApp?.openTelegramLink(CHANNEL_URL)}>
              {t.subscribe}
            </button>
            <button className="btn ghost" onClick={() => setSubscribed(true)}>{t.checkSub}</button>
          </div>
        ) : left > 0 ? (
          <button className="btn" disabled>{t.nextIn} {hms(left)}</button>
        ) : (
          <button className="btn green" onClick={() => { setNextAt(Date.now() + 24 * 3600 * 1000); toast(t.soon); }}>
            {t.open}
          </button>
        )}
      </div>

      <h2>{t.bonus}</h2>
      <p className="muted">{t.bonusDesc}</p>
      <p>{t.myTickets}: <b>🎟 {tickets}</b></p>
      <div className="grid2">
        {BONUS_CASES.map((c) => (
          <button key={c.tickets} className="card case" disabled={tickets < c.tickets} onClick={() => toast(t.soon)}>
            <span className="case-icon">{c.icon}</span>
            <b>🎟 {c.tickets}</b>
            {tickets < c.tickets && <span className="muted small">{t.need}: {c.tickets}</span>}
          </button>
        ))}
      </div>
    </>
  );
}

// ---------- Лидеры ----------
export function LeadersScreen({ t, fmt }: { t: Dict; fmt: Fmt }) {
  const medals = ["🥇", "🥈", "🥉", "4", "5"];
  return (
    <>
      <h2>🏆 {t.top}</h2>
      <p className="muted">{t.topDesc}</p>
      {LEADERS.map((l, i) => (
        <div className="card leader" key={l.name}>
          <span className="rank">{medals[i]}</span>
          <span className="grow">{l.name}</span>
          <span className="right">
            <b>{fmt(l.wins, "stars")}</b>
            <span className="muted small">{t.prize}: {fmt(l.prize, "stars")}</span>
          </span>
        </div>
      ))}
    </>
  );
}

// ---------- Профиль ----------
export function ProfileScreen(props: Common & {
  fmt: Fmt; tickets: number; user: { id: number; name: string; username?: string };
}) {
  const { t, toast, fmt, tickets, user } = props;
  const link = `https://t.me/${BOT_USERNAME}?start=ref_${user.id}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(link); toast(t.copied); } catch { toast(link); }
  };

  return (
    <>
      <div className="card center">
        <div className="avatar">{user.name.slice(0, 1).toUpperCase()}</div>
        <h3>{user.name}</h3>
        <p className="muted">{user.username ? `@${user.username} · ` : ""}ID {user.id}</p>
      </div>
      <div className="card">
        <h3>{t.refLink}</h3>
        <p className="muted">{t.refDesc}</p>
        <div className="linkbox">{link}</div>
        <button className="btn" onClick={copy}>{t.copy}</button>
        <p>{t.invited}: <b>0</b> · {t.earned}: <b>{fmt(0)}</b></p>
      </div>
      <div className="card">🎟 {t.myTickets}: <b>{tickets}</b></div>
    </>
  );
}
