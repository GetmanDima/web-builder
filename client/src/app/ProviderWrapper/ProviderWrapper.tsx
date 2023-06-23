import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from "./providers/StoreProvider";

export const ProviderWrapper = ({children}: PropsWithChildren<{}>) => (
  <BrowserRouter>
    <StoreProvider>
      {children}
    </StoreProvider>
  </BrowserRouter>
);

