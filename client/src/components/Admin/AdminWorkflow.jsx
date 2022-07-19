import React from 'react';
import './AdminWorkflow.css';

export default class AdminWorkflow extends React.Component {

    constructor(props) {
        
        super(props);

        this.step0Active = "";
        this.step1Active = "";
        this.step2Active = "";
        this.step3Active = "";
        this.step4Active = "";
        this.step5Active = "";
        
        if (this.props.currentStep === '0') {
            this.step0Active = " active";
        }

        if (this.props.currentStep === '1') {
            this.step1Active = " active";
        }

        if (this.props.currentStep === '2') {
            this.step2Active = " active";
        }

        if (this.props.currentStep === '3') {
            this.step3Active = " active";
        }

        if (this.props.currentStep === '4') {
            this.step4Active = " active";
        }

        if (this.props.currentStep === '5') {
            this.step5Active = " active";
        }
    }


    render(){

        if (this.props.isAdmin === true) {

            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <nav aria-label="breadcrumb">
                                <ol className='breadcrumb'>
                                    <li className={`breadcrumb-item ${this.step0Active}`}>RegisteringVoters</li>
                                    <li className={`breadcrumb-item ${this.step1Active}`}>ProposalsRegistrationStarted</li>
                                    <li className={`breadcrumb-item ${this.step2Active}`}>ProposalsRegistrationEnded</li>
                                    <li className={`breadcrumb-item ${this.step3Active}`}>VotingSessionStarted</li>
                                    <li className={`breadcrumb-item ${this.step4Active}`}>VotingSessionEnded</li>
                                    <li className={`breadcrumb-item ${this.step5Active}`}>VotesTallied</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            )

        }
    }

}
