import Link from 'next/link';



const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="logo-holder">Logo</div>
      <div className="navbar-right">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        {isLoggedIn && <Link href="/logout">Logout</Link>}
      </div>
    </nav>
  );
};

export default Navbar;