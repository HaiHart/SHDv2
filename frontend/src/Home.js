import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
        textAlign:"justify",
        alignItems:"space-evenly",
    }}>
      <h1>Home page</h1>
      <Link to="/ship">Ship</Link>
      ||
      <Link to="/cargo">Cargo</Link>
    </div>
  );
}