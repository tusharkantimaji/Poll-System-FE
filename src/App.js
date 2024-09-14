import './App.css';
import RoleSelector from './components/role-selector/RoleSelector';
import GlobalProvider from './context/GlobalState';


function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <RoleSelector />
    </div>
    </GlobalProvider>
);
}

export default App;
