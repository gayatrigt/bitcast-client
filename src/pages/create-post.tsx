import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { authUser, signMessage } = useAppContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null); // Handle potential undefined files
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

    try {
      const response = await PostService.create(formData);

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Post sent successfully");
      setIsSubmitting(false);
      router(-1);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
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
            <input
              onChange={handleFileChange}
              type="file"
              id="media"
              name="media"
              accept="video/*"
              required
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
