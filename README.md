# Dapp Voting

Cette Dapp permet de voter pour des propositions, suivant un workflow défini.

# Video de présentation

Une vidéo de présentation du dfonctionnement de la Dapp se trouve à cette adresse : 
[Vidéo Loom](https://www.loom.com/share/43cb5924a5724d3b9665d991a141b55a)

# Dapp sur GitHub pages

La Dapp se trouve aussi en ligne sur GitHub Pages à l'url : 


# Structure de l'application

La Dapp est découpée en plusieurs composants, répartis dans les dossiers : 


```sh
# Address
Address.jsx : 'Pour l''affichage de la zone adresse de la personne connectée'
```

```sh
# Admin
AdminPanel.jsx : 'Zone pour l''affichage de la zone d''administration'
AdminWorkflow.jsx : 'Affichage des étapes du WorkFlow avec indication du step courant'
AdminVoters.jsx : 'Affichage de la liste des voters avec leurs votes pour valider que les infos ont bien été enregistrées.'
```

```sh
# Messages
Message.jsx : 'Zone pour l''affichage des messages à destination de l''utilisateur sur les différentes étapes du processus.'
```

```sh
# Proposal
ProposalListe.jsx : 'Affichage de la liste des propositions.'
ProposalListeWithVote.jsx : 'Affichage de la liste des propositions avec le nombre de vote.'
ProposalWinner.jsx : 'Affichage de la proposition gagnante'
```

Le layout est basé sur Bootstrap.

# Documentation

La documentation générée se trouve dans le répertoire truffle/doc/
