import React, { Component } from 'react';
import ItemCounterInListItem from './ItemCounterInListItem';

class ListItemInOrder extends Component {

    render() {
        let { productID, productTitle, description, quantity, price } = this.props.ITEM;
        return (
            <li className="list-group-item d-flex justify-content-right"
                style={{ margin: '0px', padding: '0px', width: '100%' }}>
                <div className="row" style={{ margin: '0px', width: '100%' }}>
                    <div className="col-8 card">
                        <div className="card-body" style={{ padding: '5px 0px' }}>
                            <h6 className="card-title d-flex justify-content-right">
                                {productTitle}</h6>
                            <p className="card-subtitle text-muted d-flex justify-content-right"
                                style={{ textAlign: 'initial' }}>{description}</p>
                        </div>
                    </div><div className="col-2 card">
                        <div className="card-body d-flex align-items-center"
                            style={{ padding: '5px 0px' }}>
                            <ItemCounterInListItem
                                NAME={productID}
                                MIN={0}
                                MAX={quantity + (this.props.CLONEITEMQUANTITY === undefined
                                    ? 0 : this.props.CLONEITEMQUANTITY)}
                                COUNT={this.props.ITEMQUANTITY} />
                        </div>
                    </div>
                    <div className="col-2 card text-right">
                        <p className="card-text"
                            style={{ margin: '5px 0 0 0' }}>{quantity} Nos</p>
                        <p className="card-link"
                            style={{ margin: '0px' }}>@ <b>Rs. {price.toFixed(2)}</b></p>
                    </div>
                </div>
            </li>
        );
    }
}

export default ListItemInOrder;