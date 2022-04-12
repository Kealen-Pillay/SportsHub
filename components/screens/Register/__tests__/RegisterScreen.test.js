import React from 'react';
import { render } from 'react-dom';
import RegisterScreen from '../RegisterScreen';
import { render } from '@testing-library/react-native';



describe('Register screen', () => {

    it('accept text in username', () => {

        const navigation = {navigate: () => {}}
	spyOn(navigation, 'navigate');
 

        const page = render(<RegisterScreen />);

        const registerButton = page.getByTestId('registerButton');


	// set the test ID for the registerButton in RegisterScreen.js

	// fireEvent.press(registerButton);  
	

        // fireEvent.press() //the function press will press the register button

		
	 // expect(navigation.navigate).toHaveBeenCalledWith("Home"); 	
    })

})