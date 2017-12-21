import React from 'react';
import Relay from 'react-relay/classic';
import create from '../mutations/create';
import 'babel-polyfill';
  //  "react": "^16.0.0-alpha.12",
  //   "react-dom": "^16.0.0-alpha.12",

class App extends React.Component {

constructor (props){
super(props);

    this.state = {

    }

}
 handler =(e) => {
   console.log("akhila");
    var value = {
      book_id : e.target.id,
      quantity : document.getElementById("quantity"+e.target.id).value
    }
    console.log(this.props.relay,"a")
    Relay.Store.commitUpdate(
       new create({
         values: value,
         keyIndex: 1
       })
     );
console.log("b")
    // console.log(values);

  }

  render() {
    //console.log(this.props.store)
    return (
      <div>
      {this.props.store.books.map((book,i)=>{
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
          })}
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
