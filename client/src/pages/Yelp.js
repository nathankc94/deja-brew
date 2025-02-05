import React, { Component } from "react";
import Search from "../components/YelpSearch/Search";
import { List, ListItem } from "../components/YelpSearch/Results";
import yelpapi from "../Utils/yelpapi";
import { Container } from "react-materialize";
//import SelectBtn from "../components/SelectBtn";
import "../pages/yelp.css";
import MedCard from "../components/MedCard";

const h1Styles = {
  textAlign: "center",
//  backgroundImage: "public/img/coffee_1.jpg",
  height: "300"
};

//import ParallaxCard from "../components/YelpSearch/Parallax"

class Yelp extends Component {
  state = {
    coffeeShops: {},
    search: "",
    name: "",
    rating: "",
    address: "",
    city: "",
    state: ""
  };

  componentDidMount() {
    this.searchYelp("64030");
  };

  searchYelp = query => {
    yelpapi.search(query)
      .then(res =>{
        const results = res.data.businesses;
        console.log('test', results);
        this.setState({coffeeShops: results})
      })
      .catch(err => console.log(err))
     }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchYelp(this.state.search);
  };

//   saveBook = (id) => {
//     GOOGLEAPI.save(id)
//        .then(res =>{
//          async function bookData (){
//          const results = await res.data;
//          const savedTA = {
//            title: results.volumeInfo.title,
//            author: results.volumeInfo.authors.join(', '),
//            description: results.volumeInfo.description,
//            image: results.volumeInfo.imageLinks.thumbnail,
//            link: results.volumeInfo.previewLink
//          }
//          console.log(res);
//          console.log(results);
//          console.log(savedTA);
//          API.saveBook(savedTA);
//          }
//          bookData();
//        })
//        .catch(err => console.log(err));
//   };
  
  render() {
    return (
      <>
      <Container>
        <h3>Search for Coffee Shop</h3>
        <div style={h1Styles}>
            <Search
              search={this.state.search}
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
            />
        </div>
      </Container>
      <Container>
        <div>
            <h4>Search Results</h4>
            
            {this.state.coffeeShops.length ? (
              <List>
              {this.state.coffeeShops.map(res => (
                  <ListItem key={res.id}>
                    <strong>
                      {res.name} 
                      <br></br>
                    </strong>
                      rating: {res.rating} 
                      <br></br>
                    <strong>
                      Location: <nbsp></nbsp>
                    </strong>  
                      {res.location.address1}
                      <br></br>
                      {res.location.city}, {res.location.state}
                      <br></br>
                      <br></br>
                    <img src={res.image_url} alt="shop" height="300" width="300"></img>
                    <br></br>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </div>
      </Container>
      </>
    )
    
  }
}

export default Yelp;