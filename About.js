
import React, {Component} from 'react';
import { View, AsyncStorage} from 'react-native';
import { Container, Text,Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

import MyHeader from './MyHeader'
type Props = {};
export default class About extends Component<Props> {
    state = {counter: 0, title: "Old Title"}
  render() {
    return (
        <Container>
            <MyHeader title={this.state.title}/>

            <Content>
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                <Button onPress={()=>{
                    this.setState({title: "New"});
                    console.log(this.state.title);
                }}>
                    <Text>Change Title</Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                    <Button>
                        <Text>Apps</Text>
                    </Button>
                    <Button>
                        <Text>Camera</Text>
                    </Button>
                    <Button active>
                        <Text>Navigate</Text>
                    </Button>
                    <Button>
                        <Text>Contact</Text>
                    </Button>
                </FooterTab>
            </Footer>
            {this.saveDate()}
        </Container>
    );
  }

  saveDate(){
        AsyncStorage.setItem("here", "yes")
  }
}

