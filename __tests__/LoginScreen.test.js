import LoginScreen from "../components/screens/loginscreen/LoginScreen";
import React from "react";
import { render } from "react-test-renderer";

it('works', () => {
    const page = render.create(<LoginScreen/>);
});