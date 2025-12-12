import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  margin-bottom: 75px;

  @media (min-width: 576px){
    font-size: 18px;
  }

  @media (min-width: 992px){
    margin: 0;
  }
`;

const SummaryThead = styled.thead``;

const SummaryTbody = styled.tbody``;


const SummaryTh = styled.th`
  text-align: left;
  font-weight: 600;
  padding: 12px;
  background: #f5f7fa;
  color: #000000;
  border-bottom: 2px solid #e3e6ea;
`;

const SummaryTd = styled.td`
  padding: 12px;
  color: #000000;
  border-bottom: 1px solid #eceff2;
  background: #fafbfc;

  & img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const SummaryTr = styled.tr`
  border-bottom: none;
  cursor: pointer;
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

export default function PlayersPage() {

  const [filterNome, setFilterNome] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterCidade, setFilterCidade] = useState("");
  const [players, setPlayers] = useState([]);

  function getPlayers() {
    const response = axios.get("api/jogadores.json");
    response.then((result) => {
      setPlayers(result.data);
    });
    response.catch(() => { })
  }

  useEffect(() => {
    getPlayers();
  }, []);

  const filteredPlayers = players.filter((p) =>
    p.nome.toLowerCase().includes(filterNome.toLowerCase()) &&
    p.estado.toLowerCase().includes(filterEstado.toLowerCase()) &&
    p.cidade.toLowerCase().includes(filterCidade.toLowerCase())
  );

  const navigate = useNavigate();

  function goToProfile(id) {
    navigate(`/perfil/${id}`)
  }

  return (
    <div>
      <Navigation />
      <FilterContainer>
        <LabelInputContainer>
          <Label>Nome</Label>
          <Input
            type="text"
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
          />
        </LabelInputContainer>
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
      </FilterContainer>

      <SummaryTable>
        <SummaryThead>
          <SummaryTr>
            <SummaryTh>Img</SummaryTh> 
            <SummaryTh>Nome</SummaryTh>
            <SummaryTh>Estado</SummaryTh>
            <SummaryTh>Cidade</SummaryTh>
          </SummaryTr>
        </SummaryThead>

        <SummaryTbody>
          {filteredPlayers.map((player, index) => (
            <SummaryTr key={index} onClick={() => goToProfile(player.id)}>
              <SummaryTd><img src={player.urlImagem} alt={player.nome} /></SummaryTd>
              <SummaryTd>{player.nome}</SummaryTd>
              <SummaryTd>{player.estado}</SummaryTd>
              <SummaryTd>{player.cidade}</SummaryTd>
            </SummaryTr>
          ))}
        </SummaryTbody>
      </SummaryTable>

    </div>
  );
}