import logo from "../assets/logo.svg";
import ButtonWithIconGroup from "./NavBar/ButtonGroup";
import DropDown from "./NavBar/DropDown";
import { LuSearch, LuShoppingCart, LuUserRound } from "react-icons/lu";
import { AnnouncementBarProps, ButtonGroupProps } from "./NavBar/types";
import AnouncementBar from "./NavBar/AnouncementBar";
import { Link } from "react-router-dom";

export default function NavBar() {
  const buttongroup: ButtonGroupProps = {
    buttons: [
      { icon: LuUserRound, size: 22, onClick: () => {} },
      { icon: LuSearch, size: 22, onClick: () => {} },
      { icon: LuShoppingCart, size: 22, onClick: () => {} },
    ],
    className: "",
  };

  const anouncmentbar: AnnouncementBarProps = {
    items: [
      { text: "END OF SEASON SALE", link: "/" },
      { text: "LIMITED TIME OFFER", link: "/" },
      { text: "NEW ARRIVALS AVAILABLE", link: "/" },
    ],
    speed: 80,
    direction: "left",
  };

  return (
    <>
      <AnouncementBar {...anouncmentbar} />
      <div className="flex items-center justify-between pt-5 px-12">
        <DropDown />
        <Link to="/">
          <img src={logo} className="w-30" />
        </Link>
        <ButtonWithIconGroup {...buttongroup} />
      </div>
    </>
  );
}
