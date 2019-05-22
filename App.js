
import Home from './Home';
import Splash from './Splash';
import SingleView from './SingleView';
import detailView from './detailView';
import TestIntro from './TestIntro'

import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator({
   Splash: Splash,
   detailView: detailView,
   Home: Home,
   SingleView: SingleView,
   TestIntro: TestIntro , 
});

Home.navigationOptions = {
   header: null,
};


export default createAppContainer(AppNavigator);
