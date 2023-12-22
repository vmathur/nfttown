export const pondData = [
    {
            width: 384,
            height: 384,
            imgSource : '/assets/pond/pond-1.png',
            currentLocation: {
              x: 0,
              y: 10
            },
            totalAnimationFrames: 12,
            zone: 1
    },{
            width: 384,
            height: 384,
            imgSource : '/assets/pond/pond-2.png',
            currentLocation: {
              x: 0,
              y: 0
            },
            totalAnimationFrames: 12,
            zone: 4
    },{
            width: 384,
            height: 384,
            imgSource : '/assets/pond/pond-3.png',
            currentLocation: {
              x: 18,
              y: 0
            },
            totalAnimationFrames: 12,
            zone: 5
    },{
            width: 384,
            height: 384,
            imgSource : '/assets/pond/pond-4.png',
            currentLocation: {
              x: 18,
              y: 10
            },
            totalAnimationFrames: 12,
            zone: 6
    }
]

export const clockTowerData =
{
    width: 64,
    height: 128,
    imgSource : '/assets/clocktower.png',
    currentLocation: {
        x: 16,
        y: 1
    }
}

export const cursorData =
{
    width: 16,
    height: 16,
    imgSource : '/assets/cursor.png',
    currentLocation: {
        x: 5,
        y: 5
    },
}

export const arrowsData =
{
    width: 16,
    height: 16,
    imgSource : '/assets/arrows.png',
    arrowLocations : [
        [1100,360],
        [550,620],
        [0,360],
        [550,0]
    ],
    arrowToZoneMap : [
        //1
        [2,4,6,1],
        //2
        [1,3,1,9],
        //3
        [1,1,4,2],
        //4
        [3,1,5,1],
        //5
        [4,1,1,6],
        //6
        [1,5,1,7],
        //7
        [8,6,1,1],
        //8
        [9,1,7,1],
        //9
        [1,2,8,1]
    ]
}

export const gardenData =
{
    width: 16,
    height: 16,
    imgSource : '/assets/garden.png'
}

export const welcomeBannerData = 
{
    width: 256,
    height: 128,
    imgSource : '/assets/welcome.png',
    currentLocation: {
        x: 10,
        y: 0
    },
}    

export const housesByZoneData = [
    [
        //1
        [2,1],[5,1],[15,12],[18,12]
    ],[
        //2
        [17,1],[20,1],[2,12],[5,12]
    ],[
        //3
        [2,1],[5,1],[2,12],[5,12]
    ],    [
        //4
        [15,1],[18,1],[15,12],[18,12]
    ],[
        //5
        [2,12],[5,12],[15,12],[18,12]
    ],[
        //6
        [15,1],[18,1],[2,12],[5,12]
    ],    [
        //7
        [2,1],[5,1],[2,12],[5,12]
    ],[
        //8
        [2,12],[5,12],[15,12],[18,12]
    ],[
        //9
        [2,12],[5,12],[15,1],[18,1]
    ]
]


export const objectLocations = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]
