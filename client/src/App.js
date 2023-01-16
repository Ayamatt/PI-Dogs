import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing.jsx'
import Home from './components/Home';
import Form from './components/Form';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/Home' component={Home} />
      <Route exact path='/CreateDog' component={Form} />
      <Route exact path='/Detail/:id' component={Detail} />
    </div>
  );
}

export default App;
