export type Lang = "ru" | "en";

const ru = {
  games: "Игры", cases: "Кейсы", leaders: "Лидеры", profile: "Профиль",
  settings: "Настройки", language: "Язык", currency: "Отображение валюты",
  curNative: "Как на балансе", curUsd: "Доллары ($)", curRub: "Рубли (₽)",
  demoWallet: "Тест: тип кошелька", walletStars: "Звёзды", walletCrypto: "Крипта",
  deposit: "Пополнить", withdraw: "Вывести",
  depStars: "Telegram Stars", depCrypto: "Криптовалюта (USDT)",
  amount: "Сумма", method: "Способ вывода",
  mCrypto: "Крипта", mStars: "Звёзды (комиссия 10%)",
  youGet: "Вы получите", send: "Отправить заявку",
  sent: "Заявка создана (демо)", badAmount: "Проверьте сумму", soon: "Скоро!",
  bestGames: "Лучшие игры", slots: "Слоты",
  upgrader: "Апгрейдер", rocket: "Ракетка", mines: "Минки",
  sweet: "Свит Бонанза", zeus: "Зевс Олимпус", mandrop: "Мандроп",
  bannerA: "Бесплатный кейс", bannerB: "за подписку",
  daily: "Ежедневный кейс", dailyDesc: "Раз в 24 часа за подписку на наш канал",
  subscribe: "Подписаться", checkSub: "Я подписался", open: "Открыть",
  nextIn: "Следующий через", bonus: "Бонусные кейсы",
  bonusDesc: "Открывай за билеты: 1 билет за каждый проигранный $1",
  myTickets: "Мои билеты", need: "Нужно билетов",
  top: "Топ по выигрышам", topDesc: "Призы получают все из топ-5", prize: "Приз",
  refLink: "Реферальная ссылка", refDesc: "15% с проигрышей приглашённых",
  copy: "Копировать", copied: "Скопировано", invited: "Приглашено", earned: "Бонус с рефералов",
};

export type Dict = Record<keyof typeof ru, string>;

const en: Dict = {
  games: "Games", cases: "Cases", leaders: "Leaders", profile: "Profile",
  settings: "Settings", language: "Language", currency: "Currency display",
  curNative: "As on balance", curUsd: "Dollars ($)", curRub: "Rubles (₽)",
  demoWallet: "Test: wallet type", walletStars: "Stars", walletCrypto: "Crypto",
  deposit: "Deposit", withdraw: "Withdraw",
  depStars: "Telegram Stars", depCrypto: "Crypto (USDT)",
  amount: "Amount", method: "Withdrawal method",
  mCrypto: "Crypto", mStars: "Stars (10% fee)",
  youGet: "You will get", send: "Send request",
  sent: "Request created (demo)", badAmount: "Check the amount", soon: "Coming soon!",
  bestGames: "Top games", slots: "Slots",
  upgrader: "Upgrader", rocket: "Rocket", mines: "Mines",
  sweet: "Sweet Bonanza", zeus: "Zeus Olympus", mandrop: "Mandrop",
  bannerA: "Free case", bannerB: "for subscribing",
  daily: "Daily case", dailyDesc: "Once every 24h for subscribing to our channel",
  subscribe: "Subscribe", checkSub: "I subscribed", open: "Open",
  nextIn: "Next one in", bonus: "Bonus cases",
  bonusDesc: "Open with tickets: 1 ticket per $1 lost",
  myTickets: "My tickets", need: "Tickets needed",
  top: "Top winners", topDesc: "Everyone in the top 5 gets a prize", prize: "Prize",
  refLink: "Referral link", refDesc: "15% of your referrals' losses",
  copy: "Copy", copied: "Copied", invited: "Invited", earned: "Referral bonus",
};

export const dict: Record<Lang, Dict> = { ru, en };
