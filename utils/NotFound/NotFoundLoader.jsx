import Lottie from "lottie-react";
import notFound from "./notFound.json";

// import "../../styles/notFoundLoader.scss";

import "@/styles/notFoundLoader.scss";

const NotFoundLoader = () => (
  <Lottie animationData={notFound} loop={true} id="loader" />
);

export default NotFoundLoader;
