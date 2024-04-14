/* eslint-disable jsx-a11y/anchor-is-valid */
import "./style.css";

function Header() {
  return (
    <header>
      <div className="header-logo">
        <img src="Logo Mark.svg" alt="logo" />
        <h4 className="header-logo-title">PROFI KIT</h4>
      </div>
      <div className="header-nav">
        <button>
          <a href="#">KIT CRM</a>
        </button>
        <button>
          <a href="#">KIT Master</a>
        </button>
        <button>
          <a href="#">KIT Tracker</a>
        </button>
        <button>
          <a href="#">KIT Warehouse</a>
        </button>
        <button>
          <a href="#">KIT ARM</a>
        </button>
        <button>
          <a href="#">KIT Dashboard</a>
        </button>
        <button>
          <a href="#">KIT Admin</a>
        </button>
      </div>
    </header>
  );
}

export default Header;
