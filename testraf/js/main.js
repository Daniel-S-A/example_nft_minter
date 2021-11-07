
import { App } from './App.js';

function Start() {
  ChangeMessage();
}
var Messages = [
  "What do you see?",
  "Coming soon to Fantom Network",
  "Follow us on Twitter.",
];

var currentIndex = 0;

function ChangeMessage() {
  document.getElementById("changingMessageElement").innerHTML =
    Messages[currentIndex];
  currentIndex += 1;
  if (currentIndex >= Messages.length) currentIndex = 0;

  setTimeout(function () {
    ChangeMessage();
  }, 8000);
}

var availableInkblot = [91,99,103,104,105,122,136,162,183,186,194,196,239,240,246,250,258,264]

var phase = 0;

var nftIndex=0;
var nftdescription;
var nftowner="";
function LoadMintPage() {
  phase = 0;
  $("#phaseTitle").html('Tutorial');

  $("#content").html(
    '<p>1. Make the transaction. <br />2. Your new Inkblot will appear for 3 seconds. <br />3. You will describe what you saw. <br />4. Your minted NFT Inkblot will be ready. <br /><span id="FTMvalue">100</span> FTM > 1 INKBLOT</p><a href="javascript:StartProcess()" class="bt">Start Mint</a>'
  );
}

function StartProcess() {
  //EnterDescription();
  
  $("#phaseTitle").html('');
  $("#content").addClass("align-center");
  phase = 1;
  $("#content").html("<h3>Waiting for transaction</h3>");
  App();
  

}

/*
document.body.onmousedown = function (evt) {
  if (phase == 2) {
    ShowNFT();
  }
  if (phase == 1) {
    TransactionApproved();
  }
};*/

 function TransactionApproved() {
  phase = 2;
  $("body").addClass("lightBg");
  $("#content").html("<h3>Transaction Accepted</h3>");
  setTimeout("ShowNFT()",2000);
}

 function TransactionError(){
  phase = 2;
  $("#content").html("<h3>Transaction Error. Refresh page</h3>");
}

function ShowNFT() {
  $("#backgroundColor").addClass("whiteBg");
  phase = 3;
  nftIndex=Math.round(Math.random()*availableInkblot.length);
  $("#backgroundInkblot").css("background-image", "url(inkblots/inkblot"+availableInkblot[nftIndex].toString()+".png)");
  $("#content").html("");
  $("#backgroundInkblot").addClass("activeBackground");
  setTimeout("EnterDescription()",5000);
}

function EnterDescription(){
  phase=4;
  $("#backgroundInkblot").removeClass("activeBackground");
  $("body").removeClass("lightBg");
  $("#backgroundColor").removeClass("whiteBg");

  $("#content").html("<h3>What did you see</h3> <input id='nftdescription' placeholder='Enter brief description'></input><br><label><p>The description will be listed as the description of the Inkblot</p></label><br><button onclick='SubmitDescription()'>create</button>");

  $( "#nftdescription" ).change(function() { //characters remaining

  });
}

function SubmitDescription(){
  phase=5;
  $("#phaseTitle").html('Listing Completed');

  nftdescription=$("#nftdescription").val();

  $("#content").html('<img src="inkblots/inkblot'+availableInkblot[nftIndex].toString()+'.png"><br><h3>Blotchain Inkblot '+availableInkblot[nftIndex].toString()+'</h4><p>Owned by '+nftowner+'<p><p>'+nftdescription+'</p><a href="index.html" class="bt">complete</a>');
}


