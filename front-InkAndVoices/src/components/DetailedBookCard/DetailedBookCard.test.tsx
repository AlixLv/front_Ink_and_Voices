import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailedBookCard from './DetailedBookCard';
import type { Theme } from '../../types/Book';

const mockBook = {
    id: 2,
    title: 'Les Orageuses',
    author: 'Marcia Burnier',
    type: {id: 1, type_name:'Roman'},
    resume: " Depuis qu’elle avait revu Mia, l’histoire de vengeance, non, de “rendre justice”, lui trottait dans la tête. On dit pas vengeance, lui avait dit Mia, c’est pas la même chose, là on se répare, on se rend justice parce que personne d’autre n’est disposé à le faire. Lucie n’avait pas été très convaincue par le choix de mot, mais ça ne changeait pas grand-chose. En écoutant ces récits dans son bureau, son cœur s’emballe, elle aurait envie de crier, de diffuser à toute heure dans le pays un message qui dirait On vous retrouvera. Chacun d’entre vous. On sonnera à vos portes, on viendra à votre travail, chez vos parents, même des années après, même lorsque vous nous aurez oubliées, on sera là et on vous détruira.",
    publishing_house: 'Cambourakis',
    publication_year: '2020',
    themes: [{id: 2, theme_name:'Féminisme'}],
    short_description: 'Un premier roman qui dépeint un gang de filles décidant un jour de reprendre comme elles peuvent le contrôle de leur vie.',
  };

vi.mock('../../hooks/useSingleBook', () => ({
  useSingleBook: () => ({
    book: mockBook,
    isLoading: false,
    error: null,
  })
}))

vi.mock('../ThemeButtons/ThemeButtons', () => ({
  default: ({ themes }: { themes: Theme[] }) => (
    <>
      {themes.map((theme) => (
        <div key={theme.id} data-testid="theme-button">
          {theme.theme_name}
        </div>  
      ))}
    </>
  )
}));

describe('DetailedBookCard Component', () => {

  it('should display correct datas', () => {
    render(
      <BrowserRouter>
        <DetailedBookCard id={mockBook.id} />
        </BrowserRouter>
    );

    expect(screen.getByText('Les Orageuses')).toBeInTheDocument();
    expect(screen.getByText('Marcia Burnier')).toBeInTheDocument();
    expect(screen.getByText('Roman')).toBeInTheDocument();
    expect(screen.getByText('Féminisme')).toBeInTheDocument();
    });
});
