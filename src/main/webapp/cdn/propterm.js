/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var cursorX = 0, cursorY = 0;
var cursorGotoX = 0, cursorGotoY = 0;
var termSetCursor = 0; // 0 = normal, 1 = set X, 2 = set Y, 3 = set X then to 2 to set Y.
var textContainer = new Array;
textContainer[0] = '';
var term_been_scrolled = false;
var fontSize = '14px'; //$('#serial_console').css('font-size');
var termPxWide = '560px'; //$('#serial_console').css('width');
var termPxHigh = '380px'; //$('#serial_console').css('height');
var lineHeight = Math.floor(parseInt(fontSize.replace('px', '')) * 1.1);
var term_width = Math.floor(parseInt(fontSize.replace('px', ''))) / 1.65;
var term_height = Math.floor(parseInt(termPxHigh.replace('px', '')));
term_width = Math.floor((parseInt(termPxWide.replace('px', '')) - 25) / term_width);
var ascii2unicode = ['\u00C7', '\u00FC', '\u00E9', '\u00E2', '\u00E4', '\u00E0', '\u00E5', '\u00E7', '\u00EA', '\u00EB', '\u00E8', '\u00EF', '\u00EE', '\u00EC', '\u00C4', '\u00C5', '\u00C9', '\u00E6', '\u00C6', '\u00F4', '\u00F6', '\u00F2', '\u00FB', '\u00F9', '\u00FF', '\u00D6', '\u00DC', '\u00A2', '\u00A3', '\u00A5', '\u20A7', '\u0192', '\u00E1', '\u00ED', '\u00F3', '\u00FA', '\u00F1', '\u00D1', '\u00AA', '\u00BA', '\u00BF', '\u2310', '\u00AC', '\u00BD', '\u00BC', '\u00A1', '\u00AB', '\u00BB', '\u2591', '\u2592', '\u2593', '\u2502', '\u2524', '\u2561', '\u2562', '\u2556', '\u2555', '\u2563', '\u2551', '\u2557', '\u255D', '\u255C', '\u255B', '\u2510', '\u2514', '\u2534', '\u252C', '\u251C', '\u2500', '\u253C', '\u255E', '\u255F', '\u255A', '\u2554', '\u2569', '\u2566', '\u2560', '\u2550', '\u256C', '\u2567', '\u2568', '\u2564', '\u2565', '\u2559', '\u2558', '\u2552', '\u2553', '\u256B', '\u256A', '\u2518', '\u250C', '\u2588', '\u2584', '\u258C', '\u2590', '\u2580', '\u03B1', '\u00DF', '\u0393', '\u03C0', '\u03A3', '\u03C3', '\u00B5', '\u03C4', '\u03A6', '\u0398', '\u03A9', '\u03B4', '\u221E', '\u03C6', '\u03B5', '\u2229', '\u2261', '\u00B1', '\u2265', '\u2264', '\u2320', '\u2321', '\u00F7', '\u2248', '\u00B0', '\u2219', '\u00B7', '\u221A', '\u207F', '\u00B2', '\u25A0', '\u00A0'];

var echo_trap = [];
var trap_echos = false;
var echo_keys = true;
var terminal_buffer = '';
var updateTermInterval = null;
var bufferAlert = false;
var scrollerTimeout = null;

$(document).ready(function () {

    fontSize = $('#serial_console').css('font-size');
    termPxWide = $('#serial_console').css('width');
    termPxHigh = $('#serial_console').css('height');
    lineHeight = Math.floor(parseInt(fontSize.replace('px', '')) * 1.1);
    term_width = 256; //Math.floor(parseInt(fontSize.replace('px', ''))) / 1.65;
    $('#serial_console').css({'overflow-x':'scroll'});
    term_height = Math.floor(parseInt(termPxHigh.replace('px', '')));
    //term_width = Math.floor((parseInt(termPxWide.replace('px', '')) - 20) / term_width);

    $("#serial_console").keydown(function (e) {
        //Validate key (or emit special key character)
        var keycode = e.keyCode || e.which;
        if (keycode === 8 || keycode === 13) {
            //Emit special character
            processKey(keycode);
        }

        //console.log('sending: ' + keycode);

        //Validate key
        var valid =
                (keycode > 47 && keycode < 58) || // number keys
                keycode === 32 || // spacebar
                (keycode > 64 && keycode < 91) || // letter keys
                (keycode > 95 && keycode < 112) || // numpad keys
                (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                (keycode > 218 && keycode < 223); // [\]' (in order)
        return valid;
    });

    $("#serial_console").keypress(function (e) {
        //Emit key character
        processKey(e.charCode);
        //console.log('sending: ' + charcode);
    });

    $("#serial_console").click(function () {
        var the_div = document.getElementById('serial_console').innerHTML;
        if (the_div[the_div.length - 1] !== '\u258D') {
            document.getElementById('serial_console').innerHTML = the_div + '\u258D';
        }
        
        /*
        term_been_scrolled = true;
        if(scrollerTimeout) {
            clearTimeout(scrollerTimeout);
        }
        scrollerTimeout = setTimeout(function() {
           term_been_scrolled = false;
        },15000);
        */
    });

    $("#serial_console").blur(function () {
        var the_div = document.getElementById('serial_console').innerHTML;
        if (the_div[the_div.length - 1] === '\u258D') {
            document.getElementById('serial_console').innerHTML = the_div.slice(0, -1);
            if (the_div === '\u258D') {
                document.getElementById('serial_console').innerHTML = '';
            }
        }
    });
});

function processKey(code) {
    var t_str = String.fromCharCode(code);
    
    //Emit key code to properly destination
    if (active_connection !== null && active_connection !== 'simulated' && active_connection !== 'websocket') {
        if (client_version >= minEnc64Ver) {
            active_connection.send(btoa(t_str));
            if (echo_keys) {
                displayInTerm(t_str);
            }
        } else {
            active_connection.send(String.fromCharCode(code));
            if (trap_echos) {
                echo_trap.push(code);
            }
        }    
    } else if (active_connection === 'simulated') {
        updateTermBox(String.fromCharCode(code));
    } else if (active_connection === 'websocket') {
        var msg_to_send = {
            type: 'serial-terminal',
            outTo: 'terminal',
            portPath: getComPort(),
            baudrate: baudrate.toString(10),
            msg: t_str,
            action: 'msg'
        };
        client_ws_connection.send(JSON.stringify(msg_to_send));
        if (echo_keys) {
            displayInTerm(t_str);
        }
    } 
}

function displayInTerm(str) {
    /*
     for (var f = 0; f < str.length; f++) {
     updateTermBox(str.charCodeAt(f));
     }
     */
    var termStatus = terminal_buffer.length;
    terminal_buffer += str;
    if (termStatus === 0) {
        sendBufferToTerm();
    } else if (termStatus > 255 && bufferAlert === false) {
        termBufferWarning();
    }
}

function termBufferWarning() {
    bufferAlert = true;
    var wrn = document.getElementById('serial-conn-info');
    var ptx = wrn.innerHTML;
    wrn.innerHTML = '<span class="alert-danger">Your program is sending too much data to the terminal at once.<br>Try adding pauses or sending less data.</span>';
    setTimeout(function () {
        wrn.innerHTML = ptx;
        bufferAlert = false;
    }, 5000);
}

function sendBufferToTerm() {
    do {
        //var o = echo_trap;
        //echo_trap = echo_trap.replace(terminal_buffer[0], '');
        //if (echo_trap.length >= o.length) {
        updateTermBox(terminal_buffer.charCodeAt(0));
        //}
        terminal_buffer = terminal_buffer.substr(1);
    } while (terminal_buffer.length > 0)
    displayTerm();
}

function updateTermBox(c) {
    for (zz = 0; zz < echo_trap.length; zz++) {
        if (echo_trap[zz] === c) {
            echo_trap.splice(zz, 1);
            return;
        }
    }
    cursorGotoY = cursorY;
    if (termSetCursor !== 4)
        cursorGotoX = cursorX;
    c = parseInt(c);
    switch (termSetCursor) {
        case 3:
            cursorGotoX = parseInt(c);
            termSetCursor = 4;
            break;
        case 2:
        case 4:
            cursorGotoY = parseInt(c);
            termSetCursor = 0;
            setCursor(cursorGotoX, cursorGotoY);
            break;
        case 1:
            cursorGotoX = parseInt(c);
            termSetCursor = 0;
            setCursor(cursorGotoX, cursorGotoY);
            break;
        case 0:
            switch (c) {
                case 127:
                case 8:
                    if (cursorX + cursorY > -1) {
                        if (textContainer[cursorY].length > 1) {
                            if (cursorX === textContainer[cursorY].length) {
                                textContainer[cursorY] = textContainer[cursorY].slice(0, -1);
                            } else if (cursorX > 0) {
                                var the_line = textContainer[cursorY];
                                textContainer[cursorY] = the_line.substr(0, cursorX - 1) + ' ' + the_line.substr(cursorX);
                            }
                        } else if (textContainer[cursorY].length === 1) {
                            textContainer[cursorY] = textContainer[cursorY] = '';
                        }
                        changeCursor(-1, 0);
                        break;
                    }
                case 13:
                case 10:
                    term_been_scrolled = true;
                    changeCursor(0, 1);
                    break;
                case 9:
                    var l = 5 - (cursorX) % 5;
                    for (k = 0; k < l; k++) {
                        textContainer[cursorY] += ' ';
                        changeCursor(1, 0);
                    }
                    break;
                case 0:
                case 16:
                    textContainer = null;
                    textContainer = new Array;
                    textContainer[0] = '';
                case 1:
                    cursorX = 0;
                    cursorY = 0;
                    changeCursor(0, 0);
                    break;
                case 3:
                    changeCursor(-1, 0);
                    break;
                case 4:
                    changeCursor(1, 0);
                    break;
                case 5:
                    changeCursor(0, -1);
                    break;
                case 6:
                    changeCursor(0, 1);
                    break;
                case 7: // Beep
                    document.getElementById("serial_console").classList.remove("visual-beep");
                    var ow = document.getElementById("serial_console").offsetWidth;
                    document.getElementById("serial_console").classList.add("visual-beep");
                    var sound = document.getElementById("term-beep");
                    sound.play();
                    break;
                case 11: // clear to end of line
                    textContainer[cursorY] = textContainer[cursorY].substr(0, cursorX);
                    break;
                case 12: // clear down
                    for (var n = cursorY + 1; n < textContainer.length; n++) {
                        textContainer[n].pop();
                    }
                    break;
                case 2:
                    termSetCursor = 3;
                    break;
                case 14:
                case 15:
                    termSetCursor = c - 13;
                    break;
                default:
                    var char = '';
                    if (c > 127 && c < 256) {
                        char = ascii2unicode[c - 128];
                    } else {
                        char = String.fromCharCode(c);
                    }
                    //console.log(char);
                    if ((textContainer[cursorY] || '').length > cursorX) {
                        var the_line = textContainer[cursorY] || '';
                        textContainer[cursorY] = the_line.substr(0, cursorX) + char + the_line.substr(cursorX + 1);
                    } else {
                        textContainer[cursorY] += char;
                    }
                    changeCursor(1, 0);
                    break;
            }
    }
    if (c === 0) {
        displayTerm();
    }
    //if (updateTermInterval) {
    //    clearTimeout(updateTermInterval);
    //}
    //updateTermInterval = setTimeout(function() {sendBufferToTerm();}, 250);
    return;
}

function changeCursor(x, y) {
    if (y === 1 && textContainer[cursorY].length >= cursorX) {
        textContainer[cursorY] = textContainer[cursorY].substr(0, cursorX);
    }
    cursorX += x;
    cursorY += y;
    if (cursorX > term_width - 1) {
        cursorX -= term_width;
        cursorY++;
        if (!textContainer[cursorY])
            textContainer[cursorY] = '';
    }
    if (cursorX < 0) {
        cursorY--;
        cursorX = textContainer[cursorY].length;
        if (cursorX > term_width - 1) {
            cursorX = term_width - 1;
            textContainer[cursorY] = textContainer[cursorY].substr(0, cursorX);
        }
    }
    if (cursorY < 0) {
        cursorY = 0;
        cursorX = 0;
    }
    if (y === 1) {
        cursorX = 0;
        if (!textContainer[cursorY]) {
            textContainer[cursorY] = '';
        }
    }
}

function displayTerm() {
    updateTermInterval = null;
    if (cursorY < textContainer.length - 1 && textContainer[textContainer.length - 1] === '') {
        textContainer.pop();
    }
    var tH = Math.floor(term_height / lineHeight);
    var cursorChar = '';
    var to_div = '';
    if (document.getElementById('serial_console') === document.activeElement) {
        cursorChar = '\u258D';
    }
    to_div = textContainer.join('\r') + cursorChar;
    if (textContainer.join('') === '') {
        to_div = cursorChar;
    }
    if (cursorY >= tH && term_been_scrolled) {
        $('#serial_console').css('overflow-y', 'hidden');
        $('#serial_console').scrollTop((cursorY - tH + 1) * lineHeight);
        $('#serial_console').css('overflow-y', 'scroll');
        term_been_scrolled = false;
    }

    document.getElementById('serial_console').innerHTML = to_div.replace(/ /g, '&nbsp;').replace(/\r/g, '<br>');
}

function setCursor(cx, cy) {
    if (cx > term_width - 1)
        cx = cx % term_width;
    if (!textContainer[cy]) {
        for (t = textContainer.length; t <= cy; t++) {
            textContainer[t] = '';
        }
    }
    while (!textContainer[cy][cx]) {
        textContainer[cy] += ' ';
    }
    cursorX = cx;
    cursorY = cy;
    changeCursor(0, 0);
}