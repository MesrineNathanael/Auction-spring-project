import { Button, Container, FormFeedback } from "reactstrap";
import React from "react";
import { Form, Row, Col } from "reactstrap";
import { MenuItem, Select, FormControl, InputLabel} from "@mui/material";
import { Box } from "@mui/system";
import "./PageAuctionSell.css"
import { withRouter } from "react-router-dom";

//need this function to be a class component
class PageAuctionSell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products: [],
            users: [],
            productsToShow: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/categories/all', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => this.setState({ categories: data }));
        fetch('http://localhost:8080/products/all', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => this.setState({ products: data, productsToShow: data }));
        fetch('http://localhost:8080/users/all', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => this.setState({ users: data }));
    }

    filterProducts(searchName){
        this.setState({searchBar: searchName})

        console.log("clients : " + this.state.searchBar)
        if(searchName != ""){
            this.setState({productsToShow: this.state.products.filter(product => product.name.toUpperCase().includes(searchName.toUpperCase()))}) 
        }else{
            console.log("vide");
            this.setState({productsToShow: this.state.products})
        }

    }

    render() {
        return (
            <div className="main">
                <div className="searchMain">
                    <div className="search">
                        <Form>
                            <Row form>
                                <Col md={6}>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.category}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.categories.map((category) => (
                                                <MenuItem value={category.id}>{category.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col md={6}>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={this.state.user}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.users.map((user) => (
                                                <MenuItem value={user.id}>{user.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="categ">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="Select_categ">Catégories</InputLabel>
                                <Select label="Catégories" labelId="Select_categ">
                                    <MenuItem value={0}>-------</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="products">
                    <div className="products-list">
                        {this.state.productsToShow.map((product) => (
                            <div className="product">
                                <div className="product-name">
                                    <p>{product.name}</p>
                                </div>
                                <div className="product-price">
                                    <p>{product.price}</p>
                                </div>
                                <div className="product-description">
                                    <p>{product.description}</p>
                                </div>
                                <div className="product-image">
                                    <img src={product.image} alt="product" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PageAuctionSell)
// export default function AuctionSell() {

//     //registration page
//     let jsonUser = JSON.parse(window.sessionStorage.getItem("user"));
//     console.log(jsonUser.id)



//     //state of the form
//     const [formState, setFormState] = React.useState({
//         name: "",
//         description: "",
//         date_Begin: "",
//         date_End: "",
//         basePrice: "",
//         status: "",
//         idCatProduct: "",
//     });

//     //handle change of the form
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormState({
//             ...formState,
//             [name]: value,
//         });
//     };




//     //handle submit of the form
//     const handleSubmit = (event) => {
//         //check if fields are filled
//         if (
//             formState.name === "" ||
//             formState.description === "" ||
//             formState.date_Begin === "" ||
//             formState.date_End === "" ||
//             formState.basePrice === "" ||
//             formState.status === "" ||
//             formState.idCatProduct === ""
//         ) {
//             alert("Veuillez remplir tous les champs");
//             return;
//         }


//         event.preventDefault();
//         console.log(formState);
//         //send the form to the server via rest api
//         //rest api address : http://localhost:8080/users/add
//         //redirect to the login page
//         var url = "http://localhost:8080/products/add";
//         var data = {
//             name: formState.name,
//             description: formState.description,
//             dateBegin: formState.date_Begin,
//             dateEnd: formState.date_End,
//             base_Price: formState.basePrice,
//             status: formState.status,
//             idCategoryProduct: formState.idCatProduct,
//             idUserSeller: jsonUser.id
//         };
//         fetch(url, {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//             })
//     };

//     return (

//         <div className="content-profile">
//             <h1 className="profile-edit-title">Vendre un article</h1>
//             <p className="profile-edit-text">
//                 * : Champs obligatoires
//             </p>
//             <Form onSubmit={handleSubmit}>
//                 <div className="onefield">
//                     <div>
//                         <div>
//                             <label>* Nom :          </label>
//                             <input
//                                 type="text"
//                                 placeholder="Nom"
//                                 name="name"
//                                 value={formState.name}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>* Description :                              </label>
//                             <input
//                                 type="text"
//                                 placeholder="Description"
//                                 name="description"
//                                 value={formState.description}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>* Date de Début :                            </label>
//                             <input
//                                 type="date"
//                                 placeholder="Date de Début"
//                                 name="date_Begin"
//                                 value={formState.date_Begin}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>* Date de Fin :</label>
//                             <input
//                                 type="date"
//                                 placeholder="Date de Fin"
//                                 name="date_End"
//                                 value={formState.date_End}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label>* Prix de Base :                                  </label>
//                             <input
//                                 type="text"
//                                 placeholder="Prix de Base"
//                                 name="basePrice"
//                                 value={formState.basePrice}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <div>
//                             <label>* Status :                              </label>
//                             <input
//                                 type="text"
//                                 placeholder="Status"
//                                 name="status"
//                                 value={formState.status}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <Box className="box"  sx={{ minWidth: 120 }}>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="AuctionSell_cat">Catégories</InputLabel>
//                                     <Select className="cat" label="Catégories" labelId="AuctionSell_cat">
//                                         <MenuItem value={formState.idCatProduct}>-------</MenuItem>
//                                         <MenuItem value={formState.idCatProduct}>Catégorie 1</MenuItem>
//                                         <MenuItem value={formState.idCatProduct}>Catégorie 2</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                         </div>
//                     </div>
//                 </div>
//             </Form>
//             <Button className="inscription-button" type="submit" onClick={handleSubmit}>
//                 Ajouter l'enchère
//             </Button>
//         </div>
//     );

// }
