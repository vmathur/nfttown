export const initialCharacterParams = [
  {
    width: 16,
    height: 18,
    imgSource : '/assets/monkey.png',
    currentLocation: {
      x: 700,
      y: 600
    },
    currentAction: 'randomWalk'
  },{
    width: 16,
    height: 18,
    imgSource : '/assets/penguin.png',
    currentLocation: {
      x: 900,
      y: 700
    },
    currentAction: 'paceRight'
  }]

export const behaviorLoops = {
  randomWalk: {
      behaviorLoop: [
        {type: 'walk', direction: 'left', duration: 60},
        {type: 'walk', direction: 'up', duration: 60},
        {type: 'walk', direction: 'right', duration: 60},
        {type: 'walk', direction: 'down', duration: 60},
      ],
      next: [{
        weight: 1,
        id: 'paceUp'
      },{
        weight: 1,
        id: 'paceDown'
      },{
        weight: 1,
        id: 'paceRight'
      },{
        weight: 1,
        id: 'paceLeft'
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
        weight: 2,
        id: 'paceRight'
    },{
      weight: 1,
      id: 'randomWalk'
    },{
      weight: 3,
      id: 'idle'
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
        weight: 2,
        id: 'paceLeft'
      },{
        weight: 1,
        id: 'randomWalk'
    },{
      weight: 3,
      id: 'idle'
    }]
  },
  paceUp: {
    behaviorLoop: [
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'up', duration: 120},
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'down', duration:120},
    ],
    next: [{
      weight: 2,
      id: 'paceUp'
    },{
      weight: 2,
      id: 'paceDown'
    },{
      weight: 1,
      id: 'randomWalk'
    }]
  },
  paceDown: {
    behaviorLoop: [
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'down', duration: 120},
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'up', duration:120},
    ],
    next: [{
      weight: 2,
      id: 'paceUp'
    },{
      weight: 2,
      id: 'paceDown'
    },{
      weight: 1,
      id: 'randomWalk'
    }]
  },
  idle: {
      behaviorLoop: [
        {type: 'idle', direction: 'down', duration: 240},
      ],
      next: [{
        weight: 1,
        id: 'idle'
      },{
        weight: 2,
        id: 'randomWalk'
      },{
        weight: 2,
        id: 'paceLeft'
      },{
        weight: 2,
        id: 'paceRight'
      }]
  },
}


    // [{
    //     width: 16,
    //     height: 18,
    //     imgSource : './assets/player1.png',
    //     currentLocation: {
    //         x: 200,
    //         y: 300
    //     },
    //     velocity: {
    //         dx: 3,
    //         dy: 3
    //     },
    //     currentAction: 'paceRight'
    // },{
    //     width: 16,
    //     height: 18,
    //     imgSource : './assets/player2.png',
    //     //imgSource : 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png',
    //     currentLocation: {
    //         x: 800,
    //         y: 500
    //     },
    //     velocity: {
    //         dx: -2,
    //         dy: -3
    //     },
    //     currentAction: 'paceLeft'
    // },{
    //     width: 16,
    //     height: 18,
    //     imgSource : './assets/player2.png',
    //     //imgSource : 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png',
    //     currentLocation: {
    //         x: 1000,
    //         y: 800
    //     },
    //     velocity: {
    //         dx: 0,
    //         dy: 0
    //     },
    //     currentAction: 'randomWalk'
    // },{