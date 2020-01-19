import React, { useEffect, useState } from 'react';
import './DevForm.css';

export const DevForm = ({ onSubmit }) => {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({ github_username, techs, latitude, longitude });
    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário Github</label>
        <input
          name="github_username"
          id="github_username"
          type="text"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          type="text"
          value={techs}
          required
          onChange={e => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            name="latitude"
            id="latitude"
            type="number"
            value={latitude}
            required
            onChange={e => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="Longitude">Longitude</label>
          <input
            name="Longitude"
            id="Longitude"
            type="number"
            value={longitude}
            required
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Salvar
      </button>
    </form>
  );
};
