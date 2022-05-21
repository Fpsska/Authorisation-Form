import React from 'react';
import { useSelector } from 'react-redux';

import ButtonTemplate from '../Button/ButtonTemplate';

import logo from '../../assets/images/logo_icon.png';

import { RootState } from '../../app/store';

import Modal from '../Modal/Modal';

import './header.scss';

// /. imports 

const Header: React.FC = () => {

    const { isAuthorisationPage, isHomePage } = useSelector((state: RootState) => state.mainSlice);
    const { isUserAuthorise } = useSelector((state: RootState) => state.userSlice);
    // 
    return (
        <header className="header">
            <div className="header__wrapper">
                <img className="header__image" src={logo} alt="logo" />

                <div className="header__text">
                    <h1 className="header__title">
                        {isAuthorisationPage ? 'Log in to your Account' : isHomePage && isUserAuthorise ? 'Welcome to your profile page!' : 'Create an Account'}
                    </h1>
                    {isHomePage && isUserAuthorise
                        ? <></>
                        : <p className="header__subtitle">
                            {isAuthorisationPage ? 'Welcome back, please enter your details.' : 'Sign up now to get started with an account.'}
                        </p>
                    }
                </div>

                {isHomePage ? <></> : <ButtonTemplate />}

            </div>

            <Modal>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora repudiandae commodi saepe ipsam fuga possimus voluptas cumque velit nihil. Nisi architecto illo fugit assumenda consequatur sequi similique placeat illum provident?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora repudiandae commodi saepe ipsam fuga possimus voluptas cumque velit nihil. Nisi architecto illo fugit assumenda consequatur sequi similique placeat illum provident?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora repudiandae commodi saepe ipsam fuga possimus voluptas cumque velit nihil. Nisi architecto illo fugit assumenda consequatur sequi similique placeat illum provident?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora repudiandae commodi saepe ipsam fuga possimus voluptas cumque velit nihil. Nisi architecto illo fugit assumenda consequatur sequi similique placeat illum provident?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora repudiandae commodi saepe ipsam fuga possimus voluptas cumque velit nihil. Nisi architecto illo fugit assumenda consequatur sequi similique placeat illum provident?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora repudiandae commodi saepe ipsam fuga possimus voluptas cumque velit nihil. Nisi architecto illo fugit assumenda consequatur sequi similique placeat illum provident?
            </Modal>
        </header>
    );
};

export default Header;