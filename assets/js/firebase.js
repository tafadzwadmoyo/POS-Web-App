// Set the configuration for your app
// TODO: Replace with your project's config object
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbPBWoGJ0jDOFRbu4XhwIhKJ8DSqvgH-A",
    authDomain: "point-of-sale-c7441.firebaseapp.com",
    databaseURL: "https://point-of-sale-c7441.firebaseio.com",
    projectId: "point-of-sale-c7441",
    storageBucket: "gs://point-of-sale-c7441.appspot.com",
    messagingSenderId: "173829589356"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

//products
var productsRef = firebase.database().ref('/products/');


/*

var productsRef = firebase.database().ref('products');
var newPostKey = firebase.database().ref().child('products').push().key;
updates['/products/' + newPostKey] = productData;
console.log(firebase.database().ref().update(updates));

productData = {
    "c-price": 75,
    "name": "Nike Running Shoes",
    "s-price": 130,
    "stock": 30
}
var newPostKey = firebase.database().ref().child('products').push().key;
updates['/products/' + newPostKey] = productData;
console.log(firebase.database().ref().update(updates));
/*starCountRef.on('value', function(snapshot) {
    updateStarCount(postElement, snapshot.val());
});*/

/*
// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'BBN.jpg'
var productRef = storageRef.child('images/products/BBN.jpg');

*/