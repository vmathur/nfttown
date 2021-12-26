export const initialCharacterParams = 
    [{
        width: 16,
        height: 18,
        imgSource : './assets/player1.png',
        currentLocation: {
            x: 200,
            y: 300
        },
        velocity: {
            dx: 3,
            dy: 3
        },
        currentAction: 'paceRight'
    },{
        width: 16,
        height: 18,
        imgSource : './assets/player2.png',
        //imgSource : 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png',
        currentLocation: {
            x: 800,
            y: 500
        },
        velocity: {
            dx: -2,
            dy: -3
        },
        currentAction: 'paceLeft'
    },{
        width: 16,
        height: 18,
        imgSource : './assets/player2.png',
        //imgSource : 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png',
        currentLocation: {
            x: 1000,
            y: 800
        },
        velocity: {
            dx: 0,
            dy: 0
        },
        currentAction: 'randomWalk'
    }]

export const behaviorLoops = {
  randomWalk: {
      behaviorLoop: [
        {type: 'walk', direction: 'left'},
        {type: 'walk', direction: 'up'},
        {type: 'walk', direction: 'right'},
        {type: 'walk', direction: 'down'},
      ],
      next: [{
        weight: 2,
        id: 'pace'
      },{
        weight: 1,
        id: 'idle'
    }]
  },
  pace: {
      behaviorLoop: [
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'down', duration: 120},
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'up', duration:120},
      ],
      next: [{
        weight: 2,
        id: 'randomWalk'
      },{
        weight: 1,
        id: 'idle'
    }]
  },
  paceLeft: {
      behaviorLoop: [
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'left', duration: 120},
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'right', duration:120},
      ],
      next: [{
        weight: 2,
        id: 'paceLeft'
      },{
        weight: 1,
        id: 'paceRight'
    }]
  },
  paceRight: {
      behaviorLoop: [
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'right', duration: 120},
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'left', duration:120},
      ],
      next: [{
        weight: 2,
        id: 'paceRight'
      },{
        weight: 1,
        id: 'paceLeft'
      },{
        weight: 2,
        id: 'randomWalk'
    }]
  },
  idle: {
      duration: 60,
      behaviorLoop: [
        {type: 'idle', direction: 'left'},
      ],
      next: [{
        weight: 2,
        id: 'idle'
      },{
        weight: 2,
        id: 'pace'
    }]
  },
}