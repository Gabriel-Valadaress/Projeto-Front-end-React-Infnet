import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';

describe('Navigation', () => {
    test('renderiza o link "Início"', () => {
        render(<MemoryRouter><Navigation /></MemoryRouter>)
        expect(screen.getByText('Início')).toBeInTheDocument()
    })

    test('renderiza o link "Torneios"', () => {
        render(<MemoryRouter><Navigation /></MemoryRouter>)
        expect(screen.getByText('Torneios')).toBeInTheDocument()
    })
})
