import Relay from 'react-relay/classic';

export default class extends Relay.Route {
    static routeName = 'AppHomeRoute';
  static queries = {
      store: (component) => Relay.QL`
        query MainQuery {
          store {${component.getFragment('store')}}
        }
      `
  };

}
