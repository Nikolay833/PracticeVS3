import { Link } from 'react-router-dom';
import { PageHeader } from '../components/Cards.jsx';

export default function NotFound() {
  return (
    <PageHeader eyebrow="Red flag" title="Page not found">
      <p>That page has retired from the race.</p>
      <p><Link to="/" className="btn btn-primary">Back to the pits</Link></p>
    </PageHeader>
  );
}
