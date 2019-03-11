function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function idRandom() {

  var idPl= "";

  for (var i = 0; i < 3; i++) {

    var getRnd = getRandom(65, 90);
    var getChar = String.fromCharCode(getRnd);

    idPl += getChar;
  }

  for (var i = 0; i < 3; i++) {

    var idNum = getRandom(0, 9);
    idPl += idNum;
  }

  return idPl;
}

function dataPlayer() {

  var twoPerc = getRandom(0, 100);
  var threePerc = 100 - twoPerc;

  var player = {

    "id" : idRandom(),
    "points" : getRandom(0, 100),
    "bounce": getRandom(0, 500),
    "mistake": getRandom(0, 50),
    "twoPerc": twoPerc,
    "threePerc": threePerc,
  }

  return player;
}
// verifico se l'id è presente nella lista dei players generati
function isPresent(id, players) {

  var finded = false;

  for (var i = 0; i < players.length; i++) {
    if (players[i].id == id) {
      finded = true;
    }
  }
  return finded;
}

//
function getPlayerById(id, listPlayers) {
  var playerIdSelected;

  for (var i = 0; i < listPlayers.length; i++) {
    if (id == listPlayers[i].id) {
      playerIdSelected = listPlayers[i];
    }
  }
  return playerIdSelected;
}


function getPlayers() {

  var players = [];

  while (players.length < 100) {

    var player = dataPlayer();
    if (!isPresent(player.id, players)) {
      players.push(player);
    }
  }
  // console.log(players);
  return players;
}

function updateUI(listPlayers) {

  var datalist = $("#players");

  for (var i = 0; i < listPlayers.length; i++) {

    var opt = document.createElement("option");

    opt.value= listPlayers[i].id;
    datalist.append(opt);
  }
}


function clearClick() {

  var inputContent = $("#usr-input");

  inputContent.val("");

  var idDOM = $("#id > span.content");
  var pointsDOM = $("#points > span.content");
  var bounceDOM = $("#bounce > span.content");
  var mistakeDOM = $("#mistake > span.content");
  var twoPercDOM = $("#twoPerc > span.content");
  var threePercDOM = $("#threePerc > span.content");

  idDOM.text("");
  pointsDOM.text("");
  bounceDOM.text("");
  mistakeDOM.text("");
  twoPercDOM.text("");
  threePercDOM.text("");
}

// trovo il player che è stato selezionato
function playersSelection(listPlayers) {
  var me = $("#usr-input");
  var selected = me.val();

  var player = getPlayerById(selected, listPlayers);

  var idDOM = $("#id > span.content");
  var pointsDOM = $("#points > span.content");
  var bounceDOM = $("#bounce > span.content");
  var mistakeDOM = $("#mistake > span.content");
  var twoPercDOM = $("#twoPerc > span.content");
  var threePercDOM = $("#threePerc > span.content");
  // console.log(player);
  idDOM.text(player.id);
  pointsDOM.text(player.points);
  bounceDOM.text(player.bounce);
  mistakeDOM.text(player.mistake);
  twoPercDOM.text(player.twoPerc + "%");
  threePercDOM.text(player.threePerc + "%");
}


// main function
function init() {
  var listPlayers = getPlayers();
  var clearbtn = $("#clear-btn");
  var userInput = $("#usr-input");
  userInput.on("change", function() {
    playersSelection(listPlayers);
  });
  clearbtn.click(clearClick);
  updateUI(listPlayers);
}

$(document).ready(init);
