
    export const fullScreen = (nodeDOM: HTMLElement) => {
       if (nodeDOM.requestFullscreen) {
         nodeDOM.requestFullscreen();
       }
       else if ((nodeDOM as any).msRequestFullscreen) {
         (nodeDOM as any).msRequestFullscreen();
       }
       else if ((nodeDOM as any).mozRequestFullScreen) {
         (nodeDOM as any).mozRequestFullScreen();
       }
       else if ((nodeDOM as any).webkitRequestFullscreen) {
         (nodeDOM as any).webkitRequestFullscreen();
       } else {
         console.error('Fullscreen API is not supported');
       }
     }

     export const fullScreenExit = () => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        else if ((document as any).mozExitFullscreen) {
          (document as any).mozExitFullscreen();
        }
        else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else {
          console.error('Fullscreen API is not supported');
        }
      }