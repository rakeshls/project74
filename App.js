import * as React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReadStoryScreen from './screens/ReadStoryScreen';
import WriteStoryScreen from './screens/WriteStoryScreen';
export default class App extends React.Component {
render(){
return(
<AppContainer />
)
}
}

const tabNavigator = createBottomTabNavigator({
ReadStory:{screen:ReadStoryScreen},
WriteStory:{screen:WriteStoryScreen},
},

{
defaultNavigationOptions: ({navigation})=> {
return(
{tabBarIcon: ()=> {
const routeName = navigation.state.routeName
if(routeName=='ReadStory'){
return(
<Image source = {require('./assets/openBook.png')} style = {{width:32, height:32}}></Image>
) 
}
else if(routeName=="WriteStory"){
return(
<Image source = {require('./assets/writeAStory.png')} style = {{width:32,height:32}}></Image>
)
}
}
}
)
}
}
)
const AppContainer = createAppContainer(tabNavigator)