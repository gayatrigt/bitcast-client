import { useEffect, useRef, useState } from "react";
import PostService from "../services/postService";
import ProfileIcon from "./profile-icon";
import { Drawer } from "vaul";
import { useAppContext } from "../app-context";
import { shortenName } from "../services/httpService";

interface PostProps {
  id: string;
  address: string;
  tag: string;
  caption: string;
  createdAt: Date;
  upvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  tiktok: string;
  mediaUrl: string;
}

export default function Post({
  id,
  address,
  tag,
  createdAt,
  caption,
  upvotes,
  upvoted,
  downvoted,
  tiktok,
  mediaUrl,
}: PostProps): React.ReactElement<Post> {
  const [isUpvoted, setisUpvoted] = useState<boolean>(upvoted);
  const [isDownvoted, setisDownvoted] = useState<boolean>(downvoted);
  const [upvoteCount, setUpvoteCount] = useState<number>(upvotes);
  const [openShareDrawer, setOpenShareDrawer] = useState<boolean>(false);
  const { authUser, signMessage } = useAppContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [, setIsPlaying] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

  const togglePlay = () => {
    if (
      videoRef.current &&
      (videoRef.current.paused || videoRef.current.ended)
    ) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const upvote = async (id: string) => {
    if (!authUser) {
      return signMessage();
    }
    setisUpvoted(true);
    setisDownvoted(false);
    setUpvoteCount(upvoteCount + 1);
    await PostService.upvote(id);
  };

  const downvote = async (id: string) => {
    if (!authUser) {
      return signMessage();
    }
    setisDownvoted(true);
    setisUpvoted(false);
    if (isUpvoted) setUpvoteCount(upvoteCount - 1);
    await PostService.downvote(id);
  };

  const unvote = async (id: string) => {
    if (!authUser) {
      return signMessage();
    }
    setisUpvoted(false);
    setisDownvoted(false);
    if (isUpvoted) setUpvoteCount(upvoteCount - 1);
    await PostService.unvote(id);
  };

  const timeSince = (date: Date) => {
    const seconds = Math.floor((Number(new Date()) - Number(new Date(date))) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}days`;
    } else if (hours > 0) {
      return `${hours}hrs`;
    } else {
      return `${minutes}mins`;
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const handleIntersect = (entries: any[], _observer: unknown) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Play video when it enters the viewport
          if (video)
            video.play().catch((error) => {
              console.error("Error playing video:", error);
            });
        } else {
          // Pause video when it exits the viewport
          if (video) video.pause();
        }
      });
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // Use the viewport as the root
      threshold: 0.75, // Trigger when 75% of the video is visible
    });

    // Observe the video element
    if (video) observer.observe(video);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="post-cont">
        <div className="post-card">
          <div className="post-card-header">
            <ProfileIcon username={address} width="150" height="150" />
            <div>
              <div>
                <span className="name">{shortenName(address)}</span>
                <span className="time">{timeSince(createdAt)}</span>
              </div>
              <span className="tag">in #{tag}</span>
            </div>
          </div>
          <div className="post-card-caption">{caption}</div>
          <div className="post-card-media">
            <video
              ref={videoRef}
              src={mediaUrl}
              autoPlay
              muted={isMuted}
              controls={false}
              onClick={togglePlay}
            >
            </video>
            <span onClick={toggleMute}>
              <svg
                width="30"
                height="31"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15.8909" r="15" fill="black" />
                <path
                  d="M12.1513 12.0996L9.47131 9.41959L8.52865 10.3623L20.5286 22.3623L21.4713 21.4196L20.1246 20.0729C21.124 18.9093 21.6712 17.4248 21.666 15.8909C21.666 13.1636 20.018 10.9223 17.6666 9.89092V11.2243C19.258 12.1483 20.3326 13.9223 20.3326 15.8909C20.3292 17.0753 19.9379 18.226 19.2186 19.1669L18.3613 18.3096C18.7626 17.5816 19 16.6843 19 15.8909C19 14.7103 18.4833 13.2909 17.6666 12.5576V17.6149L16.3333 16.2816V9.31226L12.1513 12.0996ZM9.66665 19.2243H11.4646L16.3333 22.4696V19.9716L9.06798 12.7063C8.84791 12.8164 8.66271 12.9855 8.53301 13.1946C8.4033 13.4038 8.33417 13.6448 8.33331 13.8909V17.8909C8.33331 18.6263 8.93131 19.2243 9.66665 19.2243Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          <div className="post-card-footer">
            <span className="post-btn vote">
              <svg
                onClick={async () => {
                  if (!isUpvoted) {
                    await upvote(id);
                  } else {
                    await unvote(id);
                  }
                }}
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.29704 16.8356H11.0083V9.02701C11.0083 8.72315 11.2542 8.47727 11.558 8.47727H14.2025L8.29704 1.85034L2.39159 8.47727H5.03605C5.33991 8.47727 5.58579 8.72315 5.58579 9.02701V16.8356H8.29704ZM11.5588 17.9358H5.03605C4.73219 17.9358 4.48632 17.6899 4.48632 17.3861V9.57675H1.16588V9.57601C1.03597 9.57601 0.905323 9.52977 0.8011 9.43729C0.574306 9.23545 0.554489 8.88829 0.756329 8.6615L7.88309 0.664263C7.8985 0.646648 7.91465 0.629767 7.933 0.61362C8.15979 0.41178 8.50695 0.432331 8.70879 0.658391L15.8231 8.64095C15.92 8.74003 15.9801 8.87581 15.9801 9.02554C15.9801 9.3294 15.7343 9.57528 15.4304 9.57528H12.11V17.3846C12.11 17.6885 11.8641 17.9344 11.5602 17.9344L11.5588 17.9358Z"
                  fill={!isUpvoted ? "#999999" : "#5CC384"}
                />
              </svg>
              <span
                className="footer-btn-text"
                style={{ color: `${!isUpvoted ? "#999999" : "#5CC384"}` }}
              >
                {upvoteCount}
              </span>
              <span className="pipe">|</span>
              <svg
                onClick={async () => {
                  if (!isDownvoted) {
                    await downvote(id);
                  } else {
                    await unvote(id);
                  }
                }}
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2 4.57484H14.9112V12.3835C14.9112 12.6873 15.1571 12.9332 15.461 12.9332H18.1054L12.2 19.5601L6.29455 12.9332H8.93901C9.24287 12.9332 9.48874 12.6873 9.48874 12.3835V4.57484H12.2ZM15.4617 3.47464H8.93901C8.63515 3.47464 8.38927 3.72051 8.38927 4.02437V11.8337H5.06883V11.8344C4.93892 11.8344 4.80828 11.8807 4.70405 11.9732C4.47726 12.175 4.45744 12.5222 4.65928 12.749L11.786 20.7462C11.8015 20.7638 11.8176 20.7807 11.8359 20.7968C12.0627 20.9987 12.4099 20.9781 12.6117 20.7521L19.726 12.7695C19.8229 12.6704 19.8831 12.5346 19.8831 12.3849C19.8831 12.0811 19.6372 11.8352 19.3334 11.8352H16.0129V4.02584C16.0129 3.72198 15.767 3.4761 15.4632 3.4761L15.4617 3.47464Z"
                  fill={!isDownvoted ? "#999999" : "#c35c68"}
                />
              </svg>
            </span>
            <span className="post-btn">
              <span
                className="footer-btn-text"
                onClick={() => {
                  window.open(tiktok, "_blank");
                }}
              >
                Tiktok
              </span>
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2833 3.09686C12.5997 2.31648 12.223 1.31429 12.2233 0.276855H9.13332V12.6769C9.10949 13.3479 8.82619 13.9835 8.34309 14.4498C7.85998 14.9161 7.21477 15.1768 6.54332 15.1769C5.12332 15.1769 3.94332 14.0169 3.94332 12.5769C3.94332 10.8569 5.60332 9.56686 7.31332 10.0969V6.93686C3.86332 6.47686 0.843323 9.15686 0.843323 12.5769C0.843323 15.9069 3.60332 18.2769 6.53332 18.2769C9.67332 18.2769 12.2233 15.7269 12.2233 12.5769V6.28686C13.4763 7.18671 14.9807 7.6695 16.5233 7.66686V4.57686C16.5233 4.57686 14.6433 4.66686 13.2833 3.09686Z"
                  fill="#999999"
                />
              </svg>
            </span>
            <span className="post-btn" onClick={() => setOpenShareDrawer(true)}>
              <span className="footer-btn-text">Share</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5533 5.87781L22.1374 11.8028L14.5533 17.7279V14.6469C14.1499 14.6279 7.11691 14.402 2.22925 18.6759C4.18522 12.6496 10.3285 10.0284 14.5533 8.95883V5.87781Z"
                  fill="#999999"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <Drawer.Root open={openShareDrawer}>
        <Drawer.Portal>
          <Drawer.Overlay className="drawer-overlay" />
          <Drawer.Content className="drawer-cont">
            <Drawer.Title className="drawer-header">
              <div
                className="drawer-close"
                onClick={() => setOpenShareDrawer(false)}
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

              <span className="drawer-title">Share</span>
            </Drawer.Title>
            <div className="drawer-hori-container">
              <div className="drawer-hori-item">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.704"
                    cy="21.0864"
                    r="20"
                    fill="white"
                    stroke="black"
                  />
                  <g clipPath="url(#clip0_67_9310)">
                    <path
                      d="M18.954 22.2114C19.2224 22.5703 19.5648 22.8672 19.9581 23.082C20.3513 23.2969 20.7862 23.4246 21.2331 23.4566C21.6801 23.4887 22.1287 23.4242 22.5486 23.2675C22.9684 23.1109 23.3497 22.8659 23.6665 22.5489L25.5415 20.6739C26.1107 20.0846 26.4257 19.2952 26.4186 18.4758C26.4115 17.6564 26.0828 16.8727 25.5034 16.2933C24.924 15.7139 24.1402 15.3852 23.3209 15.3781C22.5015 15.371 21.7121 15.6859 21.1227 16.2552L20.0477 17.3239"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.454 20.9614C21.1856 20.6026 20.8431 20.3057 20.4499 20.0909C20.0566 19.876 19.6218 19.7482 19.1748 19.7162C18.7279 19.6842 18.2792 19.7487 17.8594 19.9053C17.4395 20.0619 17.0583 20.307 16.7415 20.6239L14.8665 22.4989C14.2972 23.0883 13.9823 23.8777 13.9894 24.6971C13.9965 25.5164 14.3251 26.3002 14.9045 26.8796C15.4839 27.459 16.2677 27.7877 17.0871 27.7948C17.9065 27.8019 18.6959 27.4869 19.2852 26.9177L20.354 25.8489"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_67_9310">
                      <rect
                        width="15"
                        height="15"
                        fill="white"
                        transform="translate(12.704 14.0864)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p>Copy link</p>
              </div>
              <div className="drawer-hori-item">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20.704" cy="20.0864" r="20" fill="#00E676" />
                  <path
                    d="M16.9248 26.1181L17.1864 26.2497C18.2763 26.9078 19.497 27.215 20.7177 27.215C24.5542 27.215 27.6932 24.056 27.6932 20.1949C27.6932 18.3522 26.952 16.5533 25.6442 15.237C24.3362 13.9208 22.5923 13.1749 20.7177 13.1749C16.8812 13.1749 13.7422 16.3339 13.7858 20.2388C13.7858 21.5551 14.1782 22.8275 14.8321 23.9243L15.0065 24.1876L14.309 26.7762L16.9248 26.1181Z"
                    fill="#00E676"
                  />
                  <path
                    d="M26.3933 14.3909C24.911 12.8553 22.862 12.0216 20.7694 12.0216C16.3225 12.0216 12.7476 15.6632 12.7912 20.0946C12.7912 21.4986 13.1835 22.8588 13.8375 24.0873L12.704 28.2554L16.9329 27.1585C18.11 27.8167 19.4178 28.1238 20.7258 28.1238C25.129 28.1238 28.704 24.4821 28.704 20.0508C28.704 17.9009 27.8756 15.8826 26.3933 14.3909ZM20.7694 26.7637C19.5922 26.7637 18.4151 26.4566 17.4124 25.8424L17.1508 25.7107L14.6223 26.3688L15.2762 23.868L15.1018 23.6047C13.1835 20.4896 14.0991 16.3652 17.238 14.4347C20.377 12.5042 24.4315 13.4256 26.3498 16.5846C28.268 19.7436 27.3524 23.824 24.2136 25.7546C23.2108 26.4127 21.9901 26.7637 20.7694 26.7637ZM24.6059 21.8936L24.1263 21.6742C24.1263 21.6742 23.4288 21.3671 22.9928 21.1477C22.9492 21.1477 22.9056 21.1038 22.862 21.1038C22.7312 21.1038 22.644 21.1477 22.5568 21.1916C22.5568 21.1916 22.5133 21.2355 21.9029 21.9375C21.8593 22.0252 21.7721 22.0691 21.6849 22.0691H21.6413C21.5977 22.0691 21.5105 22.0252 21.4669 21.9814L21.2489 21.8936C20.7694 21.6742 20.3334 21.4109 19.9846 21.06C19.8974 20.9722 19.7666 20.8845 19.6794 20.7967C19.3743 20.4896 19.0691 20.1386 18.8511 19.7437L18.8075 19.6559C18.7639 19.612 18.7639 19.5682 18.7203 19.4805C18.7203 19.3927 18.7203 19.305 18.7639 19.2611C18.7639 19.2611 18.9383 19.0417 19.0691 18.9101C19.1563 18.8223 19.1999 18.6907 19.2871 18.603C19.3743 18.4713 19.4179 18.2958 19.3743 18.1642C19.3307 17.9448 18.8075 16.7602 18.6768 16.4969C18.5895 16.3653 18.5024 16.3215 18.3716 16.2776H17.892C17.8048 16.2776 17.7177 16.3215 17.6304 16.3215L17.5868 16.3653C17.4996 16.4092 17.4124 16.4969 17.3252 16.5408C17.238 16.6286 17.1944 16.7163 17.1072 16.8041C16.802 17.199 16.6277 17.6816 16.6277 18.1642C16.6277 18.5152 16.7149 18.8662 16.8457 19.1733L16.8893 19.305C17.2817 20.1386 17.8048 20.8845 18.5024 21.5426L18.6768 21.7181C18.8075 21.8497 18.9383 21.9375 19.0255 22.069C19.9411 22.8589 20.9874 23.4292 22.1645 23.7363C22.2953 23.7802 22.4696 23.7802 22.6004 23.8241H23.0364C23.2544 23.8241 23.5159 23.7364 23.6904 23.6486C23.8211 23.5609 23.9083 23.5609 23.9955 23.4731L24.0827 23.3853C24.1699 23.2976 24.2571 23.2537 24.3443 23.166C24.4315 23.0782 24.5187 22.9905 24.5623 22.9027C24.6495 22.7272 24.693 22.5078 24.7367 22.2885V21.9814C24.7367 21.9814 24.693 21.9375 24.6059 21.8936Z"
                    fill="white"
                  />
                </svg>

                <p>WhatsApp</p>
              </div>
              <div className="drawer-hori-item">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20.204" cy="20.0864" r="20" fill="#2AA3EF" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.4092 14.998C27.8058 15.2656 27.156 15.4466 26.4754 15.5285C27.1705 15.1113 27.7044 14.4522 27.9554 13.6665C27.3047 14.0522 26.5845 14.3322 25.817 14.4827C25.203 13.8284 24.3283 13.4198 23.36 13.4198C21.5006 13.4198 19.9926 14.9265 19.9926 16.7857C19.9926 17.0505 20.0235 17.3067 20.0805 17.5534C17.2827 17.4134 14.8025 16.0723 13.142 14.036C12.8514 14.5332 12.6863 15.1113 12.6863 15.7285C12.6863 16.8962 13.281 17.9268 14.1837 18.5297C13.6314 18.5125 13.112 18.3611 12.6593 18.1087C12.6593 18.123 12.6593 18.1372 12.6593 18.1515C12.6593 19.7821 13.8187 21.1422 15.3595 21.4518C15.0767 21.5289 14.7803 21.5699 14.4723 21.5699C14.2561 21.5699 14.0446 21.5489 13.839 21.5089C14.2676 22.8462 15.5111 23.8196 16.9843 23.8472C15.8316 24.7491 14.3796 25.2873 12.8021 25.2873C12.5308 25.2873 12.2625 25.272 11.9989 25.2406C13.4885 26.1959 15.2582 26.7531 17.1601 26.7531C23.3523 26.7531 26.739 21.6242 26.739 17.1762C26.739 17.0296 26.7351 16.8857 26.7293 16.741C27.3868 16.2666 27.9583 15.6733 28.4092 14.9989V14.998Z"
                    fill="white"
                  />
                </svg>
                <p>Twitter</p>
              </div>
              <div className="drawer-hori-item">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="20.704"
                    cy="20.0864"
                    r="20"
                    fill="url(#paint0_linear_67_9330)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.2277 11.3685H17.1803C14.3162 11.3685 11.9861 13.6986 11.9861 16.5627V23.6101C11.9861 26.4742 14.3162 28.8044 17.1803 28.8044H24.2277C27.0919 28.8044 29.422 26.4742 29.422 23.6101V16.5627C29.422 13.6986 27.0918 11.3685 24.2277 11.3685ZM27.6679 23.6101C27.6679 25.5101 26.1276 27.0503 24.2277 27.0503H17.1803C15.2803 27.0503 13.7401 25.5101 13.7401 23.6101V16.5627C13.7401 14.6627 15.2803 13.1225 17.1803 13.1225H24.2277C26.1276 13.1225 27.6679 14.6627 27.6679 16.5627V23.6101ZM16.1945 20.0864C16.1945 17.5999 18.2174 15.5769 20.704 15.5769C23.1906 15.5769 25.2135 17.5998 25.2135 20.0864C25.2135 22.573 23.1906 24.5959 20.704 24.5959C18.2174 24.5959 16.1945 22.5729 16.1945 20.0864ZM20.704 22.8419C19.1822 22.8419 17.9485 21.6083 17.9485 20.0864C17.9485 18.5646 19.1822 17.3309 20.704 17.3309C22.2258 17.3309 23.4595 18.5646 23.4595 20.0864C23.4595 21.6082 22.2258 22.8419 20.704 22.8419ZM25.2222 16.6913C25.819 16.6913 26.3028 16.2075 26.3028 15.6107C26.3028 15.014 25.819 14.5302 25.2222 14.5302C24.6255 14.5302 24.1417 15.014 24.1417 15.6107C24.1417 16.2075 24.6255 16.6913 25.2222 16.6913Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_67_9330"
                      x1="0.837621"
                      y1="0.0196054"
                      x2="0.70398"
                      y2="40.0196"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#7024C4" />
                      <stop offset="0.415461" stopColor="#C21975" />
                      <stop offset="0.702206" stopColor="#C74C4D" />
                      <stop offset="1" stopColor="#E09B3D" />
                    </linearGradient>
                  </defs>
                </svg>
                <p>Instagram</p>
              </div>
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
