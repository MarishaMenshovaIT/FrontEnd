import Link from "next/link";

interface MenuProps {
  background?: boolean;
}

const Menu = (props: MenuProps) => {
  const { background } = props;

  return (
    <>
      <nav className={`${background ? "navigation-background" : ""}`}>
        <div className="menu-bar">
          <span className="logo">🥗 HomeChefRecipes</span>
          <div className="menu">
            <Link className={"link-style"} href="/">
              Home
            </Link>
            <button>
              <Link className={"link-style"} href="/login">
                Login
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
