import Navigation from "../components/Navigation";
import { SmallRoundedImage } from "../components/CommonComponents";

import { useState, useEffect, useMemo } from "react";
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
`;

const SummaryTr = styled.tr`
  border-bottom: none;
  cursor: pointer;
  
  &:hover {
    background: #f0f2f5;
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

const LoadingMessage = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
`;

export default function PlayersPage() {
  const [filterNome, setFilterNome] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterCidade, setFilterCidade] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlayers() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/usuarios.json");
        
        const jogadores = response.data.filter(u => u.tipo === 'jogador');
        setPlayers(jogadores);
      } catch (err) {
        setError('Não foi possível carregar a lista de jogadores');
      } finally {
        setLoading(false);
      }
    }

    getPlayers();
  }, []);

  const filteredPlayers = useMemo(() => 
    players.filter((p) =>
      p.nome.toLowerCase().includes(filterNome.toLowerCase()) &&
      p.endereco.estado.toLowerCase().includes(filterEstado.toLowerCase()) &&
      p.endereco.cidade.toLowerCase().includes(filterCidade.toLowerCase())
    ),
    [players, filterNome, filterEstado, filterCidade]
  );

  function goToProfile(id) {
    navigate(`/perfil/${id}`);
  }

  return (
    <div>
      <Navigation />
      
      <FilterContainer>
        <LabelInputContainer>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            type="text"
            value={filterNome}
            onChange={(e) => setFilterNome(e.target.value)}
            placeholder="Buscar por nome..."
            aria-label="Filtrar jogadores por nome"
          />
        </LabelInputContainer>
        
        <LabelInputContainer>
          <Label htmlFor="estado">Estado</Label>
          <Input
            id="estado"
            type="text"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            placeholder="Ex: SP"
            aria-label="Filtrar jogadores por estado"
          />
        </LabelInputContainer>
        
        <LabelInputContainer>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            type="text"
            value={filterCidade}
            onChange={(e) => setFilterCidade(e.target.value)}
            placeholder="Buscar por cidade..."
            aria-label="Filtrar jogadores por cidade"
          />
        </LabelInputContainer>
      </FilterContainer>

      {loading && <LoadingMessage>Carregando jogadores...</LoadingMessage>}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {!loading && !error && (
        <SummaryTable>
          <SummaryThead>
            <SummaryTr>
              <SummaryTh>Imagem</SummaryTh> 
              <SummaryTh>Nome</SummaryTh>
              <SummaryTh>Estado</SummaryTh>
              <SummaryTh>Cidade</SummaryTh>
            </SummaryTr>
          </SummaryThead>

          <SummaryTbody>
            {filteredPlayers.length === 0 ? (
              <SummaryTr>
                <SummaryTd colSpan="4" style={{ textAlign: 'center' }}>
                  Nenhum jogador encontrado
                </SummaryTd>
              </SummaryTr>
            ) : (
              filteredPlayers.map((player) => (
                <SummaryTr 
                  key={player.id} 
                  onClick={() => goToProfile(player.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') goToProfile(player.id);
                  }}
                >
                  <SummaryTd>
                    <SmallRoundedImage 
                      src={player.urlImagem} 
                      alt={`Foto de ${player.nome}`} 
                    />
                  </SummaryTd>
                  <SummaryTd>{player.nome}</SummaryTd>
                  <SummaryTd>{player.endereco.estado}</SummaryTd>
                  <SummaryTd>{player.endereco.cidade}</SummaryTd>
                </SummaryTr>
              ))
            )}
          </SummaryTbody>
        </SummaryTable>
      )}
    </div>
  );
}