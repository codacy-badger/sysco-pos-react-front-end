import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ListItemInSingleOrder from './ListItemInSingleOrder';

class SingleOrder extends Component {

    /**************************************************************************
     * Sets the current order in context as this order and redirects user to
     * view_order where it will fetch the order details and display content of
     * the order to user
     *************************************************************************/
    VIEW_THIS_ORDER = () => {
        this.props.SET_THIS_ORDER_AS_CURRENT();
        this.props.history.push('/view_order');
    }

    /**************************************************************************
     * Sets the current order in context as this order and ...
     *************************************************************************/
    EDIT_THIS_ORDER = () => {
        this.props.SET_THIS_ORDER_AS_CURRENT();
        this.props.editThisOrder(this.props._id);
        this.props.history.push('/edit_order');
    }

    render() {
        let { _id, items } = this.props.ORDER;
        let totalCost = 0;
        for (var i = 0; i < items.length; i++) {
            let { quantity, price } = items[i];
            totalCost += (quantity * price);
        }
        return (
            <div className="card border-dark shadow" style={{ margin: '10px 0px' }}>
                <div className="card-header text-white bg-dark" style={{ padding: '.75em .1em' }}>
                    <div className="row" style={{ width: '100%', margin: '0px' }}>
                        <div className="col-10 d-flex justify-content-start">
                            Order ID: {_id}</div>
                        <div className="col-2 d-flex justify-content-end">
                            <b>Rs. {totalCost.toFixed(2)}</b>
                        </div>
                    </div>
                </div>
                <ul className="list-group list-group-flush">
                    {items.map((item) => (
                        <ListItemInSingleOrder
                            key={item._id}
                            singleItem={item} />
                    ))}
                </ul>
                <div className="card-footer d-flex justify-content-end">
                    <Link to="#" className="card-link" onClick={this.VIEW_THIS_ORDER}>View</Link>
                    <Link to="#" className="card-link edit-order" onClick={this.EDIT_THIS_ORDER}>Edit</Link>
                    <Link to="#" className="card-link delete" onClick={this.props.DELETE_THIS_ORDER}>Delete</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SingleOrder);