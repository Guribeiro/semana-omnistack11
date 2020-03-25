import React, { useState } from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import logoImage from '../../assets/logo.svg';
import api from '../../services/api'

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('erro ao cadastrar caso, tente novamente')
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be the hero" />
                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                    <Link to="/profile" className='back-link'>
                        <FiArrowLeft size={16} color='#e02041' />
                    Voltar para home
                </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        type="text"
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}