import React from 'react';
import axios from  'axios';
import { CartCard } from './CartCard';
import { Counter } from './Counter';
import { connect } from 'react-redux';
import { handleDelete } from './apiCalls/index'
import { bindActionCreators } from 'redux';

class Checkout extends React.Component {
    render(){

        const { cartData: { line_items = [], total_unique_items: totalItems, subtotal = {}}} = this.props;
        const { formatted_with_symbol: totalValue}  = subtotal;

        return(
            <React.Fragment>
                <p>Count is {this.props.count}</p>
                <div>
                    <CartCard
                        totalProducts={totalItems}
                        totalValue={totalValue}
                        onFeed={false}
                    />
                </div>
                <div>
                    {
                        line_items.map((cartItem, index) => {
                            const {media: { source }, name, price: { formatted_with_symbol }, quantity, id  } = cartItem;

                            return (
                                <div className="card mb-3" style={{maxWidth: '540px'}} key={index}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                        <img src={source} className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{name}</h5>
                                            <p className="card-text">Price - {formatted_with_symbol}</p>
                                            <p className="card-text">
                                                <Counter quantity={quantity} />
                                            </p>
                                            <button className='btn btn-danger' onClick={() => {this.props.handleDelete(id)}}>Delete</button>
                                        </div>
                                        </div>
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
        handleDelete: bindActionCreators(handleDelete, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);