import { useState } from 'react';
import './App.css'

import SearchBar from './Components/SearchBar/SearchBar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SearchBar/>
      </div>
    </>
  )
}

export default App
