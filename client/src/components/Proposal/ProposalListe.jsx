import React from 'react';
import './ProposalListe.css';

export default class ProposalListe extends React.Component {

    render() {
    
        return(
            <div className="liste">
                <div className='container message mb-4'>
                    <div className='row justify-content-center'>
                        <div className='col-6 pt-3 pb-2'>
                            <h2 className='text-center'>Liste des propositions</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#Id</th>
                                        <th>Proposition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.proposals.map((proposal, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{proposal.description}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
