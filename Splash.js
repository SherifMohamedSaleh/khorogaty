
import React, {Component} from 'react';
import { View, Image, AsyncStorage ,ImageBackground}  from 'react-native';
import { Container, Text,Spinner, CardItem, Content, Left, Body, Right } from 'native-base';
import MyHeader from './MyHeader'
type Props = {};
export default class Splash extends Component<Props> {
    static navigationOptions = {
        header: null,
    };


    render() {
    return (


        <ImageBackground  source={require('./Backgrounds/splash-bg.png')} style={{
            justifyContent: 'center',width:'100%',height:"100%",
            alignItems: 'center'}}>
        <Image source={require('./Logo/logo.png')}
               style={{width: 100, height: 100}} />
{this.moveToHome()}
        </ImageBackground>
    );
  }

  moveToHome(){
    AsyncStorage.getItem("here").then((val)=>{
setTimeout(()=>{
if(val === "yes"){
    this.props.navigation.navigate('Home');
}else{
    this.props.navigation.navigate('TestIntro');
}

}, 1000);
});
}
}

