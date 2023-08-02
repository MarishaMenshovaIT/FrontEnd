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
            <Link href="/">Home</Link>
            <button>
              <Link href="/Button">Login</Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
