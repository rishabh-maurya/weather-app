import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherInformation from './components/WeatherInformation/WeatherInformation';

function App() {
  return (
    <div className="container App d-flex flex-column align-items-center justify-content-center">
      <h1 className='mb-5'>Weather App</h1>
      <WeatherInformation />
    </div>
  );
}

export default App;
