import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Web 0.2
import "Auth.js"  as VKLogin

/*!
    \brief MainView with a Label and Button elements.
*/

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
            Row{


                WebView{

id:authWebView
width:300
height:300


url:VKLogin.login();


 onUrlChanged:
 {

     VKLogin.check(authWebView.url);
urlText.text=authWebView.url;

 }



                }

            }
Column{
    Label{
         id: statusBar

                 text: authWebView.loadProgress === 100 ? qsTr("Done") : qsTr("Loading: ") + authWebView.loadProgress + "%" ;
}



    Label {
        height:50;
        width:300;
    id:urlText;
text:authWebView.url;

    }

            Row {
                  Button {
                       text: "Press me"

                   }
                   Button {
                       text: "Cancel"

                   }
}
}

        }
    }
}

