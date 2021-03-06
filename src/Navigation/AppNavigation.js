import React from 'react'
import { createSwitchNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import Path from "./Routes";
import LaunchScreen from "../Screens/Launch";
// Screens Objects
import LoginStack from "./LoginStack";
import MainStack from "./MainStack";
import DemoStack from './DemoStack'
import AppStateContext from "../Services/Auth/AppContext";
import AppUpdate from "../Screens/AppUpdate";

const Root = { screen: LaunchScreen };

// Manifest of possible screens
const PrimaryNav = createAnimatedSwitchNavigator(
	{

		//[Path.MAIN_APP]: MainStack,
		[Path.MAIN_APP]: DemoStack,
		[Path.LOGIN_STACK]: LoginStack,
		[Path.LOADING]: Root
	},
	{
		transition: (
			<Transition.Together>
			  <Transition.Out
				type="slide-left"
				durationMs={400}
				interpolation="easeIn"
			  />
			  <Transition.In type="slide-right" durationMs={500} />
			</Transition.Together>
		  ),
		// Default config for all screens
		headerMode: "none",
		initialRouteName: Path.LOADING,
		navigationOptions: {
			// headerStyle: styles.header
		}
	}
);

const ModalNav = createStackNavigator(
	{
		Main : PrimaryNav,
		
		AppUpdate :  {
		  screen: AppUpdate,
		},
	},
	  {
		mode: 'modal',
		initialRouteName: "Main",
		headerMode: 'none',
	  }
)

export default createAppContainer(ModalNav);
