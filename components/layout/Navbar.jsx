"use client";
import { useState } from "react";
import { RiTrainLine } from "react-icons/ri";

import { GiHamburgerMenu, GiHamburger } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";

import "@/styles/navbar.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="navbar">
        <div className="navTags">
          <a onClick={() => router.back()}>
            <IoArrowBackSharp />
          </a>

          <a onClick={() => router.push("/")}>
            <RiTrainLine />
          </a>
        </div>
        <ul
          className={isMobile ? "navLinksMobile" : "navLinks"}
          onClick={() => setIsMobile(false)}
        >
          <li>
            <Link href="/">Train Between Stations</Link>
          </li>
          <li>
            <Link href="/trainTimeTable">Train Timetable</Link>
          </li>
          {/* <li>
            <Link href="/pnr">PNR Status</Link>
          </li> */}
          {/* The reason PNR Status is commented because PNR is not working right
          now */}
        </ul>
        <a className="mobileMenuIcons" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </a>
      </nav>
    </>
  );
};

export default Navbar;
