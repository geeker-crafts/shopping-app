import React from 'react';
import axios from 'axios';
import { CartCard } from './CartCard';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { loadCartDataIfAlreadyCreated, createCartForFirstTime, addItemToCart } from './apiCalls/index';

class ProductFeed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
        }
    }

    loadProducts = () => {
        axios({
            url: "https://api.chec.io/v1/products",
            method: "GET",
            params: {
                limit: 25
            },
            headers: {
                "X-Authorization": "pk_18506b82013b046be195347e8aaa4de88f31e549b7943",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            this.setState({
                products: response.data.data
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.loadProducts();

        localStorage.getItem('cartID') ?
        this.props.loadCardData() :
        this.props.createCart()
    }

    renderButton = (productID) => {
        if(this.props.cartProductIds.includes(productID)){
            return(
                <button className="btn btn-secondary">Added</button>
            )
        } else {
            return (
                <button className="btn btn-success" onClick={() => {this.props.addItemToCart(productID)}}>Add Item</button>
            )
        }
    }

    render(){

        const { cartData: { id, total_unique_items, subtotal } } = this.props;
        const { count } = this.props;

        console.log(this.props);

        return(
            <React.Fragment>
                <p>Message count {this.props.count}</p>
                <button onClick={() => { this.props.changeMessageCount() }}>Change count</button>
                {
                    id &&
                    <CartCard
                        title={'Cart'}
                        totalProducts={total_unique_items}
                        totalValue={subtotal.formatted_with_symbol}
                        onFeed={true}
                    />
                }

                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        this.state.products.map((product, index) => {
                            return(
                                <div className="card" style={{width: '18rem', margin: '10px'}} key={index}>
                                    <img src={product.media.source} className="card-img-top" style={{height: '200px'}} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="badge badge-pill badge-secondary">{product.price.formatted_with_symbol}</p>

                                        <p className="card-text" dangerouslySetInnerHTML={{__html: product.description}}></p>
                                        {
                                            product.active ? this.renderButton(product.id) : <div className='text-danger'>Currently Unavailable</div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.messageCount,
        cartData: state.cartData,
        cartProductIds: state.cartProductIds
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMessageCount: () => { dispatch({type: 'CHANGE_COUNT', data: 20}) },
        loadCardData: bindActionCreators(loadCartDataIfAlreadyCreated, dispatch),
        createCart: bindActionCreators(createCartForFirstTime, dispatch),
        addItemToCart: bindActionCreators(addItemToCart, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductFeed);