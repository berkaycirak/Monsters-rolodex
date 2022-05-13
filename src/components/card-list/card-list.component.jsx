import { Component } from 'react';
import './card-list.styles.css';
import Card from '../card/card-component';

class CardList extends Component {
  render() {
    // this.props will give us an object including properties of component. We can destructure which property we want.
    const { monsters } = this.props;
    return (
      <div className='card-list'>
        {monsters.map((monster) => (
          // since monster is an object that contains name, email, ... properties, we can destruct it.

          <Card key={monster.id} type={monster} />
        ))}
      </div>
    );
  }
}

export default CardList;
