import { configureStore } from "../store/configure-store";
import { Provider } from "react-redux";
import axios from "axios";
import "../styles/styles.scss";

axios.defaults.baseURL = "https://simple-blog-api.crew.red";
export const store = configureStore();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
