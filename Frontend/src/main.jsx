import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.scss'

import {Layout} from './Pages/Layout/Layout'

import MainPage from './Pages/MainPage/MainPage'
import CountryList from './Pages/CountryList/CountryList'
import CountryDetails from './Pages/CountryDetails/CountryDetails'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<MainPage />}/>
        <Route path='/countries' element={<CountryList />}/>
        <Route path='/country/:name/:id' element={<CountryDetails />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
