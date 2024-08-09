import { Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(true);
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
        "sticky left-0 top-0 z-50 w-full bg-orange-600/90 text-white " +
        (show
          ? lastScrollY > 10
            ? "opacity-90 backdrop-blur-xl transition-opacity delay-75 duration-300 ease-in-out"
            : "opacity-100 transition-opacity delay-75 duration-300 ease-in-out"
          : "opacity-0 transition-opacity delay-75 duration-300 ease-in-out")
      }
    >
      <nav className="mx-auto flex w-[90%] items-center justify-between py-4 text-white">
        <div>
          <img src="/logo.png" alt="logo" className="h-20 w-auto" />
        </div>
        <div>
          <ul className="flex gap-4 text-xl">
            <li>
              <Link>Work</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Services</Link>
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
              <Link>Careers</Link>
            </li>
            <li>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
