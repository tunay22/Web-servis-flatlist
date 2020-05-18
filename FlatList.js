import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';


export default class Ui extends Component {

  state = {
    text: '',
    gelendata:[],
    gelendatafull :[],
  };
  componentDidMount(){
    fetch('https://randomuser.me/api/?results=30')
    .then(response => response.json())
    .then(user => user.results)
    .then(user => {
      this.setState({
        gelendata: user,
        gelendatafull : user,
      });
    })
  }
  renderContextItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={[styles.itemConteiner, { backgroundColor: index % 2 === 1 ? '#F6F6F6' : '' }]}>
        <Image
          style={styles.avatarPicture}
          source={{ uri: item.picture.thumbnail }} />

        <View style={styles.textConteiner}>
          <Text style={styles.name} >{item.name.first} {item.name.last}</Text>
          <Text>{item.location.state} </Text>
        </View>
      </TouchableOpacity>
    )
  }
  searchFilter = text =>{
    const newData = this.state.gelendatafull.filter(item => {
      const ListItem =`${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`

      return ListItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      gelendata:newData,
    });
  };
  renderHeader = () => {
    const { text } = this.state;
    return (
      <View>
        <TextInput
          onChangeText={text =>{
            this.searchFilter(text);
            this.setState({
              text,
            });
          }}
          placeholder="SEARCH " style={styles.search}></TextInput>
      </View>
    )
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={this.renderHeader()}
          renderItem={this.renderContextItem}
          keyExtractor={item => item.login.uuid}
          data={this.state.gelendata} />
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  itemConteiner: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  avatarPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  textConteiner: {
    justifyContent: 'space-around'
  },
  search: {
    marginLeft: 20,
    padding: 10,

  }
});