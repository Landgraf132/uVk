
.pragma library

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
    console.log(accessTokenStr);
loadDialogs("https://api.vk.com/method/messages.getDialogs?preview_length=25&access_token="+accessTokenStr)
 //   loadAccountInfo("https://api.vk.com/method/users.get?user_id=155208499");

}
function getParameterByName(name, url) {

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}








function loadAccountInfo(url) {

var fName2;
    var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
                    fName2=parseJSON(xmlhttp.responseText);
                    console.log(fName2);
  return fName2;
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();


}

function parseJSON(response) {
var arr = JSON.parse(response);
var fName;
 fName=arr.response[0].first_name;
    return fName;

    }

    function loadFriends(url){


    }

    //loadDialogs
    function loadDialogs(url) {

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
  console.log("dialogs: ");
  var arr = JSON.parse(response);



            for(var i = 1; i < arr.response[0]; i++) {


console.log(loadAccountInfo("https://api.vk.com/method/users.get?user_id="+ arr.response[i].uid)+"\n"+ arr.response[i].body);



            }

}
