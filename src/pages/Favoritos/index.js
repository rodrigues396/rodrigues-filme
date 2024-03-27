import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import './favoritos.css'
function Favoritos(){

    const [filmes, setFilmes] = useState([]);
    
    useEffect(()=>{
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);  

    }, []);

    function excluirFilme(id){ // Id do filme  que será excluido
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id) // Retorna todos os filmes menos o que sera excluido
        })

        setFilmes(filtroFilmes); //  Atualiza a lista de filmes sem o filme excluído

        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes)) //  Salva na memoria local

        toast.success(("Filme removido dos favoritos!"));
    }

    return(
        <div  className="meus-filmes">
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Voce nao possui nenhum filme salvo</span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;