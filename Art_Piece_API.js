var artPieceData, artCnt = 0, drawFlag = true;
var bigAmData, tinyAmData, cometAmData, linesAmData;
var bigBGImg, tinyBGImg, lineBGImg;
var encoder;
var gifFlag = false;
let vid;
function initData(){
  artPieceData = {
    cnv: null,
    CANVAS_LEFT: 0,     CANVAS_TOP: 0,
    CANVAS_RIGHT: 500,  CANVAS_BOTTOM: 600,
    pixDst: 4,          frmRat: 60,        playTime: 3,// pixel Density,   frame rate,  play time
    connt_x: [],        connt_y: [],       shape_cnt : [],
    canvasData: {    
      canvasSize:         {Width: 500, Height: 600}, // Ccanvas size
      canvasRenderer:     'P2D'   // Canvas renderer(this can set to 'WEBGL' or 'P2D')
    },
    backData: {      
      color:{
        WeightSets: [
          [[10, 10,  0, 10,  0, 10,  0, 10,  0,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], "Beautiful White"], //color weight set 1
          [[ 0,  0,  0, 50,  0, 10,  0, 10,  0,  0,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], "Amazing"], //color weight set 2
          [[ 0,  0, 10,  0,  0, 50,  0, 10, 10,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], "Wonderful"], //color weight set 3
          [[ 0,  0, 10,  0, 10,  0, 50,  0,  0, 10,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], "Hello"], //color weight set 4
          [[10, 10,  0,  0, 10,  0,  0,  0, 50,  0,  0,  0, 10,  0, 10,  0, 50,  0,  0, 10], "Superman"] //color weight set 5
        ],
        Set: [
          ["#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878", "#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05"],  // shape color set 1
          ["#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05", "#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555"],  // shape color set 2
          ["#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444", "#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456"],  // shape color set 3
          ["#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456", "#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878"],  // shape color set 4
          ["#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555", "#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444"]   // shape color set 5
        ],
        transparentDesity:    250   //Transparent desity(this can set within 0~255)      
      }, 
      gradientWeightSet:    [     0,          10,         10,       10],//  Background gradient direction weight set
      gradientSet:          ['None', 'Horizontal', 'Vertical', 'Radius'],//  Background gradient direction set
      Tick: 1 //Gradient curve tick
    },
    bigData: {
      shapeNames:"", shapeCount: 0,
      shape:{
        WeightSets:[
          [ 0, 50, 50,  0,  0,  0,  0,  0,  0,  0,  0], //Combined shape weight set 1
          [ 0,  0,  0, 50, 50,  0,  0,  0,  0,  0,  0], //Combined shape weight set 2
          [ 0,  0,  0,  0,  0, 50, 50,  0,  0,  0,  0], //Combined shape weight set 3
          [ 0,  0,  0,  0,  0,  0,  0, 50, 50,  0,  0], //Combined shape weight set 4
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0, 50, 50]  //Combined shape weight set 5
        ]
      },
      color:{
        WeightSets: [
          [10, 10,  0, 10,  0, 10,  0, 10,  0,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 1
          [ 0,  0,  0, 50,  0, 10,  0, 10,  0,  0,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 2
          [ 0,  0, 10,  0,  0, 50,  0, 10, 10,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 3
          [ 0,  0, 10,  0, 10,  0, 50,  0,  0, 10,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 4
          [10, 10,  0,  0, 10,  0,  0,  0, 50,  0,  0,  0, 10,  0, 10,  0, 50,  0,  0, 10] //color weight set 5
        ],
        Set: [
          ["#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878", "#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05"],  // shape color set 1
          ["#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05", "#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555"],  // shape color set 2
          ["#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444", "#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456"],  // shape color set 3
          ["#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456", "#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878"],  // shape color set 4
          ["#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555", "#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444"]   // shape color set 5
        ], 
        transparentDesity:    250   //Transparent desity(this can set within 0~255)
      },
      size:{
        WeightSet:        [  10,  10,   10,   10,  10,  10,   10,  10,  10,  10], // Settings weight of size's sets
        Set:              [ 200, 150,  190,  180, 210, 125,  175, 155, 165, 120] // Size set of shapes
      },
      moveDisY: 20, // vertical moving distance
      speed:{
        WeightSet:        [   10,   10,   10,   10,   10,   10,   10,   10,   10,   10], // Settings weight of moving speed's sets
        Set:              [ 0.23, 0.18, 0.12, 0.25, 0.35, 0.28, 0.15, 0.29, 0.33, 0.38] // moving speed set of shapes(pixel count/frame)
      },
      count:{
        SettingChanceID:  -1,  // Chance number for setting a count(default: 0)
        WeightSet:        [500, 100,   10,   10,   5],  // Weight set of counts
        Set:              [  5,  10,   15,   20,  30]   // Count set of shapes
      }
    },
    tinyData:{
      shapeNames:"", shapeCount: 0,
      shape:{
        WeightSets:[
          [ 0, 50, 50,  0,  0,  0,  0,  0,  0,  0,  0], //Combined shape weight set 1
          [ 0,  0,  0, 50, 50,  0,  0,  0,  0,  0,  0], //Combined shape weight set 2
          [ 0,  0,  0,  0,  0, 50, 50,  0,  0,  0,  0], //Combined shape weight set 3
          [ 0,  0,  0,  0,  0,  0,  0, 50, 50,  0,  0], //Combined shape weight set 4
          [ 0,  0,  0,  0,  0,  0,  0,  0,  0, 50, 50]  //Combined shape weight set 5
        ]
      },
      color:{
        WeightSets: [
          [10, 10,  0, 10,  0, 10,  0, 10,  0,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 1
          [ 0,  0,  0, 50,  0, 10,  0, 10,  0,  0,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 2
          [ 0,  0, 10,  0,  0, 50,  0, 10, 10,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 3
          [ 0,  0, 10,  0, 10,  0, 50,  0,  0, 10,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 4
          [10, 10,  0,  0, 10,  0,  0,  0, 50,  0,  0,  0, 10,  0, 10,  0, 50,  0,  0, 10], //color weight set 5
        ],
        Set: [
          ["#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878", "#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05"],  // shape color set 1
          ["#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05", "#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555"],  // shape color set 2
          ["#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444", "#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456"],  // shape color set 3
          ["#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456", "#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878"],  // shape color set 4
          ["#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555", "#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444"]   // shape color set 5
        ],  
        transparentDesity:    250   //Transparent desity(this can set within 0~255)
      },
      size:{
        WeightSet:        [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Settings weight of size's sets
        Set:              [ 13, 15, 20, 25, 27, 12, 23, 18, 15, 20] // Size set of shapes
      },
      speed:{
        WeightSet:        [   10,   10,   10,   10,   10,   10,   10,   10,   10,   10], // Settings weight of glow speed's sets
        Set:              [ 0.20, 0.15, 0.17, 0.23, 0.32, 0.26, 0.13, 0.24, 0.35, 0.32] // glow speed set of shapes(pixel count/frame)
      },
      count:{
        SettingChanceID:  -1,  // Chance number for setting a count(default: 0)
        WeightSet:        [ 10, 100,   50,  100,  50],  // Weight set of counts
        Set:              [ 10,  20,   30,   40,  50]   // Count set of shapes
      }
    },
    linesData:{
      color:{
        WeightSets: [
          [10, 10,  0, 10,  0, 10,  0, 10,  0,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 1
          [ 0,  0,  0, 50,  0, 10,  0, 10,  0,  0,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 2
          [ 0,  0, 10,  0,  0, 50,  0, 10, 10,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 3
          [ 0,  0, 10,  0, 10,  0, 50,  0,  0, 10,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 4
          [10, 10,  0,  0, 10,  0,  0,  0, 50,  0,  0,  0, 10,  0, 10,  0, 50,  0,  0, 10], //color weight set 5
        ],
        Set: [
          ["#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878", "#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05"],  // shape color set 1
          ["#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05", "#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555"],  // shape color set 2
          ["#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444", "#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456"],  // shape color set 3
          ["#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456", "#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878"],  // shape color set 4
          ["#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555", "#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444"]   // shape color set 5
        ], 
        transparentDesity:    250   //Transparent desity(this can set within 0~255)
      },
      count:{
        SettingChanceID:  -1,  // Chance number for setting a count(default: 0)
        WeightSet:        [ 100, 100, 100, 100, 100],  // Weight set of counts
        groupSet:         [  2,    4,   1,   3,   5],  // Count set of line group
        lineSet:          [  17,   6,  10,  23,  28]   // Count set of line
      },
      lengthLine:{
        WeightSet:        [ 10,  10,  10,  10,  10,  10,  10,  10, 10,  10], // Settings weight of line
        Set:              [100,  85, 120, 155, 130,  55, 145,  65,175, 140] // length set of line
      },
      distanceLine:{
        WeightSet:        [ 10,   10,  10,  10,  10,  10,  10,  10,  10,  10], // Settings weight of line
        Set:              [300,  250, 220, 255, 330, 255, 245, 165, 175, 240] // distance set of line
      },
      lengthComet:{
        WeightSet:        [  10,  10,  10,  10,  10,  10,  10,  10,  10,  10], // Settings weight of comet
        Set:              [ 130, 150, 125, 135, 140, 145, 175, 170, 165, 160] // length set of comet
      },
      distanceComet:{
        WeightSet:        [ 10,   10,  10,  10,  10,  10,  10,  10,  10,  10], // Settings weight of line
        Set:              [700,  650, 320, 455, 630, 455, 545, 765, 575, 640] // distance set of line
      },
      distribution:{
        WeightSet:        [ 10,  10,  10,  10,  10,  10], // Settings weight of distribution's sets
        Set:              [ 50,  85,  60,  75, 30,  45] // Size set of distribution
      },
      speedLine:{
        WeightSet:        [ 10,  10,  10,  10,  10,  10,  10,  10,  10,  10], // Settings weight of speed
        Set:              [300, 600, 360, 420, 480, 540, 540, 300, 480, 420] //  Line speed set of distribution(pixel count/second)
      },
      speedComet:{
        WeightSet:        [ 10,  10,  10,  10,  10,  10,  10,  10,  10,  10], // Settings weight of speed
        Set:              [120, 300, 180, 180, 240, 300, 120, 300, 180, 240] // Comet speed set of distribution(pixel count/second)
      },
      lineTick:   1,  //Line tick
      pointTick:  3,   //Point tick
      disStepTime: 0.5,//line disappearing time(second)
      disEndTime: 0.5  //the time step from line disappeared time to frame end(second)
    },
    // transitionData:{
    //   shape:{
    //     WeightSets:[
    //       [ 0, 50,  0,  0,  0,  0,  0, 50,  0,  0,  0], //Combined shape weight set 1
    //       [ 0,  0,  0,  0, 50,  0, 50,  0,  0,  0, 10], //Combined shape weight set 2
    //       [ 0,  0, 40,  0,  0, 50,  0,  0,  0, 40,  0], //Combined shape weight set 3
    //       [ 0, 40,  0,  0,  0, 10,  0,  0, 50,  0, 50], //Combined shape weight set 4
    //       [ 0,  0,  0, 20,  0,  0,  0,  0,  0, 50,  0], //Combined shape weight set 5
    //     ]
    //   },
    //   color:{
    //     WeightSets: [
    //       [10, 10,  0, 10,  0, 10,  0, 10,  0,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 1
    //       [ 0,  0,  0, 50,  0, 10,  0, 10,  0,  0,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 2
    //       [ 0,  0, 10,  0,  0, 50,  0, 10, 10,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 3
    //       [ 0,  0, 10,  0, 10,  0, 50,  0,  0, 10,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 4
    //       [10, 10,  0,  0, 10,  0,  0,  0, 50,  0,  0,  0, 10,  0, 10,  0, 50,  0,  0, 10], //color weight set 5
    //     ],
    //     Set: [
    //       ["#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878", "#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05"],  // shape color set 1
    //       ["#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05", "#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555"],  // shape color set 2
    //       ["#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444", "#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456"],  // shape color set 3
    //       ["#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456", "#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878"],  // shape color set 4
    //       ["#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555", "#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444"]   // shape color set 5
    //     ], 
    //     transparentDesity:    250,   //Transparent desity(this can set within 0~255)
    //     topDesity:   200,  //color Desity of top side part
    //     bottomDesity: 10   //color Desity of bottom side part
    //   },
    //   size:{
    //     WeightSet:        [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Settings weight of size's sets
    //     Set:              [100, 85, 20, 95, 30, 60, 45, 65, 55, 70] // Size set of shapes
    //   },
    //   count:{
    //     SettingChanceID:  -1,  // Chance number for setting a count(default: 0)
    //     WeightSet:        [ 10, 100,   50,  100,  50],  // Weight set of counts
    //     Set:              [  7,   6,   10,    3,   8]   // Count set of shapes
    //   },
    //   length:{
    //     WeightSet:        [ 10,  10,  10,  10,  10,  10,  10,  10, 10,  10], // Settings weight of trasition
    //     Set:              [100,  85, 120, 155, 130,  55, 145,  65, 75, 140] // Length set of trasition
    //   },
    //   tick: 1
    // },
    connectorData:{
      shape:{
        WeightSets:[
          [ 0, 50,  0,  0,  0,  0,  0, 50,  0,  0,  0], //Combined shape weight set 1
          [ 0,  0,  0,  0, 50,  0, 50,  0,  0,  0, 10], //Combined shape weight set 2
          [ 0,  0, 40,  0,  0, 50,  0,  0,  0, 40,  0], //Combined shape weight set 3
          [ 0, 40,  0,  0,  0, 10,  0,  0, 50,  0, 50], //Combined shape weight set 4
          [ 0,  0,  0, 20,  0,  0,  0,  0,  0, 50,  0], //Combined shape weight set 5
        ]
      },
      color:{
        WeightSets: [
          [10, 10,  0, 10,  0, 10,  0, 10,  0,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 1
          [ 0,  0,  0, 50,  0, 10,  0, 10,  0,  0,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 2
          [ 0,  0, 10,  0,  0, 50,  0, 10, 10,  0, 10, 10,  0, 10,  0, 10,  0, 10,  0,  0], //color weight set 3
          [ 0,  0, 10,  0, 10,  0, 50,  0,  0, 10,  0,  0, 10,  0,  0, 50,  0, 10, 10,  0], //color weight set 4
          [10, 10,  0,  0, 10,  0,  0,  0, 50,  0,  0,  0, 10,  0, 10,  0, 50,  0,  0, 10], //color weight set 5
        ],
        Set: [
          ["#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878", "#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05"],  // shape color set 1
          ["#06dfea", "#f0a537", "#f30033", "#47d48f", "#777777", "#97abcf", "#f00f0f", "#fafa0a", "#1960ff", "#09ff05", "#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555"],  // shape color set 2
          ["#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444", "#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456"],  // shape color set 3
          ["#1a01ea", "#e4fa4c", "#cdac27", "#4Bf5a2", "#888888", "#876543", "#765432", "#234567", "#333333", "#123456", "#97acaf", "#ff0000", "#ffff00", "#0f00ff", "#00ff00", "#86d1e7", "#ffa500", "#ff00ff", "#4B0082", "#787878"],  // shape color set 4
          ["#5391e7", "#094d6a", "#c3f284", "#fa6f12", "#aaaaaa", "#345678", "#dddddd", "#654321", "#ee44ff", "#555555", "#0cd1e0", "#a2ef3b", "#111111", "#c54ac2", "#567890", "#456789", "#cccccc", "#222222", "#0000ff", "#444444"]   // shape color set 5
        ], 
        transparentDesity:    250,   //Transparent desity(this can set within 0~255)
        topDesity:            200,  //color Desity of top side part
        bottomDesity:         10   //color Desity of bottom side part
      },
      size:{
        WeightSet:        [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // Settings weight of size's sets
        Set:              [100, 85, 120, 95, 130, 60, 95, 65, 85, 70] // Size set of shapes
      },
      count:{
        SettingChanceID:  -1,  // Chance number for setting a count(default: 0)
        WeightSet:        [ 10, 100,   50,  100,  50],  // Weight set of counts
        Set:              [  7,   6,   10,    3,   8]   // Count set of shapes
      },
      length:{
        WeightSet:        [ 10,  10,  10,  10,  10,  10,  10,  10, 10,  10], // Settings weight of size's sets
        Set:              [100,  85,  80, 150, 130,  55, 145,  65, 75, 140], // Size set of transition
        lineSet:          [ 55, 145,  65,  75, 140, 100,  85,  80, 150, 130]  // length set of line
      },
      tick: 1,          //Side tick
      lineTick:   1,    //Line tick
      pointTick:  10,   //Point tick
    },
    direction:{
      SettingChanceID:  -1,  // Chance number for setting a direction(default: 0)
      WeightSet:        [0,         100,         100,          200,        100,       100,        100,       100,        100,       100],    // Weight set of direction
      Set:              [0,  1.5*Math.PI, 1.2*Math.PI, 1.0*Math.PI, -Math.PI/4, Math.PI/4, -Math.PI/3, Math.PI/3, -Math.PI/5, Math.PI/5],   // Count set of direction
      Symbol:           [0,           1,         -2,         2,         -4,         4,         -3,         3,         -5,         5]
    },
    shapeSettingChanceID:  0,                                                 // Chance number for setting a shape's set(default: 0)
    shapeSettingsWeight:   [100, 100, 100, 100, 100, 100],                    // Settings weight of single and combined sets
    colorSettingChanceID:  0,                                                 // Chance number for setting a color's set(default: 0)
    colorSettingsWeight:   [                                                  // Settings weight of color's sets
                            [10, "Flying Machine"],
                            [10, "Nightfall Blue"],
                            [10, "Blueberry dark"],
                            [10, "Matt Black Neon"],
                            [10, "Starry Night Star Burst"]
    ],
    singleShapeChanceID:   -1,                                                // Chance number for setting a single shape (default: -1)
    singleShapeWeight:     [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],   //Single shape weight set
    shapes: ["Square", "Circle", "Triangle", "Scalene", "Kite", "Parallelogram", "Star", "Crescnt", "Cross", "Ring", "Heart"]
  };
  artPieceData.shapeSettingChanceID = chanceSetRand(artPieceData.shapeSettingsWeight);    //Randomly chance of a shape's set
  let tmpSettingWeight = [];
  for(let i=0; i<artPieceData.colorSettingsWeight.length; i++)
    tmpSettingWeight[i] = artPieceData.colorSettingsWeight[i][0]
  artPieceData.colorSettingChanceID = chanceSetRand(tmpSettingWeight);   //Randomly chance of a color's set
  if(artPieceData.shapeSettingChanceID == 0)
    artPieceData.singleShapeChanceID = chanceSetRand(artPieceData.singleShapeWeight);     //Randomly chance of a single shape
  else
    artPieceData.shapeSettingChanceID -= 1;
  artPieceData.direction.SettingChanceID = chanceSetRand(artPieceData.direction.WeightSet);  //Randomly chance of a direction
}
function setup() {
  //noLoop();
  initData();
  initArrayData();
  canvasCreate(artPieceData.canvasData);
  frameRate(artPieceData.frmRat);
  if(gifFlag) gifAnimation();
}

function draw() {
  if(drawFlag){
    // let time1=millis();
    Pieces_Art_Call();
    // print(millis()-time1); 
    artCnt++;
    // if(artCnt>0) drawFlag=false;
    if(artCnt==artPieceData.playTime*artPieceData.frmRat)
    {
      drawFlag = false;
      noLoop();
    }    
  }  
}

function gifAnimation()
{
  //create gif animated file  
  createLoop({
    duration:       1,
    gif: {
        render:false,
        fileName: "ArtPieces.gif",
        download: true,
        open: true,
        options: { quality: 5 },
    },
    gifStartLoop: 0,
    gifEndLoop: artPieceData.playTime
  })
}

function Pieces_Art_Call(){

  noFill();  
  if(artCnt==0)
  {
    backDrawing(artPieceData.backData);  //  Call for drawing a background function               //setBack();    
    bigBGImg=get();
    bigDataInit(artPieceData.bigData);
    bigShapeToGraphics(artPieceData.bigData);
    tinyDataInit(artPieceData.tinyData);
    lineGroupDataInit(artPieceData.linesData);
    cometDataInit(artPieceData.linesData);
    cometDrawToGrphics(artPieceData.linesData);
    // shapeDrawing(artPieceData.transitionData, 'Transition'); // Call big shape drawing function   //setTransition();
    artPieceData.connectorData.shape = artPieceData.bigData.shape;
    // shapeDrawing(artPieceData.connectorData, 'Connector'); //  Call big shape drawing function    //setConnector()
  }  
  bigShapeDrawToCanvas();
  tinyShapeDrawToCanvas(artPieceData.tinyData);
  lineGroupDrawToCanvas();
  cometDrawToCanvas(); 
  // jsonPro(artPieceData);
  // saveCanvas(artPieceData.cnv, "Art_piece1_"+artCnt, "png"); // Save a picture    
  
}

function Set_Draw(){ 
  drawFlag = false;
  print("STOP")
  // resizeCanvas(artPieceData.canvasData.canvasSize.Width, artPieceData.canvasData.canvasSize.Height);
}


