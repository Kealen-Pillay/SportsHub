import LoginScreen from "../components/screens/loginscreen/LoginScreen";
import React from "react";
import { render } from "@testing-library/react-native";

//Tests that the Login Screen Renders
describe("Render Login screen", () => {
    it("should render", () => {
        const loginPage = render(<LoginScreen/>);
        const loginButton = loginPage.getByTestId("loginButton");
    })
});



//Tests that when a user types in the email text input field, the input is displayed

//Tests that when a user types in the password text input field, the input is displayed securely