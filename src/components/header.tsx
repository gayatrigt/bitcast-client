
import { Drawer } from "vaul";
import ProfileIcon from "./profile-icon";
import { useState } from "react";
import { useAppContext } from "../app-context";
import { shortenName } from "../services/httpService";

export default function HeaderComponent() {
  const [openInfoDrawer, setOpenInfoDrawer] = useState<boolean>(false);
  const { authUser, signMessage } = useAppContext();

  return (
    <>
      <header>
        <div className="l">
          <img src="https://bitcast.s3.eu-north-1.amazonaws.com/home.png" alt="" />
        </div>
        <div className="r" onClick={() => setOpenInfoDrawer(true)}>
          <svg
            width="18"
            height="5"
            viewBox="0 0 18 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.0719" cy="2.47675" r="1.68414" fill="black" />
            <circle cx="8.88776" cy="2.47675" r="1.68414" fill="black" />
            <circle cx="15.7036" cy="2.47675" r="1.68414" fill="black" />
          </svg>
        </div>
      </header>

      <Drawer.Root open={openInfoDrawer} shouldScaleBackground>
        <Drawer.Portal>
          <Drawer.Overlay className="drawer-overlay" />
          <Drawer.Content className="drawer-cont">
            <Drawer.Title className="drawer-header">
              <div
                className="drawer-close"
                onClick={() => setOpenInfoDrawer(false)}
              >
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15.1693" cy="15.2343" r="15" fill="#F1F2F4" />
                  <path
                    d="M19.1693 11.2343L11.1693 19.2343"
                    stroke="#9696A0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.1693 11.2343L19.1693 19.2343"
                    stroke="#9696A0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Drawer.Title>

            <ul className="drawer-list">
              {authUser && (
                <li className="drawer-listitem">
                  <span className="drawer-listitem-icon">
                    <ProfileIcon username={authUser.address} width="38" height="38" />
                  </span>
                  <span className="drawer-listitem-title">{shortenName(authUser.address)}</span>
                </li>
              )}

              {!authUser && (
                <li className="drawer-listitem">
                  <span className="drawer-listitem-icon">
                    <ProfileIcon
                      username={"0x00000"}
                      saturation={0}
                      lightness={70}
                      width="38"
                      height="38"
                    />
                  </span>
                  <span className="drawer-listitem-title" onClick={signMessage}>
                    Connect wallet to sign in
                  </span>
                </li>
              )}
              <li className="drawer-listitem">
                <span className="drawer-listitem-icon">
                  <svg
                    width="39"
                    height="39"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.240234"
                      y="0.438049"
                      width="38"
                      height="38"
                      rx="19"
                      fill="#F4F8FB"
                    />
                    <path
                      d="M16.8153 16.9381C17.0112 16.3811 17.3979 15.9115 17.9069 15.6123C18.4159 15.3132 19.0144 15.2039 19.5963 15.3037C20.1782 15.4035 20.706 15.706 21.0862 16.1577C21.4664 16.6093 21.6745 17.181 21.6736 17.7714C21.6736 19.4381 19.1736 20.2714 19.1736 20.2714M19.2403 23.6047H19.2486M27.5736 19.4381C27.5736 24.0404 23.8427 27.7714 19.2403 27.7714C14.6379 27.7714 10.907 24.0404 10.907 19.4381C10.907 14.8357 14.6379 11.1047 19.2403 11.1047C23.8427 11.1047 27.5736 14.8357 27.5736 19.4381Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="drawer-listitem-title">Help center</span>
              </li>
              <li className="drawer-listitem">
                <span className="drawer-listitem-icon">
                  <svg
                    width="39"
                    height="39"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.240234"
                      y="0.438049"
                      width="38"
                      height="38"
                      rx="19"
                      fill="#F4F8FB"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.2402 26.938C13.8281 26.938 11.704 26.5536 11.3598 24.6075C11.0155 22.6613 13.2183 19.0026 13.8972 17.7951C16.1673 13.7581 17.7099 11.938 19.2402 11.938C20.7704 11.938 22.313 13.7581 24.5831 17.7951C25.262 19.0026 27.4648 22.6613 27.1205 24.6075C26.7772 26.5536 24.6522 26.938 19.2402 26.938Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.2402 16.5214V19.7672"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.2366 22.6839H19.2441"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="drawer-listitem-title">Report problems</span>
              </li>
            </ul>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
