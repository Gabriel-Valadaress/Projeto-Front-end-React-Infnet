import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TournamentPageContainer = styled.div`
    @media (min-width: 992px) {
        margin-top: 75px;
    }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
  width: 100%;

  @media (min-width: 992px){
    margin: 75px 0 0 0;
    flex-direction: row;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: #6b8cff;
    outline: none;
  }

  @media (min-width: 576px){
    padding: 12px;
    font-size: 18px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;

  @media (min-width: 576px){
        font-size: 18px;
  }
`;

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const TournamentsCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    padding: 16px 32px;
`;

const TournamentCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 200px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 8px;
    padding: 8px 16px;

    &:hover{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        cursor: pointer;
    }

    & img {
        height: 80%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 50%;
    }
`;

const TournamentCardInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    height: 100%;
    width: 100%;

    & p{
        font-size: 20px;
    }
`;

const TitleOrganizerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & p {
        font-size: 24px;
        padding: 8px 16px;
        border-radius: 6px;

        &:hover {
            box-shadow: rgba(30, 30, 120, 0.2) 0px 3px 8px;
        }
    }
`;

const TournamentTitle = styled.h3`
    font-size: 24px;
    font-weight: 600;
`;

export default function TournamentsPage() {

    const [filterMes, setFilterMes] = useState("");
    const [filterAno, setFilterAno] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterEstado, setFilterEstado] = useState("");
    const [filterCidade, setFilterCidade] = useState("");

    const [tournaments, setTournaments] = useState([]);

    function getTournaments() {
        const response = axios.get("api/torneios.json");
        response.then((result) => {
            setTournaments(result.data);
        });
        response.catch(() => { })
    }

    useEffect(() => {
        getTournaments();
    }, []);

    const filteredTournaments = tournaments.filter((t) =>
        t.titulo.toLowerCase().includes(filterMes.toLowerCase()) &&
        t.status.toLowerCase().includes(filterStatus.toLowerCase()) &&
        t.estado.toLowerCase().includes(filterEstado.toLowerCase()) &&
        t.cidade.toLowerCase().includes(filterCidade.toLowerCase())
    );

    const navigate = useNavigate();

    function goToOrganizerProfile(id) {
        navigate(`/perfil/${id}`);
    }

    function goToTournament(id) {
        navigate(`/torneios/${id}`);
    }

    return (
        <TournamentPageContainer>
            <Navigation />
            <FilterContainer>
                <LabelInputContainer>
                    <Label>Estado</Label>
                    <Input
                        type="text"
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label>Cidade</Label>
                    <Input
                        type="text"
                        value={filterCidade}
                        onChange={(e) => setFilterCidade(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label>Mês</Label>
                    <Input
                        type="text"
                        value={filterMes}
                        onChange={(e) => setFilterMes(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label>Ano</Label>
                    <Input
                        type="text"
                        value={filterAno}
                        onChange={(e) => setFilterAno(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label>Status</Label>
                    <select
                        type="checkbox"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option>Inscrições abertas</option>
                        <option>Torneio em andamento</option>
                        <option>Torneio encerrado</option>
                    </select>
                </LabelInputContainer>
            </FilterContainer>

            <TournamentsCardsContainer>
                {filteredTournaments.map((tournament, index) => (
                    <TournamentCard key={index} onClick={() => goToTournament(tournament.id)}>
                        <img src={tournament.url_imagem} alt={tournament.titulo} />
                        <TournamentCardInfo>
                            <TitleOrganizerContainer>
                                <TournamentTitle>{tournament.titulo}</TournamentTitle>
                                <p onClick={(e) => {
                                    e.stopPropagation();
                                    goToOrganizerProfile(tournament.organizador_id);
                                }}>
                                    <strong>Organizador:</strong> {tournament.organizador_nome}
                                </p>
                            </TitleOrganizerContainer>
                            <p><strong>Local:</strong> {tournament.cidade} / {tournament.estado}</p>
                            <p><strong>Data:</strong> {tournament.data}</p>
                            <p><strong>Status:</strong> {tournament.status}</p>
                        </TournamentCardInfo>
                    </TournamentCard>
                ))}
            </TournamentsCardsContainer>
        </TournamentPageContainer >
    );
}