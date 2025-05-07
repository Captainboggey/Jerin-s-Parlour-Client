import React from 'react';
import Banner from './Banner/Banner';
import AwesomeServices from '../AwesomeServices/AwesomeServices';
import Banner2 from '../Banner2/Banner2';
import Testimonials from '../Testimonials/Testimonials';
import HomeForm from '../HomeForm/HomeForm';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AwesomeServices></AwesomeServices>
            <Banner2></Banner2>
            <Testimonials></Testimonials>
            <HomeForm></HomeForm>
           
        </div>
    );
};

export default Home;