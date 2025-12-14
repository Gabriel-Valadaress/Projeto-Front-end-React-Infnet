import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const TournamentInfoPageContainer = styled.div`
    @media (min-width: 992px) {
        margin-top: 75px;
    }

    & p {
        font-size: 20px;
    }
`;

const TitleName = styled.h2`
    font-size: 26px;

    @media (min-width: 576px){
        font-size: 30px;
    }

    @media (min-width: 768px){
        font-size: 32px;
    }
`;

export default function TournamentInfoPage() {

    const { id } = useParams();
    const [tournament, setTournament] = useState({});

    function getTournamentById(id) {
        let response;
        response = axios.get("/api/torneios.json");
        response.then((result) => {
            const tournaments = result.data;
            const found = tournaments.find(p => String(p.id) === String(id));
            setTournament(found || {});
        })
            .catch(() => {
                alert("Erro na requisição");
            });
    }

    useEffect(() => {
        getTournamentById(id);
    }, [id]);

    return (
        <>
            <Navigation />
            <TournamentInfoPageContainer>
                <img src={tournament.url_imagem} alt={tournament.titulo} />
                <TitleName>{tournament.titulo}</TitleName>
                <p><strong>Cidade: </strong>{tournament.cidade}</p>
                <p><strong>Estado: </strong>{tournament.estado}</p>
                <p><strong>Data: </strong>{tournament.data}</p>
                <p><strong>Organizador: </strong>{tournament.organizador_nome}</p>
            </TournamentInfoPageContainer>
        </>
    );
}