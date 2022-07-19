import React from 'react';
import './ProposalWinner.css';

export default class ProposalWinner extends React.Component {

    state = { winningID: 0, winningDesc: null, winningCount: null};
        
    componentDidMount = async () => {
    
        const { contract, accounts } = this.props.state;

        // Récupération de l'Id de la proposition gagnante
        const winningID = await contract.methods.winningProposalID().call();

        // Récupération de la proposition gagnante
        const winningProposal= await contract.methods.getOneProposal(winningID).call({from: accounts[0]});

        this.setState({ winningID: winningID, winningDesc: winningProposal.description, winningCount: winningProposal.voteCount });
    }

    render(){
        return(
            <div className="winner">
                <div className='container message mb-4'>
                    <div className='row justify-content-center'>
                        <div className='col-6 pt-3 pb-2'>
                            <h2 className='text-center'>Nous avons notre grand gagnant!</h2>
                            <p> C'est la proposition <b>{this.state.winningDesc}</b>, de numéro d'id <b>{this.state.winningID}</b> avec <b>{this.state.winningCount}</b> votes. </p>         
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
