import { Popup } from 'react-native-popup-confirm-toast';
import { COLORS } from '../constants';
import BodyComponent from '../component/popupComponent/BodyComponent';




export const popupSuccessMessage = (msg) =>{
          Popup.show({
            type: 'success',
            title: 'Success!',
            textBody: msg,
            buttonText: 'OK',
            callback: () => Popup.hide()
          });
  }
export const popupWithConfirmation = (deletePack) => {


  Popup.show({
    background:'#fa7575',
    type: 'confirm',
    title: 'Attention',
    textBody: 'Vous .... ',
    buttonText: 'Supprimer',
    confirmText: 'Annuler',
    confirmButtonStyle:{backgroundColor:COLORS.primary,padding:8},
    confirmButtonTextStyle:{backgroundColor:COLORS.primary,color:'white'},
    okButtonTextStyle:{padding:8},
    okButtonStyle:{backgroundColor:'red'},
    callback: async () => {
        await deletePack();
        Popup.hide();
        
    },
    cancelCallback: () => {
        Popup.hide();
    },
})


}

export const popupErrorWithConfirmation = (msg) =>{
              Toast.show({
                title: 'I\'m Eight!',
                text: {msg},
                backgroundColor: '#702c91',
                timeColor: '#440f5f',
                timing: 3000,
                icon: <Icon name={'check'} color={'#fff'} size={31}/>,
                position: 'top',
                statusBarTranslucent: false,
                statusBarType:'light-content',
                onCloseComplete: () => {
                  alert('onCloseComplete');
                },
                onOpenComplete: () => {
                  alert('onOpenComplete');
                },
              })
        }


export const popupWithBody    = (setMotif,handelStatut) => {
          const popup = Popup; 
          popup.show({
              
              type: 'confirm',
              textBody: 'Motif',
              bodyComponent: () => BodyComponent({popup,setMotif}),
              iconEnabled: false,
              callback: async () => {
                await handelStatut();
                Popup.hide();
                
              },
              cancelCallback: () => {
                  Popup.hide();
              },
              
          });
  }