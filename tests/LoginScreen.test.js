import LoginScreen from "../components/screens/loginscreen/LoginScreen"

//Tests that the Login Screen Renders
test("Given I want to use the app, when I first open the app, then the login screen renders", () => {
    const {getByPlaceholderText} = render(<LoginScreen/>);
    getByPlaceholderText("Email:");
});



//Tests that when a user types in the email text input field, the input is displayed

//Tests that when a user types in the password text input field, the input is displayed securely