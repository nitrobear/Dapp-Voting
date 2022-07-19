import React from 'react';
import './Address.css';


export default class Address extends React.Component {

    render(){
        return(
            <div className='container-fluid header mb-4 sticky-top'>
                <div className='row'>
                    <div className='col-6'>
                        <img src="/Dapp-Voting/voting_logo.png" width="70" id="logo" alt="voting system logo" />
                    </div>
                    <div className='col-6 px-2 text-right'>
                        <p className='px-3 pt-3'>Votre adressse : <b>{this.props.addrr}</b></p>
                    </div>
                </div>
            </div>
        )
    }

}
