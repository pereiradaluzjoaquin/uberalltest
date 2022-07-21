import { render, screen } from '@testing-library/react';
import App from './App';

test('renders content', () => {
    const component = render(<App />);
    component.getByText("COMPANY PRESENCE CHECK");
});
