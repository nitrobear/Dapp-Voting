// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/// @title A voting system
/// @author Jean Szabo
/// @notice Ce contrat est utilisé pour la formation Ropsten
contract Voting is Ownable {

    /// @notice Identifiant de la proposition gagnante
    uint public winningProposalID;
    
    /// @notice Structure du Voter
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    /// @notice Structure de la proposition
    struct Proposal {
        string description;
        uint voteCount;
    }

    /// @notice Les différentes étapes du Workflow
    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /// @notice Le statut courant du Workflow
    WorkflowStatus public workflowStatus;
    
    /// @notice Le tableau des propositions
    Proposal[] proposalsArray;
    
    /// @notice Mapping sur l'adresse du Voter et la structure Voter correspondante
    mapping (address => Voter) voters;

    /// @notice Event pour indiquer l'enregistrement d'un Voter
    /// @param voterAddress L'adresse du Voter
    event VoterRegistered(address voterAddress); 
    
    /// @notice Event pour indiquer un changement de WorkflowStatus
    /// @param previousStatus Le statut actuel
    /// @param newStatus Le nouveau statut  
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    
    /// @notice Event pour indiquer l'enregistrement d'une Proposal
    /// @param proposalId L'identifiant de la Proposal
    event ProposalRegistered(uint proposalId);
    
    /// @notice Event pour indiquer l'enregistrement d'un vote
    /// @param proposalId L'identifiant de la Proposal
    event Voted (address voter, uint proposalId);

    /// @notice Modifier pour vérifier que seul les Voters peuvent effectuer cette action
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    /// @notice Récupère une structure Voter pour une adresse donnée
    /// @param _addr L'adresse du voter
    /// @return Voter La structure du Voter correspondand
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
    /// @notice Récupère une structure Proposal pour un id de proposition
    /// @param _id L'identifiant de la proposition
    /// @return Proposal La structure de la Proposal
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

    /// @notice Ajoute un Voter à la whiteList et émission d'un event VoterRegistered
    /// @param _addr L'adresse du voter
    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 
    /// @notice Ajoute une proposition à la liste des propositions et émission d'un event ProposalRegistered
    /// @param _desc La description de la proposition
    function addProposal(string memory _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer');
        
        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    /// @notice Enregistrement du vote et émission d'un event Voted
    /// @param _id L'identifiant de la proposition pour laquelle on vote
    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;
        
        // Enregistrement du gagant pour éviter une boucle dans tallyVotes
        if (proposalsArray[_id].voteCount > proposalsArray[winningProposalID].voteCount) {
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    /// @notice Passage au status ProposalsRegistrationStarted et émission d'un event WorkflowStatusChange
    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /// @notice Passage au status ProposalsRegistrationEnded et émission d'un event WorkflowStatusChange
    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /// @notice Passage au status VotingSessionStarted et émission d'un event WorkflowStatusChange
    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /// @notice Passage au status VotingSessionEnded et émission d'un event WorkflowStatusChange
    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /// @notice Passage au status VotesTallied et émission d'un event WorkflowStatusChange
   function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }

}
