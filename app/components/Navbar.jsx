import Link from "next/link";
import { links } from "../context/links";
import SearchBar from "./navbar/SearchBar";
import LoginBtn from "./navbar/LoginBtn";
import CartBtn from "./navbar/CartBtn";
import CurrencySelector from "./navbar/CurrencySelector";

export default function Navbar() {
  const nav_links = links.filter(
    (link) =>
      link.route != "/home" && link.route != "/cart" && link.route != "/login"
  );

  return (
    <nav className="navbar navbar-expand-lg bg-primary" id="navbar">
      <div className="container-fluid align-items-center">
        <a
          className="navbar-brand text-alter1 fs-3 fw-bold fst-italic"
          id="branding"
          href="/main"
        >
          <img
            src="/png/isotipo250.png"
            alt="Logo Inversiones Tralodi"
            id="logo"
          />
          TRALODI
        </a>
        <button
          className="navbar-toggler my-4 border-0 position-absolute end-0 top-0"
          id="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="text-secondary">
          <i id="menu-icon" className="bi bi-list"></i>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav" id="navbar-nav">
            {nav_links.map(({ label, route }) => (
              <li
                key={route}
                className="nav-item fs-5"
                id="nav-item"
              >
                <Link
                  href={route}
                  id="nav-link"
                  className={
                    label == "Ofertas"
                      ? "nav-link d-flex align-items-center text-secondary"
                      : "nav-link text-secondary"
                  }
                >
                  {label == "Ofertas" && <i id="tags-icon" className="bi bi-tags-fill"></i>}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <SearchBar style="d-none d-lg-flex align-items-center justify-content-end text-alter1 my-md-3 mx-auto" />
          <div
            className="d-flex flex-column flex-lg-row gap-3"
            id="btn-group"
          >
            <CurrencySelector />
            <LoginBtn />
            <CartBtn />
            <SearchBar style="d-flex d-lg-none align-items-center text-alter1 ms-auto" />
          </div>
        </div>
      </div>
    </nav>
  );
}
