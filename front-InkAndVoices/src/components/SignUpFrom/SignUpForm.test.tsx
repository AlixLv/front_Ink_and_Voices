import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';

describe('SignUpForm Component', () => {
    // const mockUser = {
    //     email: 'test@example.com',
    //     username: 'Test',
    //     password: 'testMdp2026'
    // };

    // it('should send correct datas to backend', () => {

    // })

    it('should render SignUpForm component', () => {
        render(<SignUpForm/>);
        screen.debug();
    })
})