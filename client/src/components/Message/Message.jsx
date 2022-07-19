import React from 'react';

export default class Message extends React.Component {

    render(){

        this.message1 = "La soumission des propositions n'est pas encore ouvertes.";
        this.message2 = "Veuillez patienter jusqu'à ce que l'administrateur ouvre les soumissions.";

        if (this.props.currentStep === '1') {
            this.message1 = "La soumission des propositions est ouvertes.";
            this.message2 = "Vous pouvez soumettre vos propositions.";
        }

        if (this.props.currentStep === '2') {
            this.message1 = "Les votes pour les propositions ne sont pas encore ouverts.";
            this.message2 = "Veuillez patienter jusqu'à ce que l'administrateur ouvre les votes.";
        }

        if (this.props.currentStep === '3') {
            this.message1 = "Les votes pour les propositions sont ouverts.";
            this.message2 = "Vous pouvez voter pour votre proposition préférée.";
        }

        if (this.props.currentStep === '4') {
            this.message1 = "Les votes pour les propositions sont clos.";
            this.message2 = "Vous devez attendre le dépouillement par l'administrateur pour connaitre le gagnant.";
        }

        if (this.props.currentStep === '5') {
            this.message1 = "Les votes pour les propositions sont clos.";
            this.message2 = "Le gagnant est maintenant connus";
        }

        return(
            <div className='container message mb-4'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='text-center mb-4'>Amazing Voting System</h1>
                    </div>
                    <div className='col-12 text-center'>
                        <p>{this.message1}</p>
                        <p>{this.message2}</p>
                    </div>
                </div>
            </div>
        )
    }

}
