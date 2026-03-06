import "../styles/splash.css";
import austLogo from "../assets/aust-logo.png";

export default function SplashOverlay() {
  return (
    <div className="splashWrap">
      <div className="splashBg" />

      <div className="splashCard">
        <div className="splashTop">
          <div className="splashLogo"> 
             <img src={austLogo} alt="AUST Logo" />
               </div>
              <div className="splashMeta">
             <div className="splashUni">AHSANULLAH UNIVERSITY OF SCIENCE AND TECHNOLOGY</div>
            <div className="splashDept">Academy Track</div>
          </div>
        </div>

        <div className="splashMain">
          <div className="typeLine">
            <span className="typeText"> AUST </span>
            <span className="caret" />
          </div>
          <div className="tagline"> AUST Academic Tracking System </div>
        </div>

        <div className="loaderRow">
          <div className="loaderBar">
            <div className="loaderFill" />
          </div>
          <div className="dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  );
}