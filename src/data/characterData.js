export default 
    [{
        width: 16,
        height: 18,
        imgSource : './assets/player1.png',
        currentLocation: {
            x: 500,
            y: 500
        },
        velocity: {
            dx: 3,
            dy: 3
        },
        behaviorLoop: [
            {type: 'stand', direction: 'down'},
            {type: 'walk', direction: 'down'},
            {type: 'stand', direction: 'down'},
            {type: 'walk', direction: 'up'},
        ]
    },{
        width: 16,
        height: 18,
        imgSource : './assets/player2.png',
        //imgSource : 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png',
        currentLocation: {
            x: 800,
            y: 200
        },
        velocity: {
            dx: -2,
            dy: -3
        },
        behaviorLoop: [
            {type: 'walk', direction: 'left'},
            {type: 'walk', direction: 'up'},
            {type: 'walk', direction: 'right'},
            {type: 'walk', direction: 'down'},
        ]
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
        behaviorLoop: [
            {type: 'idle', direction: 'left'},
        ]
    }]
