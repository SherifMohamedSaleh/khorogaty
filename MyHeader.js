
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';

type Props = {};
class MyHeader extends Component<Props> {
  render() {
    return (

            <Header>
                <Left>
                    {/*{this.backButton()}*/}
                </Left>
                <Body>
                <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={()=>{
                        this.props.navigation.navigate('MyWebView')
                    }}>
                        <Icon name='google-home' type="MaterialCommunityIcons"/>
                    </Button>
                </Right>
            </Header>
    );
  }
}

export default withNavigation(MyHeader);