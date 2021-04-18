import { Link } from 'react-router-dom';

export default function Home() {
  return <>
    Home
    <Link to="/auth">Auth page</Link>
  </>;
}
