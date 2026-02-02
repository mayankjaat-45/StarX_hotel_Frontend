import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full px-3 md:px-5 py-2 bg-(--secondary-beige) shadow-lg ">
      {/* Top Section */}
      <div className="px-4 py-10 grid text-center grid-cols-1 sm:text-start  gap-6 sm:grid-cols-2 md:grid-cols-4 ">
        {/* Brand */}
        <div className="">
          {/* <h2 className="text-2xl font-bold font-Oswal mb-3">StarX Hotels</h2> */}
          <Link
            to={"/"}
            className="w-20 sm:w-20.5"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-full object-fill" alt="StarX_Hotels" />
          </Link>
          <p className="text-md font-medium text-(--text-muted) leading-relaxed">
            Book hotels easily with comfort, safety, and best prices guaranteed.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold font-Oswal mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-(--text-muted)">
            <Link to={"/"} className="hover:text-(--text-main) cursor-pointer">
              Home
            </Link>
            <Link
              to={"/hotels"}
              className="hover:text-(--text-main) cursor-pointer"
            >
              Hotels
            </Link>
            <Link
              to={"/services"}
              className="hover:text-(--text-main) cursor-pointer"
            >
              Services
            </Link>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold font-Oswal mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-(--text-muted)">
            <Link to={"#"} className="hover:text-(--text-main) cursor-pointer">
              Help Center
            </Link>
            <Link to={"#"} className="hover:text-(--text-main) cursor-pointer">
              Terms & Conditions
            </Link>
            <Link to={"#"} className="hover:text-(--text-main) cursor-pointer">
              Privacy Policy
            </Link>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 font-Oswal">Contact</h3>
          <ul className="space-y-2 text-sm text-(--text-main)">
            <Link>Email: support@starx.com</Link>
            <Link>Phone: +91 9625945591</Link>
            <Link>India</Link>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600">
        <div className="w-[95%] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-md font-medium text-(--text-main)">
          <p>© {new Date().getFullYear()} StarX Hotels. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ for travelers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
