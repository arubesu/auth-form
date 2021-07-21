import styles from '../styles/Home.module.css';
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} >
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});