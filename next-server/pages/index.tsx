import type { NextPage } from 'next'
import styles from "../styles/Home.module.css"
import Form from "../components/form/Form";

const Home: NextPage = () => (
    <main className={styles.main}>
        <Form/>
    </main>
)


export default Home
