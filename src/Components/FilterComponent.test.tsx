import FilterComponent from "./FilterComponent";
import { render, screen } from '@testing-library/react';

test('FilterComponent renders correctly', () => {
    render(<FilterComponent />);

    const searchButton = screen.getByText("Search")

    expect(searchButton).toBeInTheDocument();


})