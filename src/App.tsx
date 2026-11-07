import { useEffect } from "react";

function App() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <div style={{ 
      backgroundColor: "green", 
      color: "white", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: "bold",
      fontFamily: "sans-serif"
    }}>
      <h1>ЗЕЛЕНЫЙ ЭКРАН!</h1>
      <p>Ошибка сборки исправлена.</p>
    </div>
  );
}

export default App;
