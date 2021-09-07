var exit = document.createElement('div');
exit.className = "dfa-popup-exit";
exit.id = "dfa-popup-exit";

var leaf = document.createElement('div');
leaf.className = "dfa-popup-leaf";
leaf.id = "dfa-popup-leaf";

var body = document.querySelector('body');
body.appendChild(exit);
body.appendChild(leaf);

function exitPage() {
    document.getElementById('dfa-popup-exit').style.display = "none";
    document.getElementById('dfa-popup-leaf').style.display = "none";
}

function popup() {
    var params = 'scrollbars=no,resizable=no,status=no,titlebar=no,location=no,toolbar=no,menubar=no,width=289,height=560,left=1000,top=150';
    open('https://axguo.github.io/sustainable-fashion/popup/popup.html', 'sustained', params);
    exitPage();
}

document.getElementById("dfa-popup-exit").addEventListener('click', exitPage);
document.getElementById("dfa-popup-leaf").addEventListener('click', popup);