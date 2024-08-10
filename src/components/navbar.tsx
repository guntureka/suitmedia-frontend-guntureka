import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScrollNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollNavbar);

    return () => {
      window.removeEventListener("scroll", handleScrollNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={
        "fixed left-0 top-0 z-50 w-full overflow-hidden bg-orange-600 text-white" +
        (show
          ? lastScrollY > 10
            ? "opacity-90 backdrop-blur-xl transition-opacity delay-75 duration-300 ease-in-out"
            : "opacity-100 transition-opacity delay-75 duration-300 ease-in-out"
          : "-top-40 opacity-0 transition-opacity delay-75 duration-300 ease-in-out")
      }
    >
      <nav className="z-50 mx-auto flex w-[80%] items-center justify-between overflow-hidden py-4 text-white">
        <div className="relative z-50">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              className="relative h-10 w-auto md:h-20"
            />
          </Link>
        </div>
        <div className="relative">
          <div className="relative z-50 md:hidden">
            <GiHamburgerMenu
              onClick={() => setIsClicked(!isClicked)}
              className=""
            />
          </div>
          <ul className="hidden gap-4 text-xl md:flex">
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link
                to="/ideas"
                activeProps={{ className: "underline underline-offset-8" }}
              >
                Ideas
              </Link>
            </li>
            <li>
              <Link to="/career">Careers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="overflow-hidden">
        <ul
          className={`${isClicked ? "absolute z-[100] flex w-screen flex-col gap-4 bg-orange-600 px-[10%] py-10 text-white shadow-md md:hidden" : "hidden"}`}
        >
          <li>
            <Link to="/work">Work</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link
              to="/ideas"
              activeProps={{ className: "underline underline-offset-8" }}
            >
              Ideas
            </Link>
          </li>
          <li>
            <Link to="/career">Careers</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
