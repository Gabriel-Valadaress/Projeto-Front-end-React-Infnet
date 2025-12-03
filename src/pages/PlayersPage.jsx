import MobileNavigation from "../components/MobileNavigation";
import MobileHeader from "../components/MobileHeader";
import { useState } from "react";
import { styled } from "styled-components";

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  margin-bottom: 50px;
`;

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
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: #6b8cff;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-top: 5px;
`;

export default function PlayersPage() {

    const [filterNome, setFilterNome] = useState("");
    const [filterEstado, setFilterEstado] = useState("");
    const [filterCidade, setFilterCidade] = useState("");

    const jogadores = [
        { nome: "Neymar Jr", dataNascimento: "05/02/1992", partidas: 120, vitorias: 70, celular: "(11) 90000-0001", altura: 1.75, maoDominante: "Direita", estado: "SP", cidade: "Mogi das Cruzes" },
        { nome: "Anitta", dataNascimento: "30/03/1993", partidas: 80, vitorias: 40, celular: "(21) 90000-0002", altura: 1.62, maoDominante: "Direita", estado: "RJ", cidade: "Honório Gurgel" },
        { nome: "Whindersson Nunes", dataNascimento: "05/01/1995", partidas: 90, vitorias: 50, celular: "(86) 90000-0003", altura: 1.75, maoDominante: "Direita", estado: "PI", cidade: "Palmeira do Piauí" },
        { nome: "Ivete Sangalo", dataNascimento: "27/05/1972", partidas: 65, vitorias: 30, celular: "(71) 90000-0004", altura: 1.77, maoDominante: "Direita", estado: "BA", cidade: "Juazeiro" },
        { nome: "Thiago Ventura", dataNascimento: "23/05/1989", partidas: 100, vitorias: 60, celular: "(11) 90000-0005", altura: 1.82, maoDominante: "Direita", estado: "SP", cidade: "Taboão da Serra" },

        { nome: "Bruna Marquezine", dataNascimento: "04/08/1995", partidas: 78, vitorias: 37, celular: "(21) 90000-0006", altura: 1.70, maoDominante: "Direita", estado: "RJ", cidade: "Duque de Caxias" },
        { nome: "Rodrigo Wilbert", dataNascimento: "18/10/1979", partidas: 92, vitorias: 48, celular: "(42) 90000-0007", altura: 1.90, maoDominante: "Direita", estado: "SC", cidade: "Brusque" },
        { nome: "Paolla Oliveira", dataNascimento: "14/04/1982", partidas: 81, vitorias: 44, celular: "(11) 90000-0008", altura: 1.70, maoDominante: "Direita", estado: "SP", cidade: "São Paulo" },
        { nome: "Michel Teló", dataNascimento: "21/01/1981", partidas: 79, vitorias: 33, celular: "(67) 90000-0009", altura: 1.73, maoDominante: "Direita", estado: "MS", cidade: "Campo Grande" },
        { nome: "Juliette", dataNascimento: "03/12/1989", partidas: 85, vitorias: 41, celular: "(83) 90000-0010", altura: 1.63, maoDominante: "Direita", estado: "PB", cidade: "Campina Grande" },

        { nome: "Gusttavo Lima", dataNascimento: "03/09/1989", partidas: 91, vitorias: 51, celular: "(62) 90000-0011", altura: 1.83, maoDominante: "Direita", estado: "GO", cidade: "Presidente Olegário" },
        { nome: "Larissa Manoela", dataNascimento: "28/12/2000", partidas: 65, vitorias: 32, celular: "(41) 90000-0012", altura: 1.60, maoDominante: "Direita", estado: "PR", cidade: "Guarapuava" },
        { nome: "Renato Albani", dataNascimento: "07/10/1985", partidas: 73, vitorias: 36, celular: "(27) 90000-0013", altura: 1.81, maoDominante: "Direita", estado: "ES", cidade: "Vila Velha" },
        { nome: "Ludmilla", dataNascimento: "24/04/1995", partidas: 76, vitorias: 39, celular: "(21) 90000-0014", altura: 1.76, maoDominante: "Direita", estado: "RJ", cidade: "Duque de Caxias" },
        { nome: "Ronaldo Fenômeno", dataNascimento: "18/09/1976", partidas: 110, vitorias: 75, celular: "(31) 90000-0015", altura: 1.83, maoDominante: "Direita", estado: "MG", cidade: "Rio de Janeiro" },

        { nome: "Pelézinho", dataNascimento: "11/11/1988", partidas: 77, vitorias: 34, celular: "(11) 90000-0016", altura: 1.72, maoDominante: "Direita", estado: "SP", cidade: "São Paulo" },
        { nome: "Jojo Todynho", dataNascimento: "11/02/1997", partidas: 68, vitorias: 29, celular: "(21) 90000-0017", altura: 1.65, maoDominante: "Direita", estado: "RJ", cidade: "Bangu" },
        { nome: "Alexandre Pires", dataNascimento: "08/01/1976", partidas: 82, vitorias: 36, celular: "(31) 90000-0018", altura: 1.74, maoDominante: "Direita", estado: "MG", cidade: "Uberlândia" },
        { nome: "Pabllo Vittar", dataNascimento: "01/11/1993", partidas: 67, vitorias: 34, celular: "(98) 90000-0019", altura: 1.87, maoDominante: "Direita", estado: "MA", cidade: "São Luís" },
        { nome: "Fábio Porchat", dataNascimento: "01/07/1983", partidas: 104, vitorias: 52, celular: "(21) 90000-0020", altura: 1.82, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },

        { nome: "Porpeta", dataNascimento: "20/06/1992", partidas: 56, vitorias: 29, celular: "(31) 90000-0021", altura: 1.73, maoDominante: "Direita", estado: "MG", cidade: "Belo Horizonte" },
        { nome: "Fernanda Souza", dataNascimento: "18/06/1984", partidas: 73, vitorias: 30, celular: "(11) 90000-0022", altura: 1.58, maoDominante: "Direita", estado: "SP", cidade: "São Paulo" },
        { nome: "Caio Castro", dataNascimento: "22/01/1989", partidas: 88, vitorias: 45, celular: "(21) 90000-0023", altura: 1.82, maoDominante: "Direita", estado: "RJ", cidade: "Praia Grande" },
        { nome: "Marina Ruy Barbosa", dataNascimento: "30/06/1995", partidas: 79, vitorias: 42, celular: "(21) 90000-0024", altura: 1.67, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },
        { nome: "Gabi Fernandes", dataNascimento: "28/07/1987", partidas: 72, vitorias: 39, celular: "(46) 90000-0025", altura: 1.68, maoDominante: "Direita", estado: "PR", cidade: "Francisco Beltrão" },

        { nome: "Felipe Neto", dataNascimento: "21/01/1988", partidas: 103, vitorias: 48, celular: "(21) 90000-0026", altura: 1.78, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },
        { nome: "Luccas Neto", dataNascimento: "08/02/1992", partidas: 95, vitorias: 50, celular: "(21) 90000-0027", altura: 1.78, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },
        { nome: "Claudia Leitte", dataNascimento: "10/07/1980", partidas: 74, vitorias: 33, celular: "(71) 90000-0028", altura: 1.63, maoDominante: "Direita", estado: "BA", cidade: "Salvador" },
        { nome: "Lázaro Ramos", dataNascimento: "01/11/1978", partidas: 89, vitorias: 53, celular: "(71) 90000-0029", altura: 1.80, maoDominante: "Direita", estado: "BA", cidade: "Salvador" },
        { nome: "Taís Araújo", dataNascimento: "25/11/1978", partidas: 86, vitorias: 48, celular: "(21) 90000-0030", altura: 1.70, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },

        { nome: "Gisele Bündchen", dataNascimento: "20/07/1980", partidas: 70, vitorias: 33, celular: "(11) 90000-0031", altura: 1.80, maoDominante: "Direita", estado: "RS", cidade: "Horizontina" },
        { nome: "Rafinha Bastos", dataNascimento: "05/12/1976", partidas: 75, vitorias: 31, celular: "(11) 90000-0032", altura: 2.00, maoDominante: "Direita", estado: "RS", cidade: "Porto Alegre" },
        { nome: "Eduardo Sterblitch", dataNascimento: "15/01/1987", partidas: 83, vitorias: 44, celular: "(21) 90000-0033", altura: 1.78, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },
        { nome: "Kéfera Buchmann", dataNascimento: "25/01/1993", partidas: 62, vitorias: 29, celular: "(41) 90000-0034", altura: 1.63, maoDominante: "Direita", estado: "PR", cidade: "Curitiba" },
        { nome: "Alok", dataNascimento: "26/08/1991", partidas: 95, vitorias: 61, celular: "(61) 90000-0035", altura: 1.85, maoDominante: "Direita", estado: "DF", cidade: "Brasília" },

        { nome: "Celso Portiolli", dataNascimento: "01/06/1967", partidas: 108, vitorias: 58, celular: "(67) 90000-0036", altura: 1.84, maoDominante: "Direita", estado: "MS", cidade: "Batatuba" },
        { nome: "Luciano Huck", dataNascimento: "03/09/1971", partidas: 102, vitorias: 55, celular: "(11) 90000-0037", altura: 1.73, maoDominante: "Direita", estado: "SP", cidade: "São Paulo" },
        { nome: "Xuxa Meneghel", dataNascimento: "27/03/1963", partidas: 98, vitorias: 43, celular: "(21) 90000-0038", altura: 1.80, maoDominante: "Direita", estado: "RJ", cidade: "Santa Rosa" },
        { nome: "Sasha Meneghel", dataNascimento: "28/07/1998", partidas: 70, vitorias: 36, celular: "(21) 90000-0039", altura: 1.74, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },
        { nome: "Gabriel Medina", dataNascimento: "22/12/1993", partidas: 130, vitorias: 85, celular: "(12) 90000-0040", altura: 1.80, maoDominante: "Direita", estado: "SP", cidade: "São Sebastião" },

        { nome: "Rebeca Andrade", dataNascimento: "08/05/1999", partidas: 120, vitorias: 95, celular: "(11) 90000-0041", altura: 1.54, maoDominante: "Direita", estado: "SP", cidade: "Guarulhos" },
        { nome: "Rayssa Leal", dataNascimento: "04/01/2008", partidas: 88, vitorias: 58, celular: "(99) 90000-0042", altura: 1.45, maoDominante: "Esquerda", estado: "MA", cidade: "Imperatriz" },
        { nome: "Ana Castela", dataNascimento: "16/11/2003", partidas: 75, vitorias: 38, celular: "(67) 90000-0043", altura: 1.63, maoDominante: "Direita", estado: "MS", cidade: "Amambai" },
        { nome: "Mano Brown", dataNascimento: "22/04/1970", partidas: 95, vitorias: 49, celular: "(11) 90000-0045", altura: 1.80, maoDominante: "Direita", estado: "SP", cidade: "São Paulo" },

        { nome: "Zico", dataNascimento: "03/03/1953", partidas: 115, vitorias: 72, celular: "(21) 90000-0046", altura: 1.72, maoDominante: "Direita", estado: "RJ", cidade: "Rio de Janeiro" },
        { nome: "Daniel Alves", dataNascimento: "06/05/1983", partidas: 135, vitorias: 90, celular: "(88) 90000-0047", altura: 1.72, maoDominante: "Direita", estado: "BA", cidade: "Juazeiro" },
        { nome: "Caetano Veloso", dataNascimento: "07/08/1942", partidas: 140, vitorias: 80, celular: "(71) 90000-0048", altura: 1.70, maoDominante: "Direita", estado: "BA", cidade: "Santo Amaro" },
        { nome: "Fafá de Belém", dataNascimento: "09/08/1956", partidas: 99, vitorias: 55, celular: "(91) 90000-0049", altura: 1.69, maoDominante: "Direita", estado: "PA", cidade: "Belém" },
        { nome: "Wesley Safadão", dataNascimento: "06/09/1988", partidas: 97, vitorias: 50, celular: "(85) 90000-0050", altura: 1.79, maoDominante: "Direita", estado: "CE", cidade: "Fortaleza" }
    ];

    const jogadoresFiltrados = jogadores.filter((j) =>
        j.nome.toLowerCase().includes(filterNome.toLowerCase()) &&
        j.estado.toLowerCase().includes(filterEstado.toLowerCase()) &&
        j.cidade.toLowerCase().includes(filterCidade.toLowerCase())
    );

    return (
        <div>
            <MobileHeader />

            <FilterContainer>
                <Label>Nome</Label>
                <Input
                    type="text"
                    value={filterNome}
                    onChange={(e) => setFilterNome(e.target.value)}
                />

                <Label>Estado</Label>
                <Input
                    type="text"
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                />

                <Label>Cidade</Label>
                <Input
                    type="text"
                    value={filterCidade}
                    onChange={(e) => setFilterCidade(e.target.value)}
                />
            </FilterContainer>

            <SummaryTable>
                <SummaryTr>
                    <SummaryTh>Nome</SummaryTh>
                    <SummaryTh>Estado</SummaryTh>
                    <SummaryTh>Cidade</SummaryTh>
                    <SummaryTh>Taxa de vitória</SummaryTh>
                </SummaryTr>

                {jogadoresFiltrados.map((jogador, index) => (
                    <SummaryTr key={index}>
                        <SummaryTd>{jogador.nome}</SummaryTd>
                        <SummaryTd>{jogador.estado}</SummaryTd>
                        <SummaryTd>{jogador.cidade}</SummaryTd>
                        <SummaryTd>
                            {((jogador.vitorias / jogador.partidas) * 100).toFixed(0)}%
                        </SummaryTd>
                    </SummaryTr>
                ))}
            </SummaryTable>

            <MobileNavigation />
        </div>
    );
}