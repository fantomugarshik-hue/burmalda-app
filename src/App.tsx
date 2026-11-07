import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [userName, setUserName] = useState("Гость");

  useEffect(() => {
    // Проверяем, есть ли объект Telegram
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      setIsTelegram(true);
      if (tg.initDataUnsafe?.user?.first_name) {
        setUserName(tg.initDataUnsafe.user.first_name);
      }
    }
  }, []);

  return (
    <div style={{ 
      backgroundColor: "#111", 
      color: "white", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      fontFamily: "sans-serif",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#00FF00", fontSize: "32px", marginBottom: "10px" }}>Burmalda Games</h1>
      
      {isTelegram ? (
        <p style={{ fontSize: "18px" }}>Привет, {userName}! <br/> Приложение работает внутри Telegram! ✅</p>
      ) : (
        <p style={{ fontSize: "18px", color: "orange" }}>Внимание: Вы открыли приложение в браузере, а не в Telegram!</p>
      )}
      
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        backgroundColor: "#222", 
        borderRadius: "15px",
        border: "1px solid #333"
      }}>
        <p>Баланс: 0 ⭐️</p>
        <button style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#0088cc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          Открыть кейс
        </button>
      </div>
    </div>
  );
}

export default App;
