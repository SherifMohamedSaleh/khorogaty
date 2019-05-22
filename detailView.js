
import React, { Component } from 'react';
import {Platform, StyleSheet, WebView ,ImageBackground, View,Image,TextInput} from 'react-native';
import { Container, Content, Tab, Tabs ,TabHeading , Header, Left, Body, Right, Button, Icon, Form, Item, Text ,Card , CardItem,Spinner} from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MyHeader from './MyHeader'

export default class detailView extends Component {
  state={ comment:"",addCommentRes:{} ,addingComment:0, data:[],loadedcomment:0 ,currentTab: 0 }
  static navigationOptions = {
    header: null,
};
  render() {
    return (
      <Container>    

<ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{
                           width:'100%',height:80}}>
                          
                              

                               <Button transparent onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={require('./Icons/left-arrow.png')} style={{ marginLeft:10 , marginTop: 20 ,width: 40, height: 40}}/>
            <Text style={{fontWeight: 'bold', color: '#fff' , marginTop:20 , marginLeft: 30 ,fontSize: 20}}>{this.props.navigation.getParam('title')}</Text>
                       
                          
          </Button>

                              

                             
                           
    


                        </ImageBackground>
                        
        <Tabs tabBarBackgroundColor={{ backgroundColor: 'white' }} 
              tabBarUnderlineStyle={{ backgroundColor: 'green' }}
              onChangeTab={({ i }) => this.setState({ currentTab: i })} >
          <Tab  heading={<TabHeading
              style={this.state.currentTab == 0 ? { backgroundColor: 'white' } : { backgroundColor: 'white' }}>
              {this.methodDetails()}     
              <Text style={this.state.currentTab == 0 ? {color:'green'} : {color:"Black"}} >Details</Text></TabHeading>}>
          <Container>
       <Content>
       <Card>
       <CardItem>
              <Body>
              <Image source={{uri:this.props.navigation.getParam('image')}} style={{height: 300, width:350}}/> 
                </Body>
                </CardItem>
                </Card>
                <Card>
                <CardItem>
                <Body>
                  
                  <Text>{this.props.navigation.getParam('content')}</Text>
                    </Body>
                   </CardItem>
            
                   </Card>
                   <Text style={{ fontWeight: 'bold', fontSize: 15, margin: 20 }}>More Information</Text>
                        <Card>
                            <CardItem>
                                <View style={{ flexDirection: "column" }}>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <Image source={require('./Icons/address.png')} style={{ width: 18, height: 18 }} />
                                        <Text style={{ color: 'gray', fontSize: 15, marginLeft: 10 }}>{this.props.navigation.getParam('address')}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <Image source={require('./Icons/call.png')} style={{ width: 18, height: 18 }} />
                                        <Text style={{ color: 'gray', fontSize: 15, marginLeft: 10 }}>{this.props.navigation.getParam('phone')}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', margin: 5 }}>
                                        <Image source={require('./Icons/mail.png')} style={{ width: 18, height: 18 }} />
                                        <Text style={{ color: 'gray', fontSize: 15, marginLeft: 10 }}>{this.props.navigation.getParam('email')}</Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
       
<Card>
 {this.returnComment()}
</Card>



       <Card>
         <CardItem>
           <Text>Add Your Comment</Text>
         </CardItem>
         <CardItem>
          
           <Body style={{flex: 5}}>
       
            <Item>
            <TextInput
        style={{height: 40,width:'90%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={(comment) => this.setState({comment})}
        value={this.state.comment}
        placeholder="Your Comment"
      />
            </Item>
        
          </Body>
          <Right style={{flex: 1}}>
           {this.commentButton()}
           </Right>
          </CardItem>
         
 </Card>
 </Content>
      </Container>
 
          </Tab>
         <Tab heading={<TabHeading style={this.state.currentTab == 1 ? { backgroundColor: 'white' } : { backgroundColor: 'white' }}>
            {this.methodMap()}
      
        
              <Text style={this.state.currentTab == 1 ? {color:'green'} : {color:"Black"}}>Map</Text></TabHeading>}>
          <Container>

     
          
                <Content>
                    <WebView source={{uri: this.props.navigation.getParam('map')}} style= {{width: '100%', height: 500}}/>

                </Content>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }

  
  componentDidMount  =()=>{
    fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?post='+this.props.navigation.getParam('id'))
    .then((response)=> response.json())
    .then((resJson)=> {
    this.setState({
       data: resJson , loadedcomment: 1
    },function f() {
    console.log(resJson);
     });
    })
    .catch((error) =>{
        console.error(error+"fetch error");
    
    });
}

commentButton(){
  if(this.state.addingComment === 0){
    return(

        <Button bordered  onPress={()=>{
            
            this.addComment();
            this.setState({addingComment: 1})
        }}>
   <Image source={require('./Icons/telegram.png')}
               style={{width: 50, height: 30}} />
         {/* <Icon name='./Icons/telegram.png' /> */}
            {/* <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text> */}
        </Button>
    )
}else{
    return(
        <Button onPress={()=>{
        }}>
            <Spinner />
        </Button>

    )
}
}

addComment(){
  fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?author_name=Sherif&author_email=saragalal93@gmail.com&content='+this.state.comment+'&post='+this.props.navigation.getParam('id'),
  {method:'POST' ,
   headers: {
    'Accept':'application/json',
    'Content-Type':'application/json',
  },
  })
.then((res)=> res.json())
.then((rj)=>{
this.setState({addCommentRes: rj,addingComment: 0, comment:""},function f() {

     console.log(rj);
   });
})
.catch((error) =>{
  console.error(error+"fetch error");

});
}

returnComment(){
if (this.state.loadedcomment === 0){
  return(
      <View>
      <Spinner/>
      </View>
  )
}else {
  return(
this.state.data.map((mapingComment)=>{
return (

<CardItem>
  <Left>
  {/* <Image source={require('./Logo/logo.png')}
               style={{width: 100, height: 100}} /> */}
  <Image source={require('./Icons/profile.png')} style={{ width: 50, height: 50 }} />
  </Left>
    
       <Body style={{flex:3}}>
         <Text style={{fontWeight:'bold',fontSize:22}}>{mapingComment.author_name}</Text>
         <Text style={{fontSize:14}}>{mapingComment.content.rendered}</Text>
    
       </Body>

       </CardItem>
   

)
})
)
}
}
methodDetails(){
  if(this.state.currentTab==0){
    return  (<Image source={require('./Icons/gabout.png')} style={{ width: 20, height: 20 }} />)
  } else {
    return  (<Image source={require('./Icons/about.png')} style={{ width: 20, height: 20 }} />) 
  }
}

methodMap(){
  if(this.state.currentTab==1){
    return  (<Image source={require('./Icons/map-marker.png')} style={{ width: 20, height: 20 }}  />)
  } else {
    return  (<Image source={require('./Icons/grey-map-marker.png')} style={{ width: 20, height: 20 }} />) 
  }  
}

}