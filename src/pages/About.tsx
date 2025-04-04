export function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h2>About Archivum</h2>
        <p>
          Welcome to Archivum. 
          This application is intended to help you keep track of the books that you own, or simply have read. 
          Your collection is maintained in an elegant and intuitive way.
        </p>
        <div className="features">
          <h3>Features</h3>
          <ul>
            <li>Add and manage your book collection</li>
            <li>Track reading progress</li>
            <li>Simple, responsive interface</li>
            <li>Persisting book data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}