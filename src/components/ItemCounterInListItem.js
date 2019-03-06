import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    dispatch_QuickDeleteThisItemFromQuantity,
    dispatch_QuickIndecrementItemFromQuantity
} from '../actions/ordercontrolactions';

/***************************************************************************************************
 *  Custom component to increment and decrement value within a minimum and
 * maximum range. A local count will be maintained to help with validation
 * @param name Identifier for this counter
 * @param min Minimum allowable value
 * @param max Maximum allowable value
 **************************************************************************************************/
class ItemCounterInListItem extends Component {

    /***********************************************************************************************
     * 
     **********************************************************************************************/
    deleteThisItem = (e) => {
        e.preventDefault();
        let P = this.props.itemsList.find(I => I.productID === this.props.name).price;
        this.props.dispatch_QuickDeleteThisItemFromQuantity(
            this.props.name, this.props.currentOrderID, this.props.count, P, this.props.passKey);
    }

    /***********************************************************************************************
     * 
     **********************************************************************************************/
    incrementItemCount = (e) => {
        e.preventDefault();
        if (this.props.count !== this.props.max) {
            let P = this.props.itemsList.find(I => I.productID === this.props.name).price;
            this.props.dispatch_QuickIndecrementItemFromQuantity(
                this.props.name, true, this.props.currentOrderID, P);
        }
    }

    /***********************************************************************************************
     * 
     **********************************************************************************************/
    decrementItemCount = (e) => {
        e.preventDefault();
        if (this.props.count > this.props.min) {
            let P = this.props.itemsList.find(
                I => I.productID === this.props.name).price;
            this.props.dispatch_QuickIndecrementItemFromQuantity(this.props.name, false, P);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="Item-Group">
                        <button type="button" className="btn btn-secondary"
                            onClick={this.incrementItemCount}>&#43;</button>
                        <div style={{ width: '3em', textAlign: 'center' }}>
                            <span className="input-group-text" style={{
                                display: 'inline-block', borderRadius: '0px',
                                width: '100%', height: '100%'
                            }}>{this.props.count}</span></div>
                        <button type="button" className="btn btn-secondary"
                            onClick={this.decrementItemCount}>&#8722;</button>
                    </div>
                    <div className="btn-group"
                        role="group" aria-label="Delete-Group" style={{ marginLeft: '10px' }}>
                        <button
                            type="button" className="btn btn-danger"
                            onClick={this.deleteThisItem}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ItemCounterInListItem.propTypes = {
    dispatch_QuickIndecrementItemFromQuantity: PropTypes.func.isRequired,
    dispatch_QuickDeleteThisItemFromQuantity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    passKey: state.uac.passKey,
    itemsList: state.ord.itemsList,
    currentOrderID: state.ord.currentOrderID
});

export default connect(mapStateToProps, {
    dispatch_QuickIndecrementItemFromQuantity,
    dispatch_QuickDeleteThisItemFromQuantity
})(ItemCounterInListItem);
