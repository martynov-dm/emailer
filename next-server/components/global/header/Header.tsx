import Heading from "../../common/Heading";
import styles from "./Header.module.css"
import NextLink from "next/link"
import {Button, Link} from "@chakra-ui/react";

const Header: React.FC = () => {
    return (
        <nav className={styles.header} >
            <NextLink href='/' passHref>
                <Link>Email sender</Link>
            </NextLink>
            <NextLink href='/jobs' passHref>
                <Button variant='outline'>
                    Jobs
                </Button>
            </NextLink>
        </nav>)
}


export default Header

