import React from 'react';
import Banner from './Banner/Banner';
import AwesomeServices from '../AwesomeServices/AwesomeServices';
import Banner2 from '../Banner2/Banner2';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AwesomeServices></AwesomeServices>
            <Banner2></Banner2>
           
        </div>
    );
};

export default Home;