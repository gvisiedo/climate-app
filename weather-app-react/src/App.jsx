import { useState } from "react";
import "./App.css";

function getBgClass(weatherMain) {
  if (!weatherMain) return "bg-default";
  const w = weatherMain.toLowerCase();
  if (w === "clear") return "bg-clear";
  if (w === "clouds") return "bg-clouds";
  if (w === "rain" || w === "drizzle") return "bg-rain";
  if (w === "thunderstorm") return "bg-thunder";
  if (w === "snow") return "bg-snow";
  if (w === "mist" || w === "fog" || w === "haze") return "bg-mist";
  return "bg-default";
}

function App() {
  const [ciudad, setCiudad] = useState("");
  const [tiempo, setTiempo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function obtenerTiempo() {
    if (!ciudad.trim()) return;
    setLoading(true);
    setError("");
    setTiempo(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=714ed98054b98abbd642bec32c608c7e&units=metric&lang=es`
      );
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const datos = await response.json();
      setTiempo(datos);
    } catch (err) {
      setError("Ciudad no encontrada");
    } finally {
      setLoading(false);
    }
  }

  const bgClass = getBgClass(tiempo?.weather[0]?.main);

  return (
    <div className={`app-wrapper ${bgClass}`}>
      <div className="app-container">
        <h1 className="app-title">
          <span>🌤</span> Weather App
        </h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca tu ciudad..."
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && obtenerTiempo()}
          />
          <button onClick={obtenerTiempo} disabled={loading}>
            {loading ? <span className="spinner" /> : "Buscar"}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {tiempo && (
          <div className="weather-card">
            <h2 className="city-name">
              {tiempo.name}, {tiempo.sys.country}
            </h2>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${tiempo.weather[0].icon}@2x.png`}
              alt={tiempo.weather[0].description}
            />
            <p className="temperature">{Math.round(tiempo.main.temp)}°C</p>
            <p className="description">{tiempo.weather[0].description}</p>
            <div className="details">
              <div className="detail-item">
                <span className="detail-label">Sensación</span>
                <span className="detail-value">{Math.round(tiempo.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humedad</span>
                <span className="detail-value">{tiempo.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Viento</span>
                <span className="detail-value">{Math.round(tiempo.wind.speed)} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
