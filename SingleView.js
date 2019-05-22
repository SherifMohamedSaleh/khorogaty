import React, {Component} from 'react';
import {Platform, StyleSheet,  View,Image,TextInput} from 'react-native';
import MyHeader from './MyHeader'
import { Container, Header, Left, Body, Right, Button,  Form, Item, Text,Content ,Card , CardItem,Spinner} from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
type Props = {};

export default class SingleView extends Component<Props> {
  state={name:"", comment:"",addCommentRes:{} ,addingComment:0, data:[],loadedcomment:0}
    static navigationOptions = {
        header: null
      };
    

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

  render() {
    return (
      <Container>
           <MyHeader title={this.props.navigation.getParam('title')}/>
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
       
<Card>
 {this.returnComment()}
</Card>



       <Card>
         <CardItem>
           <Text>Add Your Comment</Text>
         </CardItem>
         <CardItem>
           <Body>
       <Form>
       <Item>
            <TextInput
        style={{height: 40, width:'90%',borderColor: 'gray', borderWidth: 1}}
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
        placeholder="Your Name"
      />
            </Item>
            <Item>
            <TextInput
        style={{height: 40,width:'90%', borderColor: 'gray', borderWidth: 1}}
        onChangeText={(comment) => this.setState({comment})}
        value={this.state.comment}
        placeholder="Your Comment"
      />
            </Item>
           
          </Form>
          </Body>
          </CardItem>
          <CardItem style={{flexDirection: 'column'}}>
           
            {this.commentButton()}
          
         
         
          </CardItem>
 </Card>
 </Content>
      </Container>
    );
  }

  commentButton(){
    if(this.state.addingComment === 0){
      return(
          <Button onPress={()=>{
              this.addComment();
              this.setState({addingComment: 1})
          }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Submit</Text>
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
    fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?author_name='+this.state.name+'&author_email=saragalal93@gmail.com&content='+this.state.comment+'&post='+this.props.navigation.getParam('id'),
    {method:'POST' ,
     headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    })
  .then((res)=> res.json())
  .then((rj)=>{
  this.setState({addCommentRes: rj,addingComment: 0,name:"", comment:""},function f() {
  
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

}





 
