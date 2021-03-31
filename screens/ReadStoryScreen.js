import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {

constructor () {
super();
this.state = {
allEntries : [],
lastVisibleEntry : null,
search:'',
searchWhere:'',
isSearchPressed:false,
}
}

componentDidMount = async()=> {

const entries = await db.collection('stories').limit(10).get();
entries.docs.map(
(item)=>{
this.setState({
allEntries:[...this.state.allEntries,item.data()],
lastVisibleEntry:item,
})
}
)
}

searchByFilter = async (arg1)=> {
const txt = this.state.search;
const entries = await db.collection('stories').where(arg1,'==',txt).limit(10).get()
entries.docs.map(
(item)=>{
console.log(item.data())
this.setState({
allEntries:[...this.state.allEntries,item.data()],
lastVisibleEntry:item,
})
}
)
}

fetchMoreEntries = async ()=> {
const searchPress = this.state.isSearchPressed;
const searchWhere = this.state.searchWhere;
const txt = this.state.search;
if (!searchPress){
const entries = await db.collection('stories').startAfter(this.state.lastVisibleEntry).limit(10).get()
entries.docs.map(
(item)=>{
this.setState({
allEntries:[...this.state.allEntries,item.data()],
lastVisibleEntry:item,
})
}
)
}
if (searchPress){
const entries = await db.collection('stories').startAfter(this.state.lastVisibleEntry).where(searchWhere,'==',txt).limit(10).get()
entries.docs.map(
(item)=>{
this.setState({
allEntries:[...this.state.allEntries,item.data()],
lastVisibleEntry:item,
})
}
)
}
}

render(){
return(
<KeyboardAvoidingView style = {styles.container}>
<Header
backgroundColor={'red'}
centerComponent={{
text: 'Bedtime Stories',
style: { color: '#fff', fontSize: 20 },
}}
/>
<SearchBar
placeholder="Search....."
onChangeText={(search)=>{
this.setState({
search:search,
})
}}
value = {this.state.search}
>
</SearchBar>
<View><TouchableOpacity onPress = {()=>{
this.setState({
searchWhere:'storyAuthor',
allEntries:[],
lastVisibleEntry:null,
isSearchPressed:true,
})
this.searchByFilter('storyAuthor')}
} style = {styles.button}>
<Text style = {styles.buttonText}>Search By Author</Text>
</TouchableOpacity>
<TouchableOpacity onPress = {()=>{
this.setState({
searchWhere:'storyTitle',
allEntries:[],
lastVisibleEntry:null,
isSearchPressed:true,
})              
this.searchByFilter('storyTitle')}
}  style = {styles.button}>
<Text style = {styles.buttonText}>Search By Title</Text>
</TouchableOpacity>
</View>

<FlatList
data = {this.state.allEntries}
renderItem = {
({ item })=>{
//console.log(item);
return(
<View style = {styles.flatListContainer}>
<Text style = {styles.flatListText}>{'Story Author: '+item.storyAuthor}</Text>
<Text style = {styles.flatListText}>{'Story Title: '+item.storyTitle}</Text>
</View>
)
}
}
keyExtractor = {
(item,index)=>{
return index.toString();
}
}
onEndReached = {this.fetchMoreEntries}
onEndReachedThreshold = {0.7}

></FlatList>
</KeyboardAvoidingView>
)
}
}  

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:'blue',
},
flatListContainer:{
backgroundColor:'yellow',
borderWidth:5,
borderColor:'black',
margin:5,
},
flatListText:{
color:'black',
paddingLeft:5,
},
flatList:{
backgroundColor: 'pink',
borderTopWidth:4,
borderColor:'pink',
},
button:{
padding:5,
marginTop:5,
backgroundColor:'white', 
width:115,
height:25,
alignSelf:'center',
},
buttonText:{
color:'black',
textAlign:'center',
fontSize:11,
}
})