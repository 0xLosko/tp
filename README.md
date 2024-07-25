# TP 3A-IBC : Cryptographie et fonctions de Hashage

## Description

Ce projet consiste en la création d'une application client qui interagit avec un serveur sécurisé pour résoudre des défis cryptographiques. L'objectif est de renforcer la compréhension des concepts cryptographiques fondamentaux tout en simulant des protocoles de communication sécurisés.

### Objectifs

- Implémenter des opérations cryptographiques de base (hachage et chiffrement).
- Interagir avec une API RESTful en utilisant des protocoles sécurisés.
- Gérer et répondre à des défis cryptographiques sensibles au temps.
- Gérer un système simple basé sur des scores dans un environnement compétitif.

## Endpoints

Le serveur fournit les points d'accès suivants :

1. **/subscribe** (POST) : Enregistrez votre client auprès du serveur.
2. **/info/{address}** (GET) : Récupérez votre score actuel et vos informations.
3. **/challenge/hash/{address}** (GET) : Demandez un défi de hachage.
4. **/challenge/hash/{address}/{challengeID}** (POST) : Soumettez une solution au défi de hachage.
5. **/challenge/encrypt/{address}** (GET) : Demandez un défi de chiffrement.
6. **/challenge/encrypt/{address}/{challengeID}** (POST) : Soumettez une solution au défi de chiffrement.

## Défis

### Défi de Hachage

- **Description** : Le serveur fournit une phrase aléatoire.
- **Tâche** : Calculer le hachage SHA256 de la phrase et renvoyer le résultat au serveur.
- **Méthode** : Utilisez une fonction de hachage SHA256 pour obtenir le résultat en hexadécimal.

### Défi de Chiffrement

- **Description** : Le serveur fournit une phrase aléatoire et une clé publique.
- **Tâche** : Chiffrer la phrase en utilisant la clé publique ECIES fournie et renvoyer le texte chiffré au serveur.
- **Méthode** : Utilisez l'algorithme de chiffrement RSA pour chiffrer la phrase et encodez le texte chiffré en hexadécimal.

## Installation

1. **Clonez le repository** :

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository

1. **Demarrer L'api** :

```bash
node server.js
```
1. **Demarrer le script pour automatiser le hash** :
```bash
node script.js
```

je recommande l'utilisation de postman pour tester les endpoints