
function login() {

    var client_id="5285760";
    var redirect_uri="http://oauth.vk.com/blank.html";
    var display= "mobile";
    var scope="messages,friends,news,photos,audio,video,docs,notes,pages,status,wall,groups,stats,offline";
    var response_type="token";
    var v ="5.45";
    var url = "https://oauth.vk.com/authorize?"+"client_id="+client_id+"&"+"redirect_uri="+redirect_uri+"&"+"display="+display+"&"+"scope="+scope+"&"+"response_type="+response_type+"&"+"v="+v;

    return url;

}

function check(url){

    console.log("ВНИМАНИЕ ВНИМАНИЕ");
    console.log(url);
    url=url+"";
    url=url.replace("#","?");
    var accessTokenStr = getParameterByName('access_token',url);
 DB.saveSetting("accessToken",accessTokenStr );
}


function getParameterByName(name, url) {

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




var dialogArray = new Array();
var nameArray=new Array();

function loadAccountInfo(url,n) {
var fname_global;

    fname_global="nothing :(";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
          dialogArray[n].name=parseJSON(xmlhttp.responseText,n);


 dialogModel.append( {"userName":dialogArray[n].name,"messageText":dialogArray[n].body,"userAvatar": dialogArray[n].avatar,"userID": dialogArray[n].uid});
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();



}
function parseJSON(response,n) {
    var arr = JSON.parse(response);

 // console.log(arr.response[0].first_name);
   var  fName=arr.response[0].first_name;
   var avatar_50=arr.response[0].photo_50;
    dialogArray[n].avatar=avatar_50;
    return fName;

}
function sendMessage(textMessage){
    var user_id=DB.getSetting("currentSelectedUserID");
    var url="https://api.vk.com/method/messages.send?user_id="+user_id+"&message="+textMessage+"&access_token=44e951057f94b9748e0314c031b7779bc20d1134614c4438b1f9ff420ce823196d675998e24de0e390fcb";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status == 200) {
            parseJSON4(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function parseJSON4(response ) {
    var arr = JSON.parse(response);

 console.log(response);


}


function loadFriends(url){


}

//loadDialogs
function loadDialogs() {
var _accessToken=DB.getSetting("accessToken");
var url="https://api.vk.com/method/messages.getDialogs?start_message_id=0&preview_length=25&access_token="+_accessToken;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
            parseJSON3(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}






function parseJSON3(response) {

   //  console.log(response);
  //  console.log("dialogs: ");
    var arr = JSON.parse(response);


    for(var i = 1; i < arr.response[0]; i++) {
        try {

//console.info('uid' in arr.response[i], " № "+i);
dialogArray.push({uid:arr.response[i].uid,
                                 body:arr.response[i].body,
mid:arr.response[i].mid,
 read_state:arr.response[i].read_state,
                     out:arr.response[i].out,
                     date:arr.response[i].date,
                    title:arr.response[i].title,
                     name:"",
                     avatar:""
                             });

        }
catch (e) {

}







    }
    var name;

      for(var i = 0; i < 15; i++) {
          name=loadAccountInfo("https://api.vk.com/method/users.get?fields=photo_50&user_id="+dialogArray[i].uid,i);

}



}

//WORK WITH MESSAGE
function saveSelectedUser(user_id,user_name){
 DB.saveSetting("currentSelectedUserID",user_id );
 DB.saveSetting("currentSelectedUserName",user_name );
}
function loadHistoryMessage(){
        var _accessToken=DB.getSetting("accessToken");
   var  user_id=DB.getSetting("currentSelectedUserID");
        console.log("АРРРРГХ", DB.getSetting("currentSelectedUserID"));
var url="https://api.vk.com/method/messages.getHistory?user_id="+user_id+"&access_token="+_accessToken;

console.log(url);


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status == 200) {
console.log("ААААРГввХ");
            parseJSON5(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


//дальше идем дерьмо с которым нужно разобраться
function parseJSON5(response ) {

    var arr = JSON.parse(response);


for (var i=0;i<100;i++){

        try{
messageModel.append( {"userName":arr.response[i].name,"messageText":arr.response[i].body,"userAvatar": arr.response[i].avatar,"userID": arr.response[i].uid});
        }
        catch(e){

        }
}


}
function loadAccountInfoForMessage( ) {
var fname_global;
      var  user_id=DB.getSetting("currentSelectedUserID");
var url="https://api.vk.com/method/users.get?fields=photo_50&user_id="+user_id;
    fname_global="nothing :(";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
          dialogArray[n].name=parseJSON9(xmlhttp.responseText,n);


 dialogModel.append( {"userName":dialogArray[n].name,"messageText":dialogArray[n].body,"userAvatar": dialogArray[n].avatar,"userID": dialogArray[n].uid});
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();



}
function parseJSON9(response,n) {
    var arr = JSON.parse(response);

 // console.log(arr.response[0].first_name);
   var  fName=arr.response[0].first_name;
   var avatar_50=arr.response[0].photo_50;
    dialogArray[n].avatar=avatar_50;
    return fName;

}
