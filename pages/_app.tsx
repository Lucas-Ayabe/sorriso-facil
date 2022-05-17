import "open-props/style";
import "@/app.style.css";

import { Provider } from "react-redux";

import { store } from "@";
import { AppPropsWithLayout } from "@types";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </Provider>
  );
}

export default App;
