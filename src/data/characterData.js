export const spriteData = {
  //monkey
  '0' : {
    width: 16,
    height: 18,
    imgSource : '/assets/monkey-orange.png', //need to update this
    currentAction: 'idle',
  }, 
  //penguin
  '1' : {
    width: 16,
    height: 18,
    imgSource : '/assets/penguin-blue.png',
    currentAction: 'idle',
  },
  //dog
  '2' : {
    width: 16,
    height: 18,
    imgSource :  '/assets/monkey-red.png',
    currentAction: 'idle',
  },
  //turtle
  '3' : {
    width: 16,
    height: 18,
    imgSource : '/assets/penguin-purple.png',
    currentAction: 'idle',
  }   
}

export const startingLocation = {
  '0' : {
      x: 600,
      y: 400
  }, 
  '1' : {
      x: 900,
      y: 400
  }, 
  '2' : {
      x: 600,
      y: 700
  }, 
  '3' : {
      x: 900,
      y: 700
  }, 
}

export const initialCharacterParams = [
  {
      id: 'monkey1',
      maxBananas: 30,
      eatRate: 0.25,
      width: 16,
      height: 18,
      imgSource : '/assets/monkey-orange.png',
      currentLocation: {
        x: 600,
        y: 400
      },
      currentAction: 'eat',
    }
  ]

let fps = 60

export const behaviorLoops = {
  randomWalk: {
      behaviorLoop: [
        {type: 'walk', direction: 'left', duration: fps*1},
        {type: 'walk', direction: 'up', duration: fps*1},
        {type: 'walk', direction: 'right', duration: fps*1},
        {type: 'walk', direction: 'down', duration: fps*1},
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
        id: 'eat'
      },{
        weight: 1,
        id: 'idle'
      },{
        weight: 1,
        id: 'sleep'       
      }]
  },
  paceLeft: {
      behaviorLoop: [
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'left', duration: fps*2},
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'right', duration:fps*2},
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
        {type: 'walk', direction: 'right', duration: fps*2},
        {type: 'stand', direction: 'down'},
        {type: 'walk', direction: 'left', duration:fps*2},
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
      {type: 'walk', direction: 'up', duration: fps*2},
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'down', duration:fps*2},
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
    },{
      weight: 3,
      id: 'idle'
    }]
  },
  paceDown: {
    behaviorLoop: [
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'down', duration: fps*2},
      {type: 'stand', direction: 'down'},
      {type: 'walk', direction: 'up', duration:fps*2},
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
    },{
      weight: 3,
      id: 'idle'
    }]
  },
  idle: {
      behaviorLoop: [
        {type: 'idle', direction: 'down', duration: fps*4},
      ],
      next: [{
        weight: 1,
        id: 'idle'
      },{
        weight: 1,
        id: 'sit'
      },{
        weight: 1,
        id: 'randomWalk'
      },{
        weight: 2,
        id: 'sleep'
      },{
        weight: 2,
        id: 'eat'
      }]
  },
  eat: {
    behaviorLoop: [
      {type: 'eat', direction: 'down', duration: fps*4},
    ],
    next: [{
      weight: 1,
      id: 'idle'
    },{
      weight: 1,
      id: 'sleep'
    },{
      weight: 1,
      id: 'randomWalk'
    }]
  },
  sit: {
    behaviorLoop: [
      {type: 'getting-seated', direction: 'down', duration: fps*1},
      {type: 'sit', direction: 'down', duration: fps*4}
    ],
    next: [{
      weight: 1,
      id: 'randomWalk'
    }]
  },
  sleep: {
    behaviorLoop: [
      {type: 'getting-seated', direction: 'down', duration: fps*1},
      {type: 'sleep', direction: 'down', duration: fps*8},
      {type: 'getting-up', direction: 'down', duration: fps*1},
    ],
    next: [{
      weight: 1,
      id: 'sleep'
    },{
      weight: 2,
      id: 'randomWalk'
    },{
      weight: 1,
      id: 'eat'
    }]
  },
  hungry: {
    behaviorLoop: [
      {type: 'sit', direction: 'down', duration: fps*1},
    ],
    next: [{
      weight: 2,
      id: 'hungry'
    }]
  },
  idleForever: {
    behaviorLoop: [
      {type: 'idle', direction: 'down', duration: fps*4},
    ],
    next: [{
      weight: 1,
      id: 'idleForever'
    }]
  },
}