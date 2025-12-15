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

const StatusSelection = styled.select`
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6px;
    font-size: 16px;
    width: 95%;
`;

export default function TournamentsPage() {

    const [filterLocal, setFilterLocal] = useState("");
    const [filterData, setFilterData] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterOrganizador, setFilterOrganizador] = useState("");
    const [filterTitulo, setFilterTitulo] = useState("");


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

    const filteredTournaments = tournaments.filter((t) => {
        const dataInicio = new Date(t.dataInicio);

        const ano = dataInicio.getFullYear().toString();
        const mes = String(dataInicio.getMonth() + 1).padStart(2, "0");
        const anoMes = `${ano}-${mes}`;

        const localMatch =
            t.local.estado.toLowerCase().includes(filterLocal.toLowerCase()) ||
            t.local.cidade.toLowerCase().includes(filterLocal.toLowerCase());

        const dataMatch =
            !filterData ||
            ano === filterData ||
            anoMes === filterData;

        return (
            (!filterLocal || localMatch) &&
            dataMatch &&
            t.status.toLowerCase().includes(filterStatus.toLowerCase()) &&
            t.organizador.nome.toLowerCase().includes(filterOrganizador.toLowerCase()) &&
            t.titulo.toLowerCase().includes(filterTitulo.toLowerCase())
        );
    });


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
                    <Label>Local (Cidade ou Estado)</Label>
                    <Input
                        type="text"
                        placeholder="Ex: Porto Alegre ou RS"
                        value={filterLocal}
                        onChange={(e) => setFilterLocal(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label>Data (Ano ou Ano-Mês)</Label>
                    <Input
                        type="text"
                        placeholder="Ex: 2025 ou 2025-03"
                        value={filterData}
                        onChange={(e) => setFilterData(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label>Título do Torneio</Label>
                    <Input
                        type="text"
                        placeholder="Ex: Open Beach Tennis"
                        value={filterTitulo}
                        onChange={(e) => setFilterTitulo(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label>Organizador</Label>
                    <Input
                        type="text"
                        placeholder="Nome do organizador"
                        value={filterOrganizador}
                        onChange={(e) => setFilterOrganizador(e.target.value)}
                    />
                </LabelInputContainer>

                <LabelInputContainer>
                    <Label>Status</Label>
                    <StatusSelection
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Inscrições abertas">Inscrições abertas</option>
                        <option value="Torneio em andamento">Torneio em andamento</option>
                        <option value="Torneio encerrado">Torneio encerrado</option>
                    </StatusSelection>
                </LabelInputContainer>
            </FilterContainer>


            <TournamentsCardsContainer>
                {filteredTournaments.map((tournament, index) => (
                    <TournamentCard key={index} onClick={() => goToTournament(tournament.id)}>
                        <img src={tournament.urlImagem} alt={tournament.titulo} />
                        <TournamentCardInfo>
                            <TitleOrganizerContainer>
                                <TournamentTitle>{tournament.titulo}</TournamentTitle>
                                <p onClick={(e) => {
                                    e.stopPropagation();
                                    goToOrganizerProfile(tournament.organizador.id);
                                }}>
                                    <strong>Organizador:</strong> {tournament.organizador.nome}
                                </p>
                            </TitleOrganizerContainer>
                            <p><strong>Local:</strong> {tournament.local.cidade} / {tournament.local.estado}</p>
                            <p><strong>Data:</strong> {tournament.dataInicio} à {tournament.dataFim}</p>
                            <p><strong>Prazo para inscrição:</strong> {tournament.dataLimiteInscricao}</p>
                            <p><strong>Status:</strong> {tournament.status}</p>
                        </TournamentCardInfo>
                    </TournamentCard>
                ))}
            </TournamentsCardsContainer>
        </TournamentPageContainer >
    );
}