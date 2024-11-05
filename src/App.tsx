import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"; 

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
