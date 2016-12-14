import React from 'react';
// import Greetings from './Greetings';
import NavigationBar from "./NavigationBar";
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
    render() {
        return (
            //<h1>Hello from react</h1>
            //<Greetings />
            <div className = "container">
                <NavigationBar />
                <FlashMessagesList />
                { this.props.children }
            </div>
        );
    }
}

export default App;
