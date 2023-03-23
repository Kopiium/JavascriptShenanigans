class Card {
    constructor(name, attack, defense, rarity) {
      this.name = name;
      this.attack = attack;
      this.defense = defense;
      this.rarity = rarity;
      this.abilities = []; // new property to store card abilities
    }
  
    // new method to add an ability to the card
    addAbility(ability) {
      this.abilities.push(ability);
    }
  }
  
  class Ability {
    constructor(name, description, effect) {
      this.name = name;
      this.description = description;
      this.effect = effect; // function that defines what happens when the ability is activated
    }
  }
  
  class Player {
    constructor(name) {
      this.name = name;
      this.cards = [];
      this.hp = 100;
    }
  
    addCard(card) {
      this.cards.push(card);
    }
  
    showCards() {
        console.log(`${this.name}'s cards:`);
        for (let card of this.cards) {
          console.log(`- ${card.name} (Attack: ${card.attack}, Defense: ${card.defense}, Rarity: ${card.rarity})`);
          // show card abilities
          for (let ability of card.abilities) {
            console.log(`  - Ability: ${ability.name} (${ability.description})`);
          }
        }
      }
    
      getTotalAttack() {
        let totalAttack = 0;
        for (let card of this.cards) {
          totalAttack += card.attack;
        }
        return totalAttack;
      }
    
      getTotalDefense() {
        let totalDefense = 0;
        for (let card of this.cards) {
          totalDefense += card.defense;
        }
        return totalDefense;
      }
    }
    
    // function to simulate a battle between two players
    function battle(player1, player2) {
      console.log(`Battle between ${player1.name} and ${player2.name}!`);
    
      // calculate each player's total attack and defense values
      let player1Attack = player1.getTotalAttack();
      let player1Defense = player1.getTotalDefense();
      let player2Attack = player2.getTotalAttack();
      let player2Defense = player2.getTotalDefense();
    
      // calculate damage dealt by each player
      let damageToPlayer1 = Math.max(player2Attack - player1Defense + Math.floor(Math.random() * 6) - 3, 0);
      let damageToPlayer2 = Math.max(player1Attack - player2Defense + Math.floor(Math.random() * 6) -3 ,0);
    
      // update players' hit points
      player1.hp -= damageToPlayer1;
      player2.hp -= damageToPlayer2;
    
      console.log(`${player1.name} takes ${damageToPlayer1} damage and has ${player1.hp} HP remaining.`);
      console.log(`${player2.name} takes ${damageToPlayer2} damage and has ${player2.hp} remaining.`);
    }
    
    // Create some cards
    let gatito = new Card('Gatito',10 ,5 ,'common');
    let doge = new Card('Doge',8 ,6 ,'rare');
    let phrog = new Card('Phrog',7 ,9 ,'uncommon');
    let bunni = new Card('Bunni',6 ,8 ,'legendary');
    
    // Create some abilities
    let healAbility = new Ability('Heal', 'Heals the player for 5 HP', function(player) {
        console.log(`${player.name} uses Heal and recovers 5 HP!`);
        player.hp += 5;
    });
    
    let doubleAttackAbility = new Ability('Double Attack', 'Doubles the attack value of this card for one turn', function(card) {
        console.log(`${card.name} uses Double Attack and doubles its attack value for one turn!`);
        card.attack *= 2;
    });
    
    // Give Pikachu the Heal ability
    gatito.addAbility(healAbility);
    
    // Give Charmander the Double Attack ability
    doge.addAbility(doubleAttackAbility);
    
    // Create players and give them some cards
    let player1 = new Player('Kopi');
    player1.addCard(gatito);
    player1.addCard(doge);
    
    let player2 = new Player('Tumo');
    player2.addCard(phrog);
    player2.addCard(bunni);
    
    // Show each players' cards
    player1.showCards();
    player2.showCards();
    
    // Simulate a battle between the two players
    battle(player1, player2);
