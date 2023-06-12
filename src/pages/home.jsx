import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../ui/nav/NavBar';
import Grafico from '../components/grafico/Grafico';
import DataList from '../components/grafico/DataList';

export default function Home(props) {
  return (
    <div>
      <Router>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Grafico />} />
          <Route exact path="/data" element={<DataList />} />
        </Routes>
      </Router>
      <props.Copyright></props.Copyright>
    </div>
  );
}

