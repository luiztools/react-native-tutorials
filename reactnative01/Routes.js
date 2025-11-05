import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Pages/Home';
import Form from './Pages/Form';

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{
                headerShown: false
            }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Form" component={Form} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;