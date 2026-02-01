export default function HomePage() {
  return (
    <main>
      <nav>
        <ul style={{
          background:'white',
          color:'black',
          listStyleType: 'none',
          display: 'flex',
          gap: '50px',
          padding: '10px',
          alignContent: 'center',
          justifyContent: 'right',
          paddingRight: '50px'
        }}>
          <li><a href="/about">About Us</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

      </nav>
    </main>
  );
}

