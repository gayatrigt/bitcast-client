import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/postService";
import { useAppContext } from "../app-context";
import { toast } from "sonner";

export default function CreatePostPage() {
  const router = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState("Choose a video to upload");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { authUser, signMessage } = useAppContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("Choose a video to upload");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if user is logged in
    if (!authUser?.access_token) return signMessage();

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("media", selectedFile);
    formData.append("topic", topic);
    formData.append("caption", caption);
    formData.append("tiktok", tiktok);

    const createPost = PostService.create(formData);

    toast.promise(createPost, {
      loading: "Uploading post...",
      success: () => {
        router(-1);
        return "Post has been uploaded";
      },
      error: (res) => {
        return res.response.data.message;
      },
      finally: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div>
      <div
        className="back-btn"
        onClick={() => {
          router(-1);
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15.7649" cy="15.8145" r="15" stroke="#F1F2F4" />
          <path
            d="M21.7649 15.3145L13.7649 15.3145"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.2649 19.8145L10.7649 15.3145L15.2649 10.8145"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="page-title">Create post</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-grp">
            <label htmlFor="topic">Topic</label>
            <input
              type="text"
              id="topic"
              name="topic"
              required
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g #Bitcoin"
            />
          </div>

          <div className="input-grp">
            <label htmlFor="media">Video</label>
            <div className="video-input">
              <svg
                width="50"
                height="39"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M49.2998 2.94628C49.1579 2.85804 48.9957 2.80773 48.8288 2.80018C48.6619 2.79263 48.4958 2.82809 48.3466 2.90316L38.0049 8.07405V5.73984C38.0035 4.4407 37.4868 3.19516 36.5682 2.27653C35.6496 1.35789 34.404 0.841208 33.1049 0.839844H5.66489C4.3658 0.841369 3.12035 1.35811 2.20175 2.27671C1.28316 3.1953 0.766418 4.44075 0.764893 5.73984L0.764893 25.3398C0.766418 26.6389 1.28316 27.8844 2.20175 28.803C3.12035 29.7216 4.3658 30.2383 5.66489 30.2398H15.4649C15.7248 30.2398 15.9741 30.1366 16.1579 29.9528C16.3416 29.769 16.4449 29.5198 16.4449 29.2598C16.4449 28.9999 16.3416 28.7507 16.1579 28.5669C15.9741 28.3831 15.7248 28.2798 15.4649 28.2798H5.66489C4.88542 28.279 4.13811 27.969 3.58694 27.4178C3.03577 26.8666 2.72574 26.1193 2.72489 25.3398V5.73984C2.72574 4.96037 3.03577 4.21306 3.58694 3.66189C4.13811 3.11072 4.88542 2.80069 5.66489 2.79984H33.1049C33.8844 2.80069 34.6317 3.11072 35.1828 3.66189C35.734 4.21306 36.044 4.96037 36.0449 5.73984V25.3398C36.044 26.1193 35.734 26.8666 35.1828 27.4178C34.6317 27.969 33.8844 28.279 33.1049 28.2798H23.3049C23.045 28.2798 22.7957 28.3831 22.6119 28.5669C22.4281 28.7507 22.3249 28.9999 22.3249 29.2598C22.3249 29.5198 22.4281 29.769 22.6119 29.9528C22.7957 30.1366 23.045 30.2398 23.3049 30.2398H33.1049C34.404 30.2385 35.6496 29.7218 36.5682 28.8032C37.4868 27.8845 38.0035 26.639 38.0049 25.3398V23.0056L48.3466 28.1765C48.4827 28.2444 48.6328 28.2798 48.7849 28.2798C49.0448 28.2797 49.2939 28.1764 49.4777 27.9926C49.6614 27.8089 49.7647 27.5597 49.7649 27.2998V3.77984C49.7648 3.61278 49.722 3.44851 49.6406 3.30263C49.5592 3.15674 49.4419 3.03408 49.2998 2.94628ZM47.8049 25.714L38.0049 20.814V10.2656L47.8049 5.36564V25.714ZM20.3649 13.9856V37.0998C20.3649 37.3598 20.2616 37.609 20.0779 37.7928C19.8941 37.9766 19.6448 38.0798 19.3849 38.0798C19.125 38.0798 18.8757 37.9766 18.6919 37.7928C18.5081 37.609 18.4049 37.3598 18.4049 37.0998V13.9856L12.2378 20.1527C12.053 20.3313 11.8054 20.43 11.5485 20.4278C11.2915 20.4256 11.0457 20.3225 10.864 20.1408C10.6823 19.9591 10.5792 19.7133 10.577 19.4564C10.5748 19.1994 10.6736 18.9519 10.8521 18.767L18.6908 10.9281C18.8751 10.7444 19.1247 10.6412 19.3849 10.6412C19.6451 10.6412 19.8947 10.7444 20.079 10.9281L27.9178 18.7669C28.0114 18.8573 28.0861 18.9655 28.1374 19.085C28.1888 19.2046 28.2158 19.3332 28.2169 19.4633C28.2181 19.5935 28.1933 19.7225 28.144 19.8429C28.0947 19.9634 28.022 20.0728 27.9299 20.1648C27.8379 20.2568 27.7285 20.3296 27.6081 20.3789C27.4876 20.4281 27.3586 20.4529 27.2285 20.4518C27.0983 20.4507 26.9697 20.4236 26.8502 20.3723C26.7306 20.3209 26.6225 20.2463 26.5321 20.1527L20.3649 13.9856Z"
                  fill="black"
                />
              </svg>

              <span>{fileName}</span>

              <label htmlFor="media" className="upload-btn">
                Choose file
              </label>
            </div>
            <input
              ref={actualBtnRef}
              onChange={handleFileChange}
              type="file"
              id="media"
              name="media"
              accept="video/*"
              hidden
            />
          </div>

          <div className="input-grp">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <label htmlFor="caption">Caption</label>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: " 20px",
                  color: "#999999",
                }}
              >
                120 max
              </span>
            </div>
            <textarea
              id="caption"
              name="caption"
              rows={5}
              required
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>

          <div className="input-grp">
            <label htmlFor="tiktok">TikTok URL</label>
            <input
              type="url"
              id="tiktok"
              name="tiktok"
              required
              onChange={(e) => setTiktok(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
