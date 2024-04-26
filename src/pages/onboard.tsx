import { Link, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/header";
import { useEffect } from "react";

export default function OnboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const onboard = localStorage.getItem("onboarded");
      if (onboard) navigate("/feeds");
      localStorage.setItem("onboarded", "true");
    })();
  }, []);

  return (
    <div style={{ background: "#fff" }}>
      <HeaderComponent />
      <div id="splash-cont">
        <div className="tp-splash">
          <img src="https://bitcast.s3.eu-north-1.amazonaws.com/splash.png" alt="" />
          <h2>Welcome Bitcaster</h2>
          <p>
            Upload videos, accrue votes, and stand a chance to win $100, while
            10 lucky voters snag $10 each.
          </p>
        </div>

        <div className="bt-splash">
          <Link to="/feeds">
            <button>Get started</button>
          </Link>
          <span>
            By taping <b>“Get started”</b> you acknowledge that you have read
            and agreed to the <b>terms and conditions</b>
          </span>
        </div>
      </div>
    </div>
  );
}
