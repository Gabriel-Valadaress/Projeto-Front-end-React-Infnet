import Navigation from "../components/Navigation";

import { Link } from "react-router-dom";
import { styled } from "styled-components";

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

const TitleName = styled.h2`
    max-width: calc(100vw - 100px - 50px);
    text-align: end;
    font-size: 26px;

    @media (min-width: 576px){
        font-size: 30px;
    }

    @media (min-width: 768px){
        font-size: 32px;
    }
`;

const ResultsSummary = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 16px;
    width: 100%;
`;


const SummaryTitle = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    border-left: 4px solid #4a90e2;
    padding-left: 12px;

    @media (min-width: 576px){
        font-size: 30px;
        border-left: 5px solid #4a90e2;
    }

    @media (min-width: 768px){
        font-size: 32px;
        border-left: 6px solid #4a90e2;
    }
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

const Title = styled.h2`
    font-size: 20px;
    border-left: 4px solid #4a90e2;
    padding-left: 12px;

    @media (min-width: 576px){
        font-size: 30px;
        border-left: 5px solid #4a90e2;
    }

    @media (min-width: 768px){
        font-size: 32px;
        border-left: 6px solid #4a90e2;
    }
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

    const perfil = {
        nome: "Anakin Skywalker (Darth Vader)",
        urlImagem: "https://www.globalo.com/content/uploads/2015/12/darth-vader.jpg",
        dataNascimento: "01/01/1984",
        partidas: 50,
        vitorias: 25,
        celular: "(51) 98765-4321",
        altura: 1.98,
        maoDominante: "Direita",
        estado: "Região dos Huts",
        cidade: "Mos Espa",
    };

    return (
        <>
            <Navigation />
            <Container>
                <TitleCard>
                    <ProfilePicture src={perfil.urlImagem} alt={`Foto do ${perfil.nome}`} />
                    <TitleText>
                        <TitleName>{perfil.nome}</TitleName>
                        <p>{new Date().getFullYear() - new Date(perfil.dataNascimento).getFullYear()} anos</p>
                    </TitleText>
                </TitleCard>

                <ResultsSummary>
                    <SummaryTitle>Estatísticas gerais</SummaryTitle>
                    <SummaryTable>
                        <SummaryTr>
                            <SummaryTh>Partidas</SummaryTh>
                            <SummaryTh>Vitórias</SummaryTh>
                            <SummaryTh>Aproveitamento</SummaryTh>
                        </SummaryTr>
                        <SummaryTr>
                            <SummaryTd>{perfil.partidas}</SummaryTd>
                            <SummaryTd>{perfil.vitorias}</SummaryTd>
                            <SummaryTd>{(perfil.vitorias / perfil.partidas) * 100}%</SummaryTd>
                        </SummaryTr>
                    </SummaryTable>
                </ResultsSummary>

                <InfosContainer>
                    <InfosHeader>
                        <Title>Detalhes do Perfil</Title>
                        <EditInfo to="/">Editar</EditInfo>
                    </InfosHeader>

                    <ProfileCard>
                        <InfoItem>
                            <Label>Nome</Label>
                            <Value>{perfil.nome}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Data de Nascimento</Label>
                            <Value>{perfil.dataNascimento}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Celular</Label>
                            <Value>{perfil.celular}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Altura</Label>
                            <Value>{perfil.altura} m</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Mão Dominante</Label>
                            <Value>{perfil.maoDominante}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Estado</Label>
                            <Value>{perfil.estado}</Value>
                        </InfoItem>

                        <InfoItem>
                            <Label>Cidade</Label>
                            <Value>{perfil.cidade}</Value>
                        </InfoItem>
                    </ProfileCard>
                </InfosContainer>
            </Container>
        </>

    );
}