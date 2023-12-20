export const spriteData = {
  //monkey
  '0' : {
    '0' :{
      imgSource : '/assets/characters/monkey-orange.gif', //need to update this
    },
    '1' :{
      imgSource : '/assets/characters/monkey-red.gif', //need to update this
    },
    '2' :{
      imgSource : '/assets/characters/monkey-blue.gif', //need to update this
    },
    '3' :{
      imgSource : '/assets/characters/monkey-green.gif', //need to update this
    },
  }, 
  //penguin
  '1' : {
    '0' :{
      imgSource : '/assets/characters/penguin-orange.gif', //need to update this
    },
    '1' :{
      imgSource : '/assets/characters/penguin-red.gif', //need to update this
    },
    '2' :{
      imgSource : '/assets/characters/penguin-blue.gif', //need to update this
    },
    '3' :{
      imgSource : '/assets/characters/penguin-green.gif', //need to update this
    },
  }, 
  //dog
  '2' : {
    '0' :{
      imgSource : '/assets/characters/dog-orange.gif', //need to update this
    },
    '1' :{
      imgSource : '/assets/characters/dog-red.gif', //need to update this
    },
    '2' :{
      imgSource : '/assets/characters/dog-blue.gif', //need to update this
    },
    '3' :{
      imgSource : '/assets/characters/dog-green.gif', //need to update this
    },
  },
  //bunny 
  '3' : {
    '0' :{
      imgSource : '/assets/characters/bunny-orange.gif', //need to update this
    },
    '1' :{
      imgSource : '/assets/characters/bunny-red.gif', //need to update this
    },
    '2' :{
      imgSource : '/assets/characters/bunny-blue.gif', //need to update this
    },
    '3' :{
      imgSource : '/assets/characters/bunny-green.gif', //need to update this
    },
  }, 
}

export const spriteDimensions = {
width: 16,
  height: 18,
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
  '4' : {
    x: 500,
    y: 500
}, 
}

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
  eatLots: {
    behaviorLoop: [
      {type: 'eat', direction: 'down', duration: fps*8},
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
  demo: {
    behaviorLoop: [
      {type: 'idle', direction: 'down', duration: fps*4},
      {type: 'eat', direction: 'down', duration: fps*4},
      {type: 'idle', direction: 'down', duration: fps*4},
      {type: 'walk', direction: 'right', duration:fps*2},
      {type: 'walk', direction: 'left', duration:fps*2},
    ],
    next: [{
      weight: 1,
      id: 'demo'
    }]
  },
}