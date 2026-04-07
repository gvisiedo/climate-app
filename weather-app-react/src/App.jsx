import { useState } from "react";

function App() {
  const [ciudad, setCiudad]=useState('')
  const [tiempo, setTiempo] = useState(null);
  const [error, setError] = useState('');   
  
    async function obtenerTiempo() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=714ed98054b98abbd642bec32c608c7e&units=metric&lang=es`
      );
      if (!response.ok) throw new Error('Ciudad no encontrada');
      const datos = await response.json();
      setTiempo(datos);
      setError('');
    } catch (error) {
      setError('Ciudad no encontrada');
      setTiempo(null);
      }
  
    }
  return (
     <div>
      <h1>Weather App</h1>
      {/**Formulario de busqueda */}
        <input type="text" placeholder="Escribe aqui tu ciudad" value={ciudad} onChange={(e)=> setCiudad(e.target.value)}/>
        <button onClick={obtenerTiempo}>Buscar</button>
        {/**Resultado: solo se muestra si tiempo tiene datos */}
        {tiempo && (
          <div >
            <h2>{tiempo.name}</h2>
          <p>{tiempo.main.temp}°C</p>
          <p>{tiempo.weather[0].description}</p>
          <p>Humedad: {tiempo.main.humidity}%</p>
          </div>

        )}
        {/**error: solo se muestra si hay error */}
        {error && <p>{error}</p>}
      
      </div>

  );
}


export default App;