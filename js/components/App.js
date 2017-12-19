import React from 'react';
import Relay from 'react-relay/classic';
import create from '../mutations/create';
import 'babel-polyfill';

class App extends React.Component {

constructor (props){
super(props);

    this.state = {

    }

}
 // handler =(e) => {
 //    var value = {
 //      book_id : e.target.id,
 //      quantity : document.getElementById("quantity"+e.target.id).value
 //    }
 //
 //    this.props.relay.commitUpdate(
 //       new create({
 //         values: value,
 //         keyIndex: 1
 //       })
 //     );
 //
 //    console.log(values);
 //
 //  }

  render() {
    //console.log(this.props.store)
    return (
      <div>
        {/*  {this.props.store.books.map((book,i)=>{
                return( <ul key={i} style = {{"listStyleType": "none"}}>
                  <li>
                  Book Name :   {book.title}
                  </li>

                  <li>
                  Author :  {book.author}
                  </li>

                 <li>Quantity :
                        <input type="number" id={"quantity"+book.id}>
                        </input>
                  </li>

                  <li>
                  <button type = "button" id={book.id} onClick={this.handler}>Buy</button>
                  </li>


                  </ul>
                )
          })} */}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
  store: ()=> Relay.QL`
    fragment on Store{
      books{
        id,
        title,
        author
      }
    }`

  },
});
