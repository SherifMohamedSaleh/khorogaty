import React, {Component} from 'react';
import {ImageBackground, AsyncStorage} from 'react-native';
import { Container,Text ,View, Content} from 'native-base';
import { Image,Icon} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider'
type Props = {};
export default class TestIntro extends Component {
    
    static navigationOptions = {
        header: null
      };
      _renderItem = props => (
        <Container>
        <ImageBackground source={props.backgroundimage} style={{height: '100%', width:'100%',
       flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
    <View style={{flex:3}}>
      <View style={{flex:1}}>
      <Text></Text>
      </View>
      <View style={{flex:2}}>
        <Image source={props.logoimage} style={{height: 130, width:130}}></Image>
        </View>
        </View> 
        <View style={{flex:1, flexDirection: 'column',
          alignItems: 'center'}}>
      <Image source={props.iconimage} style={{justifyContent: 'center',height:50, width:50}}></Image>
       <Text style={{textAlign: 'center',fontWeight:'bold',fontSize:18}}>{props.title}</Text> 
        <Text style={{textAlign: 'center',fontSize:14}}>{props.text}</Text>  
        </View>
        
       </ImageBackground>
    </Container>
          );
     
          _renderNextButton = () => {
            return (
           <Text style={{color:'green'}}>Next</Text>
          );
          }
          _renderPrevButton = () => {
            return (  
                <Text style={{color:'green'}}>Prev</Text>  
              );
          }
          _renderDoneButton = () => {
            return (
              <View>
                   <Text style={{width:75,height:25,borderWidth:2,borderRadius:10,borderColor:'green',backgroundColor:'green',color:'white',textAlign:'center'}}>Start</Text>
              </View>
            );
          }
          _onDone = () => {
            this.props.navigation.navigate('Home');
          };

  render() {
    return (
        <Container>
            <Content>
        <AppIntroSlider
        slides={slides}
        showPrevButton='true'
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderPrevButton={this._renderPrevButton}
        onDone={this._onDone}
      />
        {this.saveData()}
      </Content>
      </Container>
    );
  }

  saveData(){
    AsyncStorage.setItem("here", "yes")
 }
}

const slides = [
    {
      key: 's1',
      title: 'Places to go',
      backgroundimage: require('./Backgrounds/onboarding-bg-left.png'),
      iconimage: require('./VectorIcons/home-first-icon.png'),
      logoimage: require('./Logo/khrogaty-logo.png'),
      
    },
    {
      key: 's2',
      title: 'Restaurants and Coffe Shops',
      backgroundimage: require('./Backgrounds/onboarding-bg-right.png'),
      iconimage: require('./VectorIcons/home-second-icon.png'),
      logoimage: require('./Logo/khrogaty-logo.png'),
      
    },
    {
      key: 's3',
      title: 'What Do I Do',
      backgroundimage: require('./Backgrounds/onboarding-bg-left.png'),
      iconimage: require('./VectorIcons/home-third-icon.png'),
      logoimage: require('./Logo/khrogaty-logo.png'),
     
    },
  ];