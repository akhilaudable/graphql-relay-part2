import Relay from 'react-relay';

export default class create extends Relay.Mutation {


  getMutation(){
    if(this.props.keyIndex == 1){
      return Relay.QL`
      mutation{ ordersmutation }`;
    }
  }


  //The getVariables function transforms data passed into the constructor of the mutation into the structure needed by the GraphQL
  // server to perform the mutation. The data passed into the constructor are made available on the props of the Relay mutation object.
   getVariables(){

     return {
       values: this.props.values,
       keyIndex : this.props.keyIndex
     };
   }

  //getFatQuery is used to retrieve all of the data needed to update the application once the mutation has been completed.
  getFatQuery(){

  if(this.props.keyIndex == 1){
      return Relay.QL`
      fragment on OrdersMutationPayload{
            ordersOutput
      }`;
    }

  }


 //Finally, the getConfigs method tells Relay how to deal with the response data.
  getConfigs() {

  }

  getOptimisticResponse() {
    // return {
    //
    // };
  }



}
