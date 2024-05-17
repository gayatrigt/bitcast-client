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
          <svg
            width="99.79px"
            height="20.87px"
            viewBox="0 0 8012 1683"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M780.325 7.1185L15.6081 580.676C5.93829 587.813 -0.0188585 599.724 0.0748193 611.744V1644.14C0.0767311 1664.16 18.2904 1682.38 38.3107 1682.38H554.494C574.515 1682.38 592.728 1664.16 592.73 1644.14V1032.34H1013.32V1644.14C1013.33 1664.16 1031.54 1682.38 1051.56 1682.38H1567.74C1587.76 1682.38 1605.98 1664.16 1605.98 1644.14V611.744C1605.98 599.724 1600.12 587.813 1590.45 580.676L825.73 7.1185C808.17 -3.18224 795.464 -1.51515 780.325 7.1185ZM803.027 85.9846L1529.51 630.862V1605.91H1089.8V994.103C1089.79 974.083 1071.58 955.867 1051.56 955.865H554.494C534.474 955.867 516.261 974.083 516.259 994.103V1605.91H76.5465V630.862L803.027 85.9846Z"
              fill="black"
            />
            <path
              d="M2548.03 1497.66V498.655H2996.15C3057.05 498.655 3109.85 509.12 3154.57 530.052C3200.24 550.032 3235.44 579.051 3260.18 617.108C3285.87 654.215 3298.71 698.932 3298.71 751.261V765.533C3298.71 811.202 3290.15 848.784 3273.02 878.278C3255.9 906.821 3235.44 929.18 3211.65 945.354C3188.82 960.577 3166.94 971.519 3146.01 978.179V1003.87C3166.94 1009.58 3189.77 1020.52 3214.51 1036.69C3239.25 1051.92 3260.18 1074.27 3277.3 1103.77C3295.38 1133.26 3304.42 1171.8 3304.42 1219.37V1233.64C3304.42 1288.82 3291.58 1336.4 3265.89 1376.36C3240.2 1415.36 3204.52 1445.33 3158.85 1466.27C3114.13 1487.2 3061.8 1497.66 3001.86 1497.66H2548.03ZM2736.41 1326.41H2979.03C3019.94 1326.41 3052.76 1316.42 3077.5 1296.43C3103.19 1276.45 3116.04 1247.91 3116.04 1210.81V1196.53C3116.04 1159.43 3103.67 1130.88 3078.93 1110.9C3054.19 1090.92 3020.89 1080.93 2979.03 1080.93H2736.41V1326.41ZM2736.41 909.675H2976.17C3015.18 909.675 3047.06 899.685 3071.79 879.705C3097.48 859.725 3110.33 832.133 3110.33 796.93V782.659C3110.33 746.504 3097.96 718.912 3073.22 699.884C3048.48 679.903 3016.13 669.913 2976.17 669.913H2736.41V909.675Z"
              fill="#292A31"
            />
            <path
              d="M3463.83 1497.66V789.794H3643.65V1497.66H3463.83ZM3553.74 707.019C3521.39 707.019 3493.8 696.554 3470.96 675.622C3449.08 654.69 3438.14 627.099 3438.14 592.847C3438.14 558.595 3449.08 531.003 3470.96 510.072C3493.8 489.14 3521.39 478.674 3553.74 478.674C3587.04 478.674 3614.63 489.14 3636.51 510.072C3658.4 531.003 3669.34 558.595 3669.34 592.847C3669.34 627.099 3658.4 654.69 3636.51 675.622C3614.63 696.554 3587.04 707.019 3553.74 707.019Z"
              fill="#292A31"
            />
            <path
              d="M4114.07 1497.66C4067.45 1497.66 4029.4 1483.39 3999.9 1454.85C3971.36 1425.35 3957.09 1386.35 3957.09 1337.82V938.219H3780.12V789.794H3957.09V570.012H4136.91V789.794H4331V938.219H4136.91V1306.42C4136.91 1334.97 4150.23 1349.24 4176.87 1349.24H4313.88V1497.66H4114.07Z"
              fill="#292A31"
            />
            <path
              d="M4801.22 1517.64C4732.71 1517.64 4670.39 1503.37 4614.26 1474.83C4559.08 1446.29 4515.31 1404.9 4482.96 1350.67C4450.61 1296.43 4434.44 1230.79 4434.44 1153.72V1133.74C4434.44 1056.67 4450.61 991.023 4482.96 936.791C4515.31 882.56 4559.08 841.172 4614.26 812.629C4670.39 784.086 4732.71 769.814 4801.22 769.814C4868.77 769.814 4926.81 781.707 4975.33 805.493C5023.85 829.279 5062.86 862.104 5092.36 903.967C5122.8 944.879 5142.78 991.499 5152.3 1043.83L4978.18 1080.93C4974.38 1052.39 4965.82 1026.7 4952.5 1003.87C4939.17 981.033 4920.15 962.956 4895.41 949.636C4871.62 936.316 4841.65 929.656 4805.5 929.656C4769.34 929.656 4736.52 937.743 4707.02 953.917C4678.48 969.14 4655.65 992.451 4638.52 1023.85C4622.35 1054.29 4614.26 1091.88 4614.26 1136.59V1150.86C4614.26 1195.58 4622.35 1233.64 4638.52 1265.04C4655.65 1295.48 4678.48 1318.79 4707.02 1334.97C4736.52 1350.19 4769.34 1357.8 4805.5 1357.8C4859.73 1357.8 4900.64 1344.01 4928.23 1316.42C4956.78 1287.87 4974.85 1250.77 4982.47 1205.1L5156.58 1246.48C5144.21 1296.91 5122.8 1343.06 5092.36 1384.92C5062.86 1425.83 5023.85 1458.18 4975.33 1481.97C4926.81 1505.75 4868.77 1517.64 4801.22 1517.64Z"
              fill="#292A31"
            />
            <path
              d="M5590.34 1517.64C5533.26 1517.64 5480.45 1503.85 5431.93 1476.26C5383.41 1447.71 5344.4 1406.33 5314.9 1352.09C5285.41 1297.86 5270.66 1232.21 5270.66 1155.15V1132.31C5270.66 1055.25 5285.41 989.596 5314.9 935.364C5344.4 881.132 5383.41 840.221 5431.93 812.629C5481.4 784.086 5534.21 769.814 5590.34 769.814C5655.04 769.814 5704.04 780.756 5737.34 802.639C5771.59 823.57 5796.81 847.832 5812.98 875.424H5838.67V789.794H6015.64V1306.42C6015.64 1334.97 6028.96 1349.24 6055.6 1349.24H6112.68V1497.66H5969.97C5935.72 1497.66 5907.17 1488.15 5884.34 1469.12C5862.46 1450.09 5851.51 1423.93 5851.51 1390.63V1389.2H5825.83C5809.65 1424.4 5783.49 1454.85 5747.33 1480.54C5712.13 1505.28 5659.8 1517.64 5590.34 1517.64ZM5644.58 1360.66C5700.71 1360.66 5746.86 1343.06 5783.01 1307.85C5820.12 1271.7 5838.67 1219.37 5838.67 1150.86V1136.59C5838.67 1068.09 5820.12 1016.24 5783.01 981.033C5745.9 944.879 5699.76 926.801 5644.58 926.801C5589.39 926.801 5543.25 944.879 5506.14 981.033C5469.04 1016.24 5450.48 1068.09 5450.48 1136.59V1150.86C5450.48 1219.37 5469.04 1271.7 5506.14 1307.85C5543.25 1343.06 5589.39 1360.66 5644.58 1360.66Z"
              fill="#292A31"
            />
            <path
              d="M6541.05 1517.64C6448.76 1517.64 6373.12 1497.66 6314.14 1457.7C6255.15 1417.74 6219.47 1360.66 6207.1 1286.44L6372.65 1243.63C6379.31 1276.93 6390.25 1303.09 6405.47 1322.12C6421.65 1341.15 6441.15 1354.95 6463.99 1363.51C6487.77 1371.12 6513.46 1374.93 6541.05 1374.93C6582.92 1374.93 6613.84 1367.79 6633.82 1353.52C6653.8 1338.3 6663.79 1319.75 6663.79 1297.86C6663.79 1275.98 6654.27 1259.33 6635.25 1247.91C6616.22 1235.54 6585.77 1225.55 6543.91 1217.94L6503.95 1210.81C6454.47 1201.29 6409.28 1188.45 6368.37 1172.27C6327.46 1155.15 6294.63 1131.84 6269.89 1102.34C6245.16 1072.85 6232.79 1034.79 6232.79 988.169C6232.79 917.763 6258.48 864.007 6309.85 826.9C6361.23 788.843 6428.78 769.814 6512.51 769.814C6591.48 769.814 6657.13 787.416 6709.46 822.619C6761.79 857.822 6796.04 903.967 6812.21 961.053L6645.24 1012.43C6637.62 976.276 6621.93 950.587 6598.14 935.364C6575.31 920.141 6546.76 912.53 6512.51 912.53C6478.26 912.53 6452.09 918.714 6434.02 931.083C6415.94 942.5 6406.9 958.675 6406.9 979.606C6406.9 1002.44 6416.42 1019.57 6435.44 1030.98C6454.47 1041.45 6480.16 1049.54 6512.51 1055.25L6552.47 1062.38C6605.75 1071.9 6653.8 1084.74 6696.61 1100.91C6740.38 1116.14 6774.63 1138.5 6799.37 1167.99C6825.06 1196.53 6837.9 1235.54 6837.9 1285.02C6837.9 1359.23 6810.79 1416.79 6756.55 1457.7C6703.27 1497.66 6631.44 1517.64 6541.05 1517.64Z"
              fill="#292A31"
            />
            <path
              d="M7252.7 1497.66C7206.08 1497.66 7168.02 1483.39 7138.53 1454.85C7109.99 1425.35 7095.72 1386.35 7095.72 1337.82V938.219H6918.75V789.794H7095.72V570.012H7275.54V789.794H7469.63V938.219H7275.54V1306.42C7275.54 1334.97 7288.86 1349.24 7315.5 1349.24H7452.5V1497.66H7252.7Z"
              fill="#292A31"
            />
            <path
              d="M7495.54 594.748V353.661H7410.75V303.781H7635.21V353.661H7550.41V594.748H7495.54ZM7672.57 594.748V303.781H7774.41L7824.71 557.338H7832.19L7882.49 303.781H7984.32V594.748H7931.12V344.1H7923.64L7873.76 594.748H7783.14L7733.26 344.1H7725.78V594.748H7672.57Z"
              fill="#292A31"
            />
          </svg>
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
                    <ProfileIcon
                      username={authUser.address}
                      width="38"
                      height="38"
                    />
                  </span>
                  <span className="drawer-listitem-title">
                    {shortenName(authUser.address)}
                  </span>
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
