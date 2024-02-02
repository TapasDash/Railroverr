import Lottie from "lottie-react";
import notFound from "./notFound.json";

import "../../styles/NotFoundLoader.scss";

const NotFoundLoader = () => (
  <Lottie animationData={notFound} loop={true} id="loader" />
);

export default NotFoundLoader;
