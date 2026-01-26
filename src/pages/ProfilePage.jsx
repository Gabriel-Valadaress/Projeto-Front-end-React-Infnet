import Navigation from "../components/Navigation";
import { TitleNormal, TitleWithBorder } from "../components/CommonComponents";

import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin: 18px 0;
    padding: 0 36px;

    @media (min-width: 576px){
        padding: 0 48px;
        margin-bottom: 120px;
    }

    @media (min-width: 768px){
        padding: 0 60px;
    }

    @media (min-width: 992px){
        margin: 120px 0;
    }
`;

const TitleCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ProfilePicture = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;

    @media (min-width: 576px){
        width: 150px;
        height: 150px;
    }

    @media (min-width: 768px){
        width: 200px;
        height: 200px;
    }
`;

const TitleText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    & h2 {
        text-align: end;
    }

    & p {
        font-size: 16px;
    }

    @media (min-width: 576px){
        & p {
            font-size: 20px;
        }
    }

    @media (min-width: 768px){
        & p {
            font-size: 24px;
        }
    }
`;

const ResultsSummary = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 16px;
    width: 100%;
`;

const SummaryTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;

    @media (min-width: 576px){
        font-size: 18px;
    }

    @media (min-width: 768px){
        font-size: 20px;
    }
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

const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

const InfosHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const EditInfo = styled(Link)`
    cursor: pointer;
    color: #1d4ed8;
    text-decoration: none;
    transition: background-color 0.2s;
    align-self: flex-end;
    font-size: 16px;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      text-decoration: underline;
    }

    @media (min-width: 576px){
        font-size: 18px;
    }   
    @media (min-width: 768px){
        font-size: 20px;
    }
`;

const ProfileCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Label = styled.div`
    color: #4c4c4c;
`;

const Value = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;

    @media (min-width: 576px){
        font-size: 18px;
    }   
    @media (min-width: 768px){
        font-size: 20px;
    }
`;

export default function ProfilePage() {

    const { id } = useParams();
    const [profile, setProfile] = useState({
        estatisticas: {},
        detalhesJogador: {},
        endereco: {}
    });


    function getProfile() {
        let response;
        if (id) {
            response = axios.get("/api/usuarios.json");
            response.then((result) => {
                const players = result.data;
                const found = players.find(p => String(p.id) === String(id));
                setProfile(found || {});
            })
                .catch(() => {
                    alert("Erro na requisição");
                });
        } else {
            response = axios.get("api/me.json");
            response.then((result) => {
                setProfile(result.data[0]);
            });
            response.catch(() => {
                alert("Erro na requisição");
            })
        }
    }

    useEffect(() => {
        getProfile();
    }, [id]);

    return (
        <>
            <Navigation />
            <Container>
                <TitleCard>
                    <ProfilePicture
                        src={profile.urlImagem || "/default-user-image.png"}
                        alt={`Foto do ${profile.nome || "usuário"}`}
                    />

                    <TitleText>
                        <TitleNormal>{profile.nome}</TitleNormal>
                        <p>
                            {profile.dataNascimento
                                ? new Date().getFullYear() - new Date(profile.dataNascimento).getFullYear()
                                : "--"} anos
                        </p>

                    </TitleText>
                </TitleCard>
                <ResultsSummary>
                    <TitleWithBorder>Estatísticas gerais</TitleWithBorder>
                    <SummaryTable>
                        <thead>
                            <SummaryTr>
                                <SummaryTh>Partidas</SummaryTh>
                                <SummaryTh>Vitórias</SummaryTh>
                                <SummaryTh>Aproveitamento</SummaryTh>
                            </SummaryTr>
                        </thead>
                        <tbody>
                            <SummaryTr>
                                <SummaryTd>{profile.estatisticas?.partidas}</SummaryTd>
                                <SummaryTd>{profile.estatisticas?.vitorias}</SummaryTd>
                                <SummaryTd>{profile.estatisticas?.percentualVitorias}%</SummaryTd>
                            </SummaryTr>
                        </tbody>
                    </SummaryTable>
                </ResultsSummary>

                <InfosContainer>
                    <InfosHeader>
                        <TitleWithBorder>Detalhes do Perfil</TitleWithBorder>
                        <EditInfo to="/">Editar</EditInfo>
                    </InfosHeader>

                    <ProfileCard>
                        <InfoItem>
                            <Label>Nome</Label>
                            <Value>{profile.nome}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Data de Nascimento</Label>
                            <Value>{profile.dataNascimento}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Celular</Label>
                            <Value>{profile.celular}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Altura</Label>
                            <Value>{profile.detalhesJogador?.altura} m</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Mão Dominante</Label>
                            <Value>{profile.detalhesJogador?.maoDominante}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Estado</Label>
                            <Value>{profile.endereco?.estado}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Cidade</Label>
                            <Value>{profile.endereco?.cidade}</Value>
                        </InfoItem>
                    </ProfileCard>
                </InfosContainer>
            </Container>
        </>

    );
}