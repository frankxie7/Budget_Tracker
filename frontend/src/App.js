import styled from "styled-components";
import background from "./img/background2.png";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Incomes from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useState } from "react";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Incomes />;
      case 3:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <AppStyled background={background} className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
