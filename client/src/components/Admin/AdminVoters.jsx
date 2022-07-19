import React from 'react';

export default class AdminVoters extends React.Component {
            
    state = { votersList: [], votersAddressList: []};

    componentDidMount = async () => {
    
        const { contract, accounts } = this.props.state;

        let options = {
            fromBlock: 0,
            toBlock: 'latest'
          };

        // Recherche de la liste des voters
        let listVoters = await contract.getPastEvents('VoterRegistered', options);   
      
        // Construction du tableau des voters
        let votersListing = [];
        let votersAdressListing = [];
        for(let j=0; j < listVoters.length; j++){
            votersListing.push(await contract.methods.getVoter(listVoters[j].returnValues.voterAddress).call({from: accounts[0]}));
            votersAdressListing.push(listVoters[j].returnValues.voterAddress);
        }

        this.setState({ votersList: votersListing, votersAddressList: votersAdressListing });
    }

    render(){
        return(
            <div className="voters">
                <div className='container message mb-4'>
                    <div className='row  justify-content-center'>
                        <div className='col-10 pt-3 pb-2'>
                            <h2 className='text-center'>Liste des Voters et des votes</h2>
                            <p className='text-center'>Affichage de la whitelist pour l'administrateur, ainsi que des votes des personnes.</p>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>#id</th>
                                        <th>Address</th>
                                        <th className='text-center'>hasVoted</th>
                                        <th className='text-center'>isRegistered</th>
                                        <th className="text-end">votedProposalId</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.votersList.map((voter, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{this.state.votersAddressList[index]}</td>
                                        <td className='text-center'>{String(voter.hasVoted)}</td>
                                        <td className='text-center'>{String(voter.isRegistered)}</td>
                                        <td className="text-end">{voter.votedProposalId}</td>
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
