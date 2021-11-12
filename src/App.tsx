import React from "react";
import {
  StyledMain,
  StyledHeader,
  StyledHeaderText,
  StyledImg,
} from "./StyledApp";
import Home from "./screen/Home";
import Logo from "./assets/bunnings.jpg";

// Delaring Function Component Type for App.js and Adding Styled Components onto respective HTML Tags
const App: React.FC = () => {
  return (
    <StyledMain>
      <StyledHeader>
        <StyledImg src={Logo} alt={"Bunnings Logo"} />
        <StyledHeaderText>Initialize Project</StyledHeaderText>
      </StyledHeader>
      <Home />
    </StyledMain>
  );
};

export default App;
