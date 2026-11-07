import type { Dict } from "./i18n";

// ---- Валюты. Курсы ТЕСТОВЫЕ: позже будем брать настоящие. ----
export type Unit = "stars" | "usdt"; // в чём лежит баланс
export type Display = "native" | "usd" | "rub"; // как показываем

export const STAR_USD = 0.015;
export const USD_RUB = 90;

export function formatMoney(amount: number, unit: Unit, display: Display): string {
  const usd = unit === "stars" ? amount * STAR_USD : amount;
  if (display === "usd") return `$${usd.toFixed(2)}`;
  if (display === "rub") return `${Math.round(usd * USD_RUB).toLocaleString("ru-RU")} ₽`;
  return unit === "stars"
    ? `${Math.round(amount).toLocaleString("ru-RU")} ⭐`
    : `${amount.toFixed(2)} USDT`;
}

// ---- Настройки: замени на свои ----
export const CHANNEL_URL = "https://t.me/your_channel";
export const BOT_USERNAME = "your_bot";

// ---- Демо-данные (потом будут приходить из базы) ----
export type Game = { id: string; nameKey: keyof Dict; icon: string; bg: string; section: "best" | "slots" };

export const GAMES: Game[] = [
  { id: "upgrader", nameKey: "upgrader", icon: "⌚", bg: "linear-gradient(160deg,#5b5bd6,#3a2f8f)", section: "best" },
  { id: "rocket", nameKey: "rocket", icon: "🚀", bg: "linear-gradient(160deg,#ff5d7a,#b83256)", section: "best" },
  { id: "mines", nameKey: "mines", icon: "💎", bg: "linear-gradient(160deg,#2aa89a,#1b5f66)", section: "best" },
  { id: "sweet", nameKey: "sweet", icon: "🍭", bg: "linear-gradient(160deg,#e66fd0,#8e3a9c)", section: "slots" },
  { id: "zeus", nameKey: "zeus", icon: "⚡", bg: "linear-gradient(160deg,#e0b341,#8a5a16)", section: "slots" },
  { id: "mandrop", nameKey: "mandrop", icon: "🎰", bg: "linear-gradient(160deg,#4a90e2,#1f3f8f)", section: "slots" },
];

export const BONUS_CASES = [
  { tickets: 25, icon: "📦" },
  { tickets: 50, icon: "🎁" },
  { tickets: 100, icon: "💼" },
  { tickets: 1000, icon: "👑" },
];

export const LEADERS = [
  { name: "Alex", wins: 12500, prize: 500 },
  { name: "Maria", wins: 9800, prize: 300 },
  { name: "Dima", wins: 7400, prize: 200 },
  { name: "Olga", wins: 5100, prize: 100 },
  { name: "Ivan", wins: 3900, prize: 50 },
];
