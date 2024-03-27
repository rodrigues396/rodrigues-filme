import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { toast } from "react-toastify";

import './filme-info.css';

function Filme(){
    const { id } = useParams(); //O useParamsgancho retorna um objeto de pares chave/valor dos parâmetros dinâmicos da URL atual
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true); // estado - "Carregando / Mostrando a Informacao"

    useEffect(()=>{ // useEffecté um React Hook que permite sincronizar um componente com um sistema externo.
        // JavaScript
        async function loadFilme(){ // Assíncrono - faz uma função retornar uma promessa
            await api.get(`/movie/${id}`, { // Espera - faz uma função esperar por uma promessa
                params:{ // Regras da API
                    api_key: '5a84f0a76be533d0d98cc4b5e803096c',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{ // O then()método agenda funções de retorno de chamada para a eventual conclusão de uma promessa
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{ // O catch método é usado para tratamento de erros na composição de promessas
                console.log('Filme nao encontrado');
                navigate("/", {replace: true});
                return;
            })
            // A FUNCAO ESPERA(await) A API(promise) PARA RETORNAR UMA PROMESSA
        }
        loadFilme();
    }, [navigate, id]);
    
    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id );

        if(hasFilme){
            toast.warn('Esse filme já está em sua lista!')
            return;
        }
        
        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso')
    }
    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes</h1>
            </div>
        )
    }
    // Retornando nosso componete da Function Filme()
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className="area-button">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;