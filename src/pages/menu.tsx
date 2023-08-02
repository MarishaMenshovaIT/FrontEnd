import Link from "next/link";

const Menu = () => {
  return (
    <>
      <nav>
        <div className="menu-bar">
          <div className="logo">
            <Link href="/">🥘 HomeChefRecipes</Link>
          </div>
          <div className="menu">
            <Link href="/">Home</Link>
          </div>
          <div className="menu">
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
