import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Web 0.2
import "Auth.js"  as VKLogin



MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    objectName: "mainView"

    // Note! applicationName needs to match the "name" field of the click manifest
    applicationName: "uvkontakte.landgraf"

    /*
     This property enables the application to change orientation
     when the device is rotated. The default is false.
    */
    //automaticOrientation: true

    // Removes the old toolbar and enables new features of the new header.


    width: units.gu(100)
    height: units.gu(75)

    Page {
        title: i18n.tr("uVkontakte")

        Column {
            spacing: units.gu(1)
            anchors {
                margins: units.gu(2)
                fill: parent
            }
            Item {
                          id: rootItem
                          // create a model item instance
                          ListModel {

                              id: messageModel





                          }
                     }

            UbuntuListView{
 Component.onCompleted: VKLogin.loadDialogs();
 anchors { left: parent.left; right: parent.right;  }
                height: units.gu(24)




                  delegate:ListItem.Base {


                        id:delegateItem
                        width:parent.width;height:units.gu(7);

                        onClicked: { }
                        Text{
                            id:itemMessageText
                            anchors.left: parent.left
                            anchors.leftMargin: 30
                            anchors.verticalCenter: parent.verticalCenter

                            font.pixelSize:  units.dp(25)
                            text:messageText
                        }
                    }

                id:messageListView
                anchors.top:stationSearchField.top
                anchors.topMargin:units.gu(15);
                anchors.fill:parent
                model:messageModel

                spacing:4

            }







        }
    }
}


