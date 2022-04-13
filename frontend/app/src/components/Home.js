import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const IMAGE_URL = "/images/";
const USER_URL = "/user/";
const POSTIMAGE_URL = "/post-image/";

const Home = () => {
  const { auth } = useAuth();

  const [postImage, setPostImage] = useState(null);
  const [refreshImages, setRefreshImages] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState([]);
  const [addImage, setAddImage] = useState(false);

  const config = {
    headers: {
      Authorization: `Token ${auth}`,
    },
  };

  async function getCurrentUser() {
    setUser();
    try {
      const response = await axios.get(USER_URL, config);
      setUser(response?.data?.username);
      setUserId(response?.data?.id);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Bad Request");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  }

  const handleAddImage = () => {
    setAddImage(!addImage);
  };

  async function getImages() {
    try {
      const response = await axios.get(IMAGE_URL, config);
      setImages(response?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Bad Request");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  }

  async function handlePostImage(e) {
    e.preventDefault();
    setImages([]);

    const form_data = new FormData();
    form_data.append("image", postImage);
    form_data.append("owner", userId);
    try {
      const response = await axios.post(POSTIMAGE_URL, form_data, {
        headers: {
          Authorization: `Token ${auth}`,
        },
      });
      window.location.reload();
      // console.log(response?.data);
      setRefreshImages(!refreshImages);
      setAddImage(!addImage);
      setPostImage(null);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Bad Request");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Unsupported media type");
      }
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getImages();
  }, [refreshImages]);

  return (
    <div>
      <section className="home-container">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className="user">
          <h3>Welcome {user}</h3>
          <h3>
            <button onClick={handleAddImage}>Add Image</button>
          </h3>
        </div>
        <div className="main">
          {addImage && (
            <div className="image-container">
              <form onSubmit={handlePostImage} className="image-form" id="form">
                <input
                  type="file"
                  name="file"
                  id="image"
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
                <button className="add-image">Add Image</button>
              </form>
            </div>
          )}
          <div className="main-container">
            {!images || images.length < 1 ? (
              <p>There's no Image in your gallery</p>
            ) : (
              images.map((image) => {
                return (
                  <div className="image-container" key={new Date()}>
                    <img src={image.image} alt="gallery" />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
