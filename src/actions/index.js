import alt from '../alt';
import firebase from 'firebase';
import _ from 'lodash';
var configs = require('./config');

class Actions {

  constructor() {

    this.config = {
    apiKey: configs.apiKey,
    authDomain: configs.authDomain,
    databaseURL: configs.databaseURL,
    storageBucket: configs.storageBucket
    };

  }


  initSession() {

    firebase.initializeApp(this.config);

    return (dispatch) => {
      var user;
      firebase.auth().onAuthStateChanged((current)=>{
        console.log(current);
      if (current) {
        user = {
          id: current.uid,
          name: current.displayName,
          avatar: current.photoURL
        }
      } else {
        user = null;
      };
      setTimeout(() => dispatch(user));
      });
    }
  }

  login() {

    return (dispatch) => {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
      // The signed-in user info.
      var user = {
        id: result.user.uid,
        name: result.user.displayName,
        avatar: result.user.photoURL
      }
      firebase.database().ref().child("users").child(result.user.uid).set(user);

      dispatch(user);
      });
    }

    this.getProducts();
  }

  logout() {

    return (dispatch) => {
      firebase.auth().signOut().then(function() {
        dispatch(null);
      }, function(error) {
        console.log("error logging out: ", error);
      });
    }
    this.getProducts();
  }

  getProducts() {
    return (dispatch) => {
      var db = firebase.database();
      var ref = db.ref("/products");

      ref.on('value', (snapshot) => {
        var productsValue = snapshot.val();

        var products = _(productsValue).keys().map((productKey) => {
          var item = _.clone(productsValue[productKey]);
          item.key = productKey;
          return item;
        })
        .value();

        console.log(products);
        dispatch(products);
      });
    }
  }

  addProduct(product) {
      return (dispatch) => {
        var db = firebase.database();
        var ref = db.ref("/products");

        ref.push(product);
      }
  }

  addVote(productID, userID) {
    console.log(productID);
    console.log(userID);

    return (dispatch) => {
      var db = firebase.database();

      var ref = db.ref('products').child(productID).child('upvote');
      var vote = 0;
      ref.on('value', (snapshot) => {
        vote = snapshot.val();
      });
      ref.set(vote + 1);
    }
  }

}
export default alt.createActions(Actions);
