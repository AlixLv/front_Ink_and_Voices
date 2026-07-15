import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';
import { BrowserRouter } from 'react-router-dom';

describe('SubmitButton Component', () => {
  it('should render a button with correct text', () => {
    render(
      <BrowserRouter>
        <SubmitButton route="/add-book" text="Ajouter un livre" />
      </BrowserRouter>
    );
    
    const button = screen.getByRole('button', { name: /Ajouter un livre/i });
    expect(button).toBeInTheDocument();
  });

});