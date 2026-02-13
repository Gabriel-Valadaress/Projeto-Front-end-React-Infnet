import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TournamentInfoPageContainer = styled.div`
    margin: 75px 0;
    padding: 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 768px) {
        padding: 40px;
    }
`;

const HeroSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 40px;

    @media (min-width: 992px) {
        flex-direction: row;
        align-items: flex-start;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    
    @media (min-width: 768px) {
        max-width: 300px;
    }

    @media (min-width: 992px) {
        width: 350px;
        max-width: 350px;
        flex-shrink: 0;
        margin: 0;
    }

    & img {
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
`;

const MainInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TitleName = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.2;

    @media (min-width: 576px) {
        font-size: 34px;
    }

    @media (min-width: 768px) {
        font-size: 40px;
    }
`;

const StatusBadge = styled.div`
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 600;
    width: fit-content;
    
    ${props => {
        if (props.$status === "Inscrições abertas") {
            return `
                background: #dcfce7;
                color: #166534;
                border: 2px solid #86efac;
            `;
        } else if (props.$status === "Torneio em andamento") {
            return `
                background: #dbeafe;
                color: #1e40af;
                border: 2px solid #93c5fd;
            `;
        } else {
            return `
                background: #f3f4f6;
                color: #4b5563;
                border: 2px solid #d1d5db;
            `;
        }
    }}
`;

const InfoCard = styled.div`
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 30px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    & strong {
        color: #6b7280;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
    }

    & p {
        color: #111827;
        font-size: 17px;
        font-weight: 500;
        margin: 0;
    }
`;

const SectionTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin: 40px 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 3px solid #6b8cff;
    display: inline-block;
`;

const Description = styled.p`
    font-size: 16px;
    color: #4b5563;
    line-height: 1.7;
    margin: 0 0 20px 0;
`;

const Regulamento = styled.div`
    background: #f9fafb;
    border-left: 4px solid #6b8cff;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;

    & p {
        font-size: 15px;
        color: #374151;
        line-height: 1.6;
        margin: 0;
    }
`;

const CategoriesSection = styled.div`
    margin-top: 30px;
`;

const CategoryType = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #374151;
    margin: 25px 0 15px 0;
    text-transform: capitalize;
`;

const CategoryCards = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CategoryCard = styled.div`
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.2s ease;

    &:hover {
        border-color: #6b8cff;
        box-shadow: 0 4px 12px rgba(107, 140, 255, 0.15);
        transform: translateY(-2px);
    }

    & h4 {
        font-size: 18px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 12px 0;
    }
`;

const CategoryDetail = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
    font-size: 14px;

    & span:first-child {
        color: #6b7280;
    }

    & span:last-child {
        color: #111827;
        font-weight: 600;
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
`;

const ProgressFill = styled.div`
    height: 100%;
    background: ${props => props.$percentage >= 100 ? '#ef4444' : props.$percentage >= 75 ? '#f59e0b' : '#10b981'};
    width: ${props => props.$percentage}%;
    transition: width 0.3s ease;
`;

const OrganizerCard = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 24px;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

    & h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    & p {
        margin: 8px 0 0 0;
        font-size: 22px;
        font-weight: 700;
    }
`;

const Button = styled.button`
    background: white;
    color: #667eea;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

const InscricoesCard = styled.div`
    background: white;
    border: 2px solid #6b8cff;
    border-radius: 12px;
    padding: 24px;
    margin: 30px 0;
    text-align: center;

    & h3 {
        font-size: 20px;
        color: #374151;
        margin: 0 0 16px 0;
    }

    & .valor {
        font-size: 36px;
        font-weight: 700;
        color: #6b8cff;
        margin: 10px 0;
    }

    & .detalhes {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
    }

    & .detalhe-item {
        text-align: center;
    }

    & .detalhe-label {
        font-size: 12px;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    & .detalhe-valor {
        font-size: 18px;
        font-weight: 600;
        color: #111827;
        margin-top: 4px;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 40px;
    color: #6b7280;
    font-size: 16px;
`;

export default function TournamentInfoPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tournament, setTournament] = useState({ 
        local: {}, 
        organizador: {},
        categorias: { feminino: [], masculino: [], misto: [] },
        inscricoes: {}
    });

    function getTournamentById(id) {
        let response;
        response = axios.get("/api/torneios.json");
        response.then((result) => {
            const tournaments = result.data;
            const found = tournaments.find(p => String(p.id) === String(id));
            setTournament(found || { 
                local: {}, 
                organizador: {},
                categorias: { feminino: [], masculino: [], misto: [] },
                inscricoes: {}
            });
        })
        .catch(() => {
            alert("Erro na requisição");
        });
    }

    useEffect(() => {
        getTournamentById(id);
    }, [id]);

    const renderCategories = (categories, type) => {
        if (!categories || categories.length === 0) {
            return <EmptyState>Nenhuma categoria {type} disponível</EmptyState>;
        }

        return (
            <>
                <CategoryType>{type}</CategoryType>
                <CategoryCards>
                    {categories.map((cat, index) => {
                        const percentage = (cat.vagasPreenchidas / cat.vagasTotal) * 100;
                        return (
                            <CategoryCard key={index}>
                                <h4>{cat.nome}</h4>
                                <CategoryDetail>
                                    <span>Nível</span>
                                    <span>{cat.nivel}</span>
                                </CategoryDetail>
                                <CategoryDetail>
                                    <span>Vagas</span>
                                    <span>{cat.vagasPreenchidas}/{cat.vagasTotal}</span>
                                </CategoryDetail>
                                <ProgressBar>
                                    <ProgressFill $percentage={percentage} />
                                </ProgressBar>
                            </CategoryCard>
                        );
                    })}
                </CategoryCards>
            </>
        );
    };

    return (
        <>
            <Navigation />
            <TournamentInfoPageContainer>
                <HeroSection>
                    <ImageContainer>
                        <img src={tournament.urlImagem} alt={tournament.titulo} />
                    </ImageContainer>
                    
                    <MainInfo>
                        <div>
                            <TitleName>{tournament.titulo}</TitleName>
                            <StatusBadge $status={tournament.status}>
                                {tournament.status}
                            </StatusBadge>
                        </div>

                        <InfoCard>
                            <InfoGrid>
                                <InfoItem>
                                    <strong>Data de Início</strong>
                                    <p>{tournament.dataInicio}</p>
                                </InfoItem>
                                <InfoItem>
                                    <strong>Data de Término</strong>
                                    <p>{tournament.dataFim}</p>
                                </InfoItem>
                                <InfoItem>
                                    <strong>Prazo de Inscrição</strong>
                                    <p>{tournament.dataLimiteInscricao}</p>
                                </InfoItem>
                                <InfoItem>
                                    <strong>Localização</strong>
                                    <p>{tournament.local.cidade} / {tournament.local.estado}</p>
                                </InfoItem>
                            </InfoGrid>
                            <InfoItem>
                                <strong>Endereço</strong>
                                <p>{tournament.local.endereco}</p>
                            </InfoItem>
                        </InfoCard>
                    </MainInfo>
                </HeroSection>

                <OrganizerCard>
                    <div>
                        <h3>Organizado por</h3>
                        <p>{tournament.organizador.nome}</p>
                    </div>
                    <Button onClick={() => navigate(`/perfil/${tournament.organizador.id}`)}>
                        Ver Perfil
                    </Button>
                </OrganizerCard>

                <SectionTitle>Sobre o Torneio</SectionTitle>
                <Description>{tournament.descricao}</Description>

                <SectionTitle>Regulamento</SectionTitle>
                <Regulamento>
                    <p>{tournament.regulamento}</p>
                </Regulamento>

                {tournament.inscricoes && (
                    <>
                        <SectionTitle>Informações de Inscrição</SectionTitle>
                        <InscricoesCard>
                            <h3>Valor da Inscrição</h3>
                            <div className="valor">
                                R$ {tournament.inscricoes.valorInscricao?.toFixed(2)}
                            </div>
                            <div className="detalhes">
                                <div className="detalhe-item">
                                    <div className="detalhe-label">Total de Inscritos</div>
                                    <div className="detalhe-valor">{tournament.inscricoes.totalInscritos}</div>
                                </div>
                                <div className="detalhe-item">
                                    <div className="detalhe-label">Status</div>
                                    <div className="detalhe-valor">
                                        {tournament.inscricoes.statusInscricoes}
                                    </div>
                                </div>
                            </div>
                        </InscricoesCard>
                    </>
                )}

                <SectionTitle>Categorias</SectionTitle>
                <CategoriesSection>
                    {tournament.categorias?.feminino && renderCategories(tournament.categorias.feminino, "feminino")}
                    {tournament.categorias?.masculino && renderCategories(tournament.categorias.masculino, "masculino")}
                    {tournament.categorias?.misto && renderCategories(tournament.categorias.misto, "misto")}
                </CategoriesSection>
            </TournamentInfoPageContainer>
        </>
    );
}