import React from 'react';
import { Link} from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <Link to='user'> UserTab</Link> <br />
            <Link to='employee'> EmployeeTab</Link>
        </div>
    );
};

export default Home;