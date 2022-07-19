import React from 'react';
import AdminWorkflow from "./AdminWorkflow";
import './AdminPanel.css';

export default class AdminPanel extends React.Component {
    
    // Ajout d'un voter
    addVoter = async () => {
        const { contract,accounts } = this.props.state;
        let valeur = document.getElementById("voterAddress").value;
        await contract.methods.addVoter(valeur).send({from: accounts[0]});

        // On vide le champs de saisie
        document.getElementById("voterAddress").value = ''; 
    }

    // Passage au step 1 du Workflow Status
    startStepProposalsRefistration = async() => {
        const { contract,accounts } = this.props.state;
        await contract.methods.startProposalsRegistering().send({from: accounts[0]});
    }

    // Passage au step 2 du Workflow Status
    endProposalsRegistering = async() => {
        const { contract,accounts } = this.props.state;
        await contract.methods.endProposalsRegistering().send({from: accounts[0]});
    }

    // Passage au step 3 du Workflow Status
    startVotingSession = async() => {
        const { contract,accounts } = this.props.state;
        await contract.methods.startVotingSession().send({from: accounts[0]});
    }

    // Passage au step 4 du Workflow Status
    endVotingSession = async() => {
        const { contract,accounts } = this.props.state;
        await contract.methods.endVotingSession().send({from: accounts[0]});
    }

    // Passage au step 5 du Workflow Status
    tallyVotes = async() => {
        const { contract,accounts } = this.props.state;
        await contract.methods.tallyVotes().send({from: accounts[0]});
    }

    render(){

        if (this.props.isAdmin === true) {

            if( this.props.currentStep === '0' ) {
                return(
                    <div className="adminpanel fixed-bottom">
                        <AdminWorkflow currentStep={this.props.currentStep} isAdmin={this.props.isAdmin} />
                        <div className='container'>
                            <div className='row'>
                                <div className='col-8 text-left'>
                                    <input type="text" id="voterAddress" /><button id="voterButton" className='btn btn-secondary mb-3' onClick={this.addVoter}>Add Voter</button>
                                </div>
                                <div className='col-4 text-right'>
                                    <button className='btn btn-primary  mb-3' onClick={this.startStepProposalsRefistration}>Start Proposals registration</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } 

            if( this.props.currentStep === '1' ){
                return(
                    <div className="adminpanel fixed-bottom">
                        <AdminWorkflow currentStep={this.props.currentStep} isAdmin={this.props.isAdmin} />
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 text-right'>
                                    <button className='btn btn-primary  mb-3' onClick={this.endProposalsRegistering}>Close Proposals registration</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
            if( this.props.currentStep === '2' ){
                return(
                    <div className="adminpanel fixed-bottom">
                        <AdminWorkflow currentStep={this.props.currentStep} isAdmin={this.props.isAdmin} />
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 text-right'>
                                    <button  className='btn btn-primary  mb-3' onClick={this.startVotingSession}>Start Voting Session</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
            if( this.props.currentStep === '3' ){
                return(
                    <div className="adminpanel fixed-bottom">
                        <AdminWorkflow currentStep={this.props.currentStep} isAdmin={this.props.isAdmin} />
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 text-right'>
                                    <button className='btn btn-primary mb-3' onClick={this.endVotingSession}>End Voting Session</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
            if( this.props.currentStep === '4' ){
                return(
                    <div className="adminpanel fixed-bottom">
                        <AdminWorkflow currentStep={this.props.currentStep} isAdmin={this.props.isAdmin} />
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 text-right'>
                                    <button className='btn btn-primary mb-3' onClick={this.tallyVotes}>Start tallyVotes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            
            if( this.props.currentStep === '5' ){
                return(
                    <div className="adminpanel fixed-bottom">
                        <AdminWorkflow currentStep={this.props.currentStep} isAdmin={this.props.isAdmin} />
                    </div>
                )
            }
        }
    }

}
