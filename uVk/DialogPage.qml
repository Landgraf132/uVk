import QtQuick 2.4
import QtQuick.LocalStorage 2.0
import Ubuntu.Components 1.3
import "Database.js"  as DB
import Ubuntu.Components.ListItems 1.3 as ListItem
import "Auth.js"  as VKLogin

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



        title: "Сообщения"


        Column {
            spacing: units.gu(1)
            anchors {

                fill: parent
            }









            Item {
                id: rootItem
                // create a model item instance
                ListModel {

                    id: dialogModel





                }
            }

            UbuntuListView{
                //Component.onCompleted: Main.getAllCity()
                anchors { left: parent.left; right: parent.right;  }
                height: units.gu(24)
                Component.onCompleted:  VKLogin.loadDialogs();




                delegate:ListItem.Base {


                    id:delegateItem
                    width:parent.width;height:units.gu(9);

                    onClicked: {VKLogin.saveSelectedUser(itemUserID.text,itemUserName.text);  pageStack.push(Qt.resolvedUrl("MessagePage.qml")) ;
//VKLogin.sendMessage(itemUserID.text);
                    }
                    UbuntuShape {
                        id:itemUserAvatar
                        source:   Image{

                            source: userAvatar
                        }
                    }
                    Image{
                        id:myAvatar
                      //  source: "pics/qtlogo.png"

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
                        anchors.verticalCenter: parent.verticalCenter
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

                id:dialogListView

                anchors.topMargin:units.gu(6);
                anchors.fill:parent
                model:dialogModel

                spacing:4

            }


        }
    }
}
