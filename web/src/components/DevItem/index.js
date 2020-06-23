import React from 'react';

import api from '../../services/api';

import './style.css';

function DevItem({ dev }) {

    async function deleteDev(){
        const response = await api.delete(`/devs/${dev._id}`);
    }

    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt="{ dev.name }" />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <button onClick={deleteDev}>Deletar</button>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/$dev${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    );
}

export default DevItem;