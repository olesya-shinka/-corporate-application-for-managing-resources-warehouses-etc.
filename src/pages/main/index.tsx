import "../../index.css";
import Header from "../../components/header";
import Menu from "../../components/menu";
import BodyItems from "../../components/body";

function Main() {
  return (
    <>
      <Header />
      <div className="wrapper"></div>
      <Menu />
      <BodyItems />
    </>
  );
}

export default Main;
