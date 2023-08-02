import Link from "next/link";

const Menu = () => {
  return (
    <div>
      <div>
        <nav>
          <ul>
            <Link href="/">HomeChefRecipes</Link>
            <Link href="/Home">Home</Link>
            <Link href="/Button">Login</Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
