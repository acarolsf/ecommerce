import React from  'react';
import Footer from '../components/footer';
import Header from './../components/header';

const HomePageLayout = props => {

    return (
        <div className="fullHeight">
            <Header {...props} />
            {props.children}
            <Footer />
        </div>
    );
};

export default HomePageLayout;