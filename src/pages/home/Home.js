import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Row, Col } from 'antd';

export default function Home() {
    console.log("I'm Home. In Profile.")
    const { authIsReady } = useAuthContext();
    return (
        <>
            {authIsReady && (
                <Row gutter={0} justify="center" align="middle" className={styles['div']}>
                    <Col span={24} xs={24} sm={24} md={24}>
                        <div>
                            Home
                        </div>
                    </Col>
                </Row>
            )}
        </>
    )
}