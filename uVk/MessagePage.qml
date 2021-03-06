import QtQuick 2.4
import QtQuick.LocalStorage 2.0
import Ubuntu.Components 1.3
import Ubuntu.Components.ListItems 1.3 as ListItem
import "Auth.js"  as VKLogin
import "Database.js"  as DB
MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    objectName: "SelectCity"



    /*
     This property enables the application to change orientation
     when the device is rotated. The default is false.
    */



    headerColor: "#EEF2F5"
    width: mainview.width
    height: mainview.height
    Page {



        title: "Сообщения с "


        Column {
            spacing: units.gu(1)
            anchors {

                fill: parent
            }









            Item {
                id: rootItem
                // create a model item instance
                ListModel {

                    id: messageModel





                }
            }
Rectangle{
    id: messageArrayView;
    width:parent.width;
    height:parent.height-units.gu(10);
    UbuntuListView{
                //Component.onCompleted: Main.getAllCity()
                anchors { left: parent.left; right: parent.right;  }
                height: units.gu(24)
                Component.onCompleted:{
VKLogin.loadHistoryMessage();
                }




                delegate:ListItem.Base {


                    id:delegateItem
                    width:parent.width;height:itemMessageText.height;
anchors.top:delegateItem.bottom;
anchors.topMargin:itemMessageText.height;
                    onClicked: {

                    }
                    UbuntuShape {
                        id:itemUserAvatar
                        source:   Image{

                            source: userAvatar
                        }
                    }
                    Image{
                        id:itemMyAvatar
                        source: myAvatar

                    }
                    Text{
                        id:itemUserName
                        anchors.left: itemUserAvatar.right
                        anchors.leftMargin: 30
                        anchors.verticalCenter: parent.verticalCenter
                        anchors.top:parent.top;
                        color: "#35373A"
                        font.pixelSize:  units.dp(18)
                        text:userName
                    }
                    Text{
                        id:itemMessageText
                        color: "#7E7E7F"
                        anchors.left: itemUserAvatar.right
                        anchors.leftMargin: 50

                        anchors.top:itemUserName.top;
                        anchors.topMargin:units.dp(22);
                        font.pixelSize:  units.dp(17)
                        text:messageText
                    }
                    Text{
                        id:itemDateMessage
                        anchors.left: parent.left
                        anchors.leftMargin: 30
                        anchors.verticalCenter: parent.verticalCenter

                        font.pixelSize:  units.dp(25)
                        text:dateMessage
                    }

                    Text{
                        id:itemUserID
                        text:userID
                        visible: false
                    }
                }

                id:messageListView


                anchors.fill:parent
                model:messageModel

                spacing:4

            }
}

            Row{
                anchors.top:messageArrayView.bottom;
                anchors.topMargin:units.dp(10);
            TextField {
                  width:units.gu(32); height:units.gu(6);
                 id: messageArea
                    placeholderText: "Введите сообщение"

                    font.pixelSize:  units.dp(25)

                    anchors.left:parent.left;
                                          anchors {
                                              margins: units.gu(2)

                                          }
            }
            Button{
                anchors.left:messageArea.right;

text:"Отпр"
onClicked: {
VKLogin.sendMessage(messageArea.text)
}

            }
}
        }
    }
}
