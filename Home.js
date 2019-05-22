

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React, {Component} from 'react';
import { List , SearchBar, ListItem} from 'react-native-elements';
import { View , Image,ScrollView , Dimensions , ImageBackground , FlatList, ActivityIndicator,SafeAreaView } from 'react-native';
import { Container,Button , Text ,Card, CardItem, Content, Left, Body, Spinner, Right } from 'native-base';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {counter: 0, title: "About", place: [],rest: [],what: [], loaded: 0}
    static navigationOptions = {
        header: null,
    };

    componentDidMount(): void {

        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
            .then((responseOne)=> responseOne.json())
            .then((resJsonOne)=>{
                this.setState({
                    place: resJsonOne, loaded: 1}, function(){
                    console.log(resJsonOne);
                });
            })

            fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            .then((responseTwo)=> responseTwo.json())
            .then((resJsonTwo)=>{
                this.setState({
                    rest: resJsonTwo, loaded: 1}, function(){
                    console.log(resJsonTwo);
                });
            })
            fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
            .then((response)=> response.json())
            .then((resJson)=>{
                this.setState({
                    what: resJson, loaded: 1}, function(){
                    console.log(resJson);
                });
            })
    }

    render() {
    return (
        <Container>
            <ImageBackground  source={require('./Backgrounds/home-header.png')} style={{
                            justifyContent: 'center',width:'100%',height:130,
                            alignItems: 'center'}}>
                        <Image source={require('./Logo/khrogaty-logo.png')}
                               style={{width: 100, height: 100}} />
                        </ImageBackground>
           
            <Content>
                <Card>
                <CardItem>
              <Left>
                <Image source={require('./VectorIcons/home-first-icon.png')}
                  style={{ width: 35, height: 35, borderRadius: 10 }} />
                <Body>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Places For Going Out</Text>
                </Body>
              </Left>
              <Right>
              <Button transparent success onPress={() => {
                            this.props.navigation.navigate('Place')
                        }}>
                            <Text style={{fontSize:12}}>
                                View More
                            </Text>
                        </Button>
              </Right>
             </CardItem>
               
         <ScrollView horizontal={true}>
         {this.returnPlace()}
</ScrollView>
<CardItem>
              <Left>
                <Image source={require('./VectorIcons/home-second-icon.png')}
                  style={{ width: 35, height: 35, borderRadius: 10 }} />
                <Body>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Restaurants & Coffe Shoops </Text>
                </Body>
              </Left>
              <Right>
              <Button transparent success onPress={() => {
                            this.props.navigation.navigate('Rest')
                        }}>
                            <Text style={{fontSize:12}}>
                                View More
                            </Text>
                        </Button>
              </Right>
             </CardItem>
<ScrollView horizontal={true}>
         {this.returnRest()}
</ScrollView>
<CardItem>
              <Left>
                <Image source={require('./VectorIcons/home-third-icon.png')}
                  style={{ width: 35, height: 35, borderRadius: 10 }} />
                <Body>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>What Do I Do?</Text>
                </Body>
              </Left>
              <Right>
              <Button transparent success onPress={() => {
                            this.props.navigation.navigate('What')
                        }}>
                            <Text style={{fontSize:12}}>
                                View More
                            </Text>
                        </Button>
              </Right>
             </CardItem>
<ScrollView horizontal={true}>
         {this.returnWhat()}
</ScrollView>
</Card>
</Content>

        </Container>
    );
  }


  returnRest(){
    return(
        this.state.rest.map((mapingRest)=>{
            return(
                <Card key={mapingRest.id} style={{width: 150, height: 200}}>
                    <CardItem button onPress={()=>{
                          this.props.navigation.navigate('detailView', {'title': mapingRest.title.rendered, 
                          'image': mapingRest.better_featured_image.source_url,
                           'content':mapingRest.content.rendered ,'id':mapingRest.id ,
                           'phone':mapingRest.acf.phone_number,
                           'email':mapingRest.acf.email_address,
                           'address':mapingRest.acf.address,
                           'map': mapingRest.acf.map_location})
                    }}>
                        <Body style={{flex: 2}}>
                            <Image
                                style={{width: 120, height: 150, borderRadius: 10}}
                                source={{uri: mapingRest.better_featured_image.source_url}} />
                            <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingRest.title.rendered}</Text>
                            {/* <Text style={{color: '#999', marginTop: 10}}>{mapingRest.excerpt.rendered}</Text> */}
                        </Body>
                    </CardItem>
                </Card>
              
            )
        })
    )
  }
  returnWhat(){

    return(
        this.state.what.map((mapingWhat)=>{
            return(
                <Card key={mapingWhat.id} style={{width: 150, height: 200}}>
                    <CardItem button onPress={()=>{
                         this.props.navigation.navigate('detailView', {'title': mapingWhat.title.rendered, 
                         'image': mapingWhat.better_featured_image.source_url,
                          'content':mapingWhat.content.rendered ,'id':mapingWhat.id , 
                          'phone':mapingWhat.acf.phone_number,
                          'email':mapingWhat.acf.email_address,
                          'address':mapingWhat.acf.address,
                          'map': mapingWhat.acf.map_location})
                       }}>
                        <Body style={{flex: 2}}>
                            <Image
                                style={{width: 120, height: 150, borderRadius: 10}}
                                source={{uri: mapingWhat.better_featured_image.source_url}} />
                            <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingWhat.title.rendered}</Text>
                            {/* <Text style={{color: '#999', marginTop: 10}}>{mapingWhat.excerpt.rendered}</Text> */}
                        </Body>
                    </CardItem>
                </Card>
              
            )
        })
    )
  }

  returnPlace(){
        if(this.state.loaded === 0){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner/>
                    <Text>Loading</Text>
                </View>
            )
        }else {
            return(
                this.state.place.map((mapingData)=>{
                    return(
                        <Card key={mapingData.id} style={{width: 150, height: 200}}>
                            <CardItem button onPress={()=>{
                               this.props.navigation.navigate('detailView', {'title': mapingData.title.rendered, 
                               'image': mapingData.better_featured_image.source_url, 
                               'content':mapingData.content.rendered ,'id':mapingData.id , 
                               'phone':mapingData.acf.phone_number,
                          'email':mapingData.acf.email_address,
                          'address':mapingData.acf.address,
                               'map': mapingData.acf.map_location})
                             }}>
                                <Body style={{flex: 2}}>
                                    <Image
                                        style={{width: 120, height: 150, borderRadius: 10}}
                                        source={{uri: mapingData.better_featured_image.source_url}} />
                                    <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingData.title.rendered}</Text>
                                    {/* <Text style={{color: '#999', marginTop: 10}}>{mapingData.excerpt.rendered}</Text> */}
                                </Body>
                            </CardItem>
                        </Card>
                      
                    )
                })
            )

        }
    }
}

class SearchScreen extends React.Component {
state = { placesArray:[] ,loaded: 0}
static navigationOptions = {
  header: null,
};
arrayholder = [];
  
  getPlaces(){
    fetch("http://reactnative.website/iti/wp-json/wp/v2/posts")
          .then((response)=> response.json())
          .then((resJson)=>{
              this.setState({
                placesArray: '', loaded: 1}, function(){
                  console.log(resJson);
              });
              this.arrayholder=resJson
          })
          .catch(error => {
            this.setState({ loaded: 0 });
          });
  }

  componentDidMount(): void {this.getPlaces();}
  render() {
    return (
      
      <Container>
          <ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{
                           width:'100%',height:80}}>
                             <Text style={{fontWeight: 'bold', color: '#fff' , marginTop:20 , marginLeft: 30 ,fontSize: 20}}>Search</Text>
                       
                        </ImageBackground>
      
<Content>
   {this.returnPlaces()}
   
   </Content>
  
     </Container>
    
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.rendered.toUpperCase()} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      placesArray: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };


  ListEmpty = () => {
    return (
        //View to show when list is empty
        <View style={{width: '100%', height: '100%',flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('./VectorIcons/nosearch-icon.png')} style={{width: 250, height: 250,
                justifyContent: 'center', alignItems: 'center'
            }} />
        </View>
    );
};

  returnPlaces(){
    if(this.state.loaded === 0){
        return(
            <View style={{alignItems: 'center', justifyContent: 'center',marginTop:50}}>
                <Spinner/>
                <Text>Loading</Text>
            </View>
        )
    }else {
        return(
          
      <FlatList

      
        data={this.state.placesArray}
        renderItem={({ item }) => (

        <Card key={item.id}>
        <CardItem button onPress={()=>{
            this.props.navigation.navigate('detailView', {title: item.title.rendered,
                 image: item.better_featured_image.source_url,
                  content: item.content.rendered ,
                  phone:item.acf.phone_number,
             email:item.acf.email_address,
             address:item.acf.address,
                 
                  map: item.acf.map_location})
        }}>
            <Left style={{flex: 2}}>
                <Image
                    style={{width: 120, height: 150, borderRadius: 10}}
                    source={{uri: item.better_featured_image.source_url}} />
            </Left>
            <Body style={{flex: 3}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>{item.title.rendered}</Text>
               
            </Body>
        </CardItem>
    </Card>
        )}
        ListEmptyComponent={this.ListEmpty}
        keyExtractor={item => item.title.render}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
      />
    
        );
               
  

    }


}

}
class placesScreen extends React.Component {
    state = {counter: 0, title: "About", data: [], loaded: 0}
    static navigationOptions = {
        header: null,
    };

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
            .then((response)=> response.json())
            .then((resJson)=>{
                this.setState({
                    data: resJson, loaded: 1}, function(){
                    console.log(resJson);
                });
            })
    }

    render() {
    return (
        <Container>
                <ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{
                           width:'100%',height:80}}>
                             <Text style={{fontWeight: 'bold', color: '#fff' , marginTop:20 , marginLeft: 30 ,fontSize: 20}}>Place</Text>
                       
                        </ImageBackground>

            <Content>
                {this.returnData()}
            </Content>

        </Container>
    );
  }

    returnData(){
        if(this.state.loaded === 0){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner/>
                    <Text>Loading</Text>
                </View>
            )
        }else {
            return(
                this.state.data.map((mapingData)=>{
                    return(

                        <Card key={mapingData.id}>
                            <CardItem >
                                <Left style={{flex: 2}}>
                                    <Image
                                        style={{width: 120, height: 150, borderRadius: 10}}
                                        source={{uri: mapingData.better_featured_image.source_url}} />
                                </Left>
                                <Body style={{flex: 3}}>
                                    <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingData.title.rendered}</Text>
                                    <Text style={{color: '#999', marginTop: 10}}>{mapingData.excerpt.rendered}</Text>
                                    <Button success style={{width: 100 ,height: 30,borderRadius:15, marginTop: 10,
                                    justifyContent: 'center'}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('detailView', {'title': mapingData.title.rendered, 
                                        'image': mapingData.better_featured_image.source_url, 
                                        'content':mapingData.content.rendered ,'id':mapingData.id , 
                                        'phone':mapingData.acf.phone_number,
                                   'email':mapingData.acf.email_address,
                                   'address':mapingData.acf.address,
                                        'map': mapingData.acf.map_location}) 
                                        }}
                                ><Text> Details</Text></Button>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })
            )

        }
    }

}
class RestScreen extends React.Component {
    state = {counter: 0,  data: [], loaded: 0}
    static navigationOptions = {
        header: null,
    };

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            .then((response)=> response.json())
            .then((resJson)=>{
                this.setState({
                    data: resJson, loaded: 1}, function(){
                    console.log(resJson);
                });
            })
    }

    render() {
    return (
        <Container>
                <ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{
                           width:'100%',height:80}}>
                             <Text style={{fontWeight: 'bold', color: '#fff' , marginTop:20 , marginLeft: 30 ,fontSize: 20}}>Rest</Text>
                       
                        </ImageBackground>
            <Content>
                {this.returnData()}
            </Content>

        </Container>
    );
  }

    returnData(){
        if(this.state.loaded === 0){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner/>
                    <Text>Loading</Text>
                </View>
            )
        }else {
            return(
                this.state.data.map((mapingData)=>{
                    return(

                        <Card key={mapingData.id}>
                            <CardItem >
                                <Left style={{flex: 2}}>
                                    <Image
                                        style={{width: 120, height: 150, borderRadius: 10}}
                                        source={{uri: mapingData.better_featured_image.source_url}} />
                                </Left>
                                <Body style={{flex: 3}}>
                                    <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingData.title.rendered}</Text>
                                    <Text style={{color: '#999', marginTop: 10}}>{mapingData.excerpt.rendered}</Text>
                                    <Button success style={{width: 100 ,height: 30,borderRadius:15, marginTop: 10,
                                    justifyContent: 'center'}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('detailView', {'title': mapingData.title.rendered, 
                                        'image': mapingData.better_featured_image.source_url, 
                                        'content':mapingData.content.rendered ,'id':mapingData.id , 
                                        'phone':mapingData.acf.phone_number,
                                   'email':mapingData.acf.email_address,
                                   'address':mapingData.acf.address,
                                        'map': mapingData.acf.map_location}) 
                                        }}
                                ><Text> Details</Text></Button>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })
            )

        }
    }

}
class WhatScreen extends React.Component {
    state = {counter: 0, title: "About", data: [], loaded: 0}
    static navigationOptions = {
        header: null,
    };

    componentDidMount(): void {
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2")
            .then((response)=> response.json())
            .then((resJson)=>{
                this.setState({
                    data: resJson, loaded: 1}, function(){
                    console.log(resJson);
                });
            })
    }

    render() {
    return (
        <Container>
                <ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{
                           width:'100%',height:80}}>
                             <Text style={{fontWeight: 'bold', color: '#fff' , marginTop:20 , marginLeft: 30 ,fontSize: 20}}>What</Text>
                       
                        </ImageBackground>

            <Content>
                {this.returnData()}
            </Content>

        </Container>
    );
  }

    returnData(){
        if(this.state.loaded === 0){
            return(
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner/>
                    <Text>Loading</Text>
                </View>
            )
        }else {
            return(
                this.state.data.map((mapingData)=>{
                    return(

                        <Card key={mapingData.id}>
                            <CardItem >
                                <Left style={{flex: 2}}>
                                    <Image
                                        style={{width: 120, height: 150, borderRadius: 10}}
                                        source={{uri: mapingData.better_featured_image.source_url}} />
                                </Left>
                                <Body style={{flex: 3}}>
                                    <Text style={{fontWeight: 'bold', color: '#000'}}>{mapingData.title.rendered}</Text>
                                    <Text style={{color: '#999', marginTop: 10}}>{mapingData.excerpt.rendered}</Text>
                               
                                    
                                <Button success style={{width: 100 ,height: 30,borderRadius:15, marginTop: 10,
                                    justifyContent: 'center'}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('detailView', {'title': mapingData.title.rendered, 
                                        'image': mapingData.better_featured_image.source_url, 
                                        'content':mapingData.content.rendered ,'id':mapingData.id , 
                                        'phone':mapingData.acf.phone_number,
                                   'email':mapingData.acf.email_address,
                                   'address':mapingData.acf.address,
                                        'map': mapingData.acf.map_location}) 
                                        }}
                                ><Text> Details</Text></Button>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })
            )

        }
    }

}

const Home = createMaterialBottomTabNavigator({
  Home: { screen: HomeScreen ,   navigationOptions: {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (tintColor == 'green' ?
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/ghome.png')} />
      :
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/home.png')} />

    )
  }, },
  Search: { screen: SearchScreen ,    navigationOptions: {
    tabBarLabel: "Search",
    tabBarIcon: ({ tintColor }) => (tintColor == 'green' ?
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/gfilter.png')} />
      :
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/filter.png')} />

    )
  }, },
  Place :{ screen :placesScreen  ,     navigationOptions: {
    tabBarLabel: "Find Places",
    tabBarIcon: ({ tintColor }) => (tintColor == 'green' ?
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/gfind-places.png')} />
      :
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/find-places.png')} />

    )
  },},
  Rest :{ screen :RestScreen , 
    navigationOptions: {
      tabBarLabel: "Restaurants",
      tabBarIcon: ({ tintColor }) => (tintColor == 'green' ?
        <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/grestaurants.png')} />
        :
        <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/restaurants.png')} />

      )
    }, },
  What :{ screen :WhatScreen  ,    
     navigationOptions: {
    tabBarLabel: "Things to do",
    tabBarIcon: ({ tintColor }) => (tintColor == 'green' ?
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/gtodo.png')} />
      :
      <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('./Icons/todo.png')} />

    )
  },},

} ,
{
    initialRouteName: 'Home',
    activeTintColor: 'green',
    inactiveColor: 'grey',
    barStyle: { backgroundColor: 'white' },

  },
);

export default createAppContainer(Home);