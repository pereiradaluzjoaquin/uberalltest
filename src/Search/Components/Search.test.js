import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Search} from './Search';

test('renders content', () => {
    const component = render(<Search />);
    component.getAllByPlaceholderText("Company Name");
    component.getAllByPlaceholderText("Street and Number");
});

test("test form submit with real data", async (done) => {
    const component = render(<Search />);
    const dropdown = component.getByTestId("CountryNames");
    const companyNameInput = component.getByPlaceholderText("Company Name");
    const streetInput = component.getByPlaceholderText("Street and Number");
    const zipÍnput = component.getByPlaceholderText("Zip/PostCode");
    const checkNowButton = component.getByText("CHECK NOW");
    fireEvent.change(companyNameInput, {target: {value: "Einstein Cafe"}});
    fireEvent.change(streetInput, {target: {value: "Unter den linden 42"}});
    fireEvent.change(zipÍnput, {target: {value: 10117}});
    fireEvent.click(checkNowButton);
    await waitFor(() => expect(component.container.querySelectorAll("tr")).toHaveLength(42));
    done();
}, 30000);


test("if fields are null return alert", () => {
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    const component = render(<Search />);
    const checkNowButton = component.getByText("CHECK NOW");
    fireEvent.click(checkNowButton);
    expect(alertMock).toHaveBeenCalledTimes(1);
});

