/*
Blockly.Language.cog_new = {
    // Repeat forever.
    category: Blockly.LANG_CATEGORY_COG,
    helpUrl: 'help/block-cognew.html',
    init: function() {
        this.setColour(120);
        this.appendDummyInput()
                .appendTitle('Cognew ');

        this.appendDummyInput().appendTitle('Stacksize ').appendTitle(new Blockly.FieldTextInput("48", Blockly.Language.math_number.validator), "STACK_SIZE");

        this.appendStatementInput("METHOD")
                .appendTitle("Method");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        // this.setTooltip(Blockly.LANG_CONTROLS_REPEAT_TOOLTIP);
    }
};

Blockly.Spin.cog_new = function() {
    var method = Blockly.Spin.statementToCode(this, 'METHOD');
    method = method.replace("  ", "").replace("\n", "");
    var stackSize = this.getTitleValue('STACK_SIZE');
    var stackName = 'Stack' + Blockly.Spin.stacks_.length;

    Blockly.Spin.stacks_.push('long ' + stackName + '[' + stackSize + ']');

    var code = 'cognew(' + method + ', @' + stackName + ')\n';
    return code;
};
*/
/*

This file contains support for multi cog use in Propeller C

*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
  
Blockly.Language.cog_new = {
  category: 'Control',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput( "" )
      .appendTitle( "cognew" );
    this.appendValueInput( "STACK_SIZE", Number )
      .appendTitle( "Stacksize" )
      .setCheck( Number );
    this.appendStatementInput( "METHOD" )
      .appendTitle( "Method" );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.cog_new = function() {
  var method = Blockly.propc.statementToCode( this, 'METHOD' );
  method = method.replace( "  ", "" ).replace( "\n", "" );
  var stackSize = this.valueToCode( this, 'STACK_SIZE', Blockly.propc.ORDER_ATOMIC ) || '10';
  
  var code = 'cog_run( &' + method + ', ' + stacksize + ' );';
  return code;
};
