import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',{
      title: 'Umbriel',
      url: 'https://githubl.com/rocketseat/umbriel',
      techs: ['Node.js','ReactJS']
    });

    setRepos([ ...Repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepos(Repos.filter(repo => repo.id !== id));
  }

  const [Repos, setRepos] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  },[]);

  return (
    <div>
      <ul data-testid="repository-list">
        {Repos.map(repo => (
          <li key={repo.id}>{repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
            </button></li>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
