import React, { Component } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

import ProposalListe from "./components/Proposal/ProposalListe";
import ProposalListeWithVote from "./components/Proposal/ProposalListeWithVote";
import AdminPanel from "./components/Admin/AdminPanel";
import AdminVoters from "./components/Admin/AdminVoters";
import Address from "./components/Address/Address";
import Message from "./components/Message/Message";
import ProposalWinner from "./components/Proposal/ProposalWinner";

class App extends Component {

  state = { web3: null, contract: null, currentStep: 0, isAdmin: false, isVoter: false, accounts: null, voters: null, proposals: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      let options = {
        fromBlock: 0,
        toBlock: 'latest'
      };

      // Récupération de l'adresse du propriétaire du contrat
      let contractOwnerAddresse = await instance.methods.owner().call();

      // Vérification si l'on est admin
      let isAdmin = false;
      if ( contractOwnerAddresse === accounts[0] ) {
        isAdmin = true;
      }

     // Recherche de la liste des Voters
     let listVoters = await instance.getPastEvents('VoterRegistered', options);

      // Vérification si l'on est un voter
      let isVoter = false;
      if( listVoters.length !== 0 ) {
        for(let i=0; i<listVoters.length; i++){
          if(listVoters[i].returnValues.voterAddress === accounts[0]){
            isVoter = true;
          }
        }
      }

      // Recherche du WorkflowStatus
      let currentStep = await instance.methods.workflowStatus().call();

      // Recherche de la liste des propositions
      let listProposals = await instance.getPastEvents('ProposalRegistered', options);   
      
      // Construction du tableau des propositions
      let proposals=[];
      for(let j=0; j < listProposals.length; j++){
        proposals.push(await instance.methods.getOneProposal(listProposals[j].returnValues.proposalId).call({from: accounts[0]}));
      }
  
      // Subscribe à l'event WorkflowStatusChange pour adapter l'affichage
      instance.events.WorkflowStatusChange(options)
        .on('data', event => {
          let currentStepFromEvent = event.returnValues.newStatus;
          this.setState({currentStep:currentStepFromEvent});
        }
      );
        
      // Update des informations du state
      this.setState({ web3, contract: instance, currentStep, isAdmin, isVoter, accounts, voters: listVoters, proposals: proposals});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // Enregistrement d'une proposition
  addProposal = async () => {
    const {accounts, contract} = this.state;
    let proposal = document.getElementById("propositionValue").value;

    await contract.methods.addProposal(proposal).send({from: accounts[0]});

    let options = {
      fromBlock: 0,
      toBlock: 'latest'
    };

    // rafraichis la liste des proposals
    let listProposals = await contract.getPastEvents('ProposalRegistered', options);  
    let proposals = [];
    for(let j=0; j < listProposals.length; j++) {
      proposals.push(await contract.methods.getOneProposal(listProposals[j].returnValues.proposalId).call({from: accounts[0]}));
    }

    // Update de la liste des propositions dans le state
    this.setState({proposals:proposals});

    document.getElementById("propositionValue").value = '';
  }

  // Enregistrement d'un vote
  vote = async() => {
    const { accounts, contract} = this.state;
    let votedId = document.getElementById("propositionId").value; 
    await contract.methods.setVote(votedId).send({from: accounts[0]});
   
    // Vide le champs de saisie
    document.getElementById("propositionId").value = '';
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    if (this.state.isAdmin === false && this.state.isVoter === false) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <div>Vous n'avez pas accès à cette application</div>
        </div>
      )
    }

    if( this.state.currentStep === '0' ) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <Message  currentStep={this.state.currentStep} />
          <AdminPanel currentStep={this.state.currentStep} isAdmin={this.state.isAdmin} state={this.state} />
        </div>
      );
    }

    if( this.state.currentStep === '1' ) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <Message  currentStep={this.state.currentStep} />
          <div className="text-center">
            <h2>Enregistrer votre proposition</h2>
            <input type="text" id="propositionValue" />
            <button onClick={this.addProposal}>Ajouter</button>
          </div>
          <ProposalListe proposals={this.state.proposals} />
          <AdminPanel currentStep={this.state.currentStep} isAdmin={this.state.isAdmin} state={this.state} />
        </div>
      );
    }

    if( this.state.currentStep === '2' ) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <Message  currentStep={this.state.currentStep} />
          <ProposalListe proposals={this.state.proposals} />
          <AdminPanel currentStep={this.state.currentStep} isAdmin={this.state.isAdmin} state={this.state} />
        </div>
      );
    }

    if( this.state.currentStep === '3' ) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <Message  currentStep={this.state.currentStep} />
          <div className="text-center">
            <h2>Votez pour votre proposition</h2>
            <input type="text" id="propositionId" />
            <button onClick={this.vote}>Voter</button>
          </div>
          <ProposalListe proposals={this.state.proposals} />
          <AdminPanel currentStep={this.state.currentStep} isAdmin={this.state.isAdmin} state={this.state} />
        </div>
      );
    }

    if( this.state.currentStep === '4' ) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <Message  currentStep={this.state.currentStep} />
          <ProposalListe proposals={this.state.proposals} currentStep={this.state.currentStep} />
          <AdminPanel currentStep={this.state.currentStep} isAdmin={this.state.isAdmin} state={this.state} />
        </div>
      );
    }

    if( this.state.currentStep === '5' ) {
      return (
        <div className="App">
          <Address addrr={this.state.accounts} />
          <Message currentStep={this.state.currentStep} />
          <ProposalWinner currentStep={this.state.currentStep}  state={this.state}  />
          <ProposalListeWithVote proposals={this.state.proposals} currentStep={this.state.currentStep} />
          <AdminPanel currentStep={this.state.currentStep} isAdmin={this.state.isAdmin} state={this.state} />
          <AdminVoters currentStep={this.state.currentStep} isAdmin={this.state.isAdmin}  state={this.state}  />
        </div>
      );
    }

  }
}

export default App;
