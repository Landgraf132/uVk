import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Web 0.2
import QtQuick.LocalStorage 2.0
import "Database.js"  as DB
import "Auth.js"  as VKLogin


/*!
    \brief MainView with a Label and Button elements.
*/

MainView {
    // objectName for functional testing purposes (autopilot-qt5)

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
width:parent.width

                WebView{

id:authWebView
width:parent.width
height:parent.width


url:VKLogin.login();


 onUrlChanged:
 {
  pageStack.push(Qt.resolvedUrl("DialogPage.qml"))
     VKLogin.check(authWebView.url);


 }



                }

            }


        }
    }
}
