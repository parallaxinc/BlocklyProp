// Whitelist of blocks to keep.
/*var newLanguage = {}
 var keepers = ['controls_loop', 'controls_delay', 'control_map',
 //'setup_pinmode', 'output_digital_write', 'output_analog_write',
 //'controls_if', 'controls_if_if', 'controls_if_elseif',
 //'controls_if_else', 'controls_whileUntil', 'controls_for',
 //'controls_flow_statements',
 //'math_number','math_arithmetic',//'math_modulo',
 //'logic_compare', 'logic_operation', 'logic_negate', 'logic_boolean',
 //'variables_get','variables_set',
 //'procedures_defnoreturn', 'procedures_defreturn', 'procedures_callnoreturn', 'procedures_callreturn'
 ];
 for (var x = 0; x < keepers.length; x++) {
 newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
 }
 // Fold control category into logic category.
 for (var name in newLanguage) {
 if (newLanguage[name].category == 'Math') {
 newLanguage[name].category = 'Logic';
 }
 }
 Blockly.Language = newLanguage;*/

var BlocklyScribbler = {};

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'spin', 'xml'];

var selected = 'blocks';

var scribblerSim = new ScribblerSim();


/**
 * Initialize Blockly and the maze.  Called on page load.
 */
BlocklyScribbler.init = function() {
    scribblerSim.init('visualization');
//    BlocklyApps.init();

    /*
     // Setup the Pegman menu.
     var pegmanImg = document.querySelector('#pegmanButton>img');
     pegmanImg.style.backgroundImage = 'url(' + Maze.SKIN.sprite + ')';
     var pegmanMenu = document.getElementById('pegmanMenu');
     var handlerFactory = function(n) {
     return function() {
     Maze.changePegman(n);
     };
     };
     for (var i = 0; i < Maze.SKINS.length; i++) {
     if (i == Maze.SKIN_ID) {
     continue;
     }
     var div = document.createElement('div');
     var img = document.createElement('img');
     img.src = '../../media/1x1.gif';
     img.style.backgroundImage = 'url(' + Maze.SKINS[i].sprite + ')';
     div.appendChild(img);
     pegmanMenu.appendChild(div);
     Blockly.bindEvent_(div, 'mousedown', null, handlerFactory(i));
     }
     Blockly.bindEvent_(window, 'resize', null, Maze.hidePegmanMenu);
     var pegmanButton = document.getElementById('pegmanButton');
     Blockly.bindEvent_(pegmanButton, 'mousedown', null, Maze.showPegmanMenu);
     */

    // Whitelist of blocks to keep.
    var newLanguage = {}
    var keepers = [
        'move'
    ];
    for (var x = 0; x < keepers.length; x++) {
        newLanguage[keepers[x]] = Blockly.Language[keepers[x]];
    }
    // Fold control category into logic category.
    /*for (var name in newLanguage) {
     if (newLanguage[name].category == 'Math') {
     newLanguage[name].category = 'Logic';
     }
     }*/
    Blockly.Language = newLanguage;

//    var rtl = BlocklyApps.isRtl();
    var blocklyDiv = document.getElementById('blockly');
    var visualization = document.getElementById('visualization');
    var onresize = function(e) {
        var top = visualization.offsetTop;
        blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
        blocklyDiv.style.left = '420px';
        blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
    };
    window.addEventListener('scroll', function() {
        onresize();
        Blockly.fireUiEvent(window, 'resize');
    });
    window.addEventListener('resize', onresize);
    onresize();

//  var toolbox = document.getElementById('toolbox');
    Blockly.inject(document.getElementById('blockly'),
            {path: '/', trashcan: true});
//  Blockly.loadAudio_(Maze.SKIN.winSound, 'win');
//  Blockly.loadAudio_(Maze.SKIN.crashSound, 'fail');

//    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';
//  Maze.drawMap();

    var defaultXml =
            '<xml>' +
            '  <block type="maze_moveForward" x="70" y="70"></block>' +
            '</xml>';
//    BlocklyApps.loadBlocks(defaultXml);

//  Maze.reset(true);
//  BlocklyApps.bindClick('runButton', Maze.runButtonClick);
//  BlocklyApps.bindClick('resetButton', Maze.resetButtonClick);

    // Lazy-load the syntax-highlighting.
//    window.setTimeout(BlocklyApps.importPrettify, 1);
};