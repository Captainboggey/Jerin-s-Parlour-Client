import React from 'react';
import Banner from './Banner/Banner';
import AwesomeServices from '../AwesomeServices/AwesomeServices';
import Banner2 from '../Banner2/Banner2';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AwesomeServices></AwesomeServices>
            <Banner2></Banner2>
            <Testimonials></Testimonials>
           
        </div>
    );
};

export default Home;