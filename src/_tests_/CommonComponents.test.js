import { render, screen } from '@testing-library/react';
import { TitleNormal, TitleWithBorder, SmallRoundedImage } from '../components/CommonComponents';

describe('CommonComponents', () => {
    test('TitleNormal renderiza o texto filho corretamente', () => {
        render(<TitleNormal>Título de teste</TitleNormal>)
        expect(screen.getByText('Título de teste')).toBeInTheDocument()
    })

    test('TitleWithBorder renderiza o texto filho corretamente', () => {
        render(<TitleWithBorder>Título com borda</TitleWithBorder>)
        expect(screen.getByText('Título com borda')).toBeInTheDocument()
    })

    test('SmallRoundedImage renderiza com o alt correto', () => {
        render(<SmallRoundedImage src="/default-user-image.png" alt="Foto do jogador" />)
        expect(screen.getByAltText('Foto do jogador')).toBeInTheDocument()
    })
})
