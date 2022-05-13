// Class Component
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

// We create an App class, then we will render that App class in index.js
class App extends Component {
  // constructor function will run first when App class is called.
  constructor() {
    // super function let us to inherit properties and methods of component class.
    super();

    // we define a state object including monsters and searchInput keys.
    this.state = {
      monsters: [],
      searchInput: '',
    };
  }

  // At that point, we have an App component including Component's properties and state object.

  // This is an life-cycle method. That method will be run when our App component mount to the DOM tree.
  // Life-cycle method will run after render function.
  componentDidMount() {
    // When our component mount, we fetch data from the external server. Fetch API returns us a promise, we can catch it by using then method. Then method also returns us a promise so we can again use a then method.
    // Note that, fetch is an async function.
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      // We change the state at that point, and setState function triggers re-render on React.
      .then((users) =>
        this.setState(() => {
          // In Fetch API, data type of users is array which is same data type like our monsters array in state object.
          return { monsters: users };
        })
      );
  }

  // We define a method in order to optimize our callback inside the onChange property.
  // Our method will take an event parameter which will be created after the onChange event.
  onSearchChange = (event) => {
    // we should declare a variable in order to get data from the input when there is a change on the input.
    const searchInput = event.target.value.toLocaleLowerCase();

    // We change our searchInput in the state object.
    this.setState(() => {
      return { searchInput };
    });
  };

  // render method will run after the constructor method runs.
  render() {
    // In order to use less this.state or this word, we do destructuring.
    // since monsters and searchInput are a property inside the state object, we can match them.
    const { monsters, searchInput } = this.state;
    const { onSearchChange } = this;

    // Filter function results in a new array. Therefore, we can declare a new array to assign filter function.
    // Filter function takes each element inside the monsters array in state object, then it returns something into new Array.

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchInput);
    });

    return (
      <div className='App'>
        <h1 className='app-title'> Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder='Search monster'
          className='search-box monster-search-box'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

// Function Component
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
