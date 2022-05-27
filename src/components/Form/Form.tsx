import React from 'react';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import { getRandomItgrNumber } from '../../helpers/getRandomNum';

import {
    switchUserRememberedStatus,
    switchTermsAcceptedStatus,
    switchAuthErrorStatus,
    switchPasswordVisibleStatuses
} from '../../app/slices/formSlice';

import {
    setNewModalPosition,
    switchModalVisibleStatus
} from '../../app/slices/modalSlice';

import Modal from '../Modal/Modal';

import './form.scss';

// /. imports

interface FormPropTypes {
    formActionHandler: (arg1: string, arg2: string) => void
}

interface useFormTypes {
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    termsCheckbox: string
}

// /. interfaces

const Form: React.FC<FormPropTypes> = (props) => {

    const { formActionHandler } = props;

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const { modalStatus } = useSelector((state: RootState) => state.modalSlice);
    const {
        isUserRemembered,
        isTermsAccepted,
        isAuthError,
        passwordStatuses
    } = useSelector((state: RootState) => state.formSlice);

    const dispatch = useDispatch();

    const inputRememberHandler = (): void => {
        dispatch(switchUserRememberedStatus(!isUserRemembered));
    };
    const inputTermsHandler = (): void => {
        dispatch(switchTermsAcceptedStatus(!isTermsAccepted));
    };

    const linkTermsHandler = (): void => {
        dispatch(switchModalVisibleStatus({ name: 'terms-modal', status: !modalStatus.isModalTermsVisible }));
        dispatch(setNewModalPosition(
            {
                name: 'terms-modal',
                coordinates: { top: getRandomItgrNumber(30, 10), left: getRandomItgrNumber(30, 10) }
            }
        ));
    };
    //
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
        watch
    } = useForm<useFormTypes>({
        mode: 'onChange'
    });

    const passwordValue = watch('password');

    const FormSubmitHandler = (userData: any): void => {
        formActionHandler(userData.email, userData.password);
        reset();
    };
    // 
    return (
        <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
            <div className="form__wrapper">
                {isAuthorisationPage
                    ?
                    <>
                        <label className="form__label" htmlFor="email">
                            Email Addres
                            <input
                                id="email"
                                type="text"
                                className="form__input form__input--email"
                                placeholder="johndoe@gmail.com"
                                {...register('email', {
                                    required: 'Field is required!',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Entered value does not match email format'
                                    }
                                })}
                            />
                            {errors.email
                                ? <span className="form__error">{errors.email.message}</span>
                                : isAuthError
                                    ? <span className="form__error">incorrect email or password</span> : <></>
                            }
                        </label>
                        <label className="form__label" htmlFor="password">
                            Password
                            <input
                                id="password"
                                type={passwordStatuses.isPasswordVisible ? 'text' : 'password'}
                                className="form__input form__input--password"
                                {...register('password', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 2,
                                        message: 'Minimum length is should be 2 symbols'
                                    }
                                })}
                            />
                            {
                                passwordStatuses.isPasswordVisible
                                    ?
                                    <BsEyeSlash
                                        className="form__icon-password"
                                        size={20} color="#000"
                                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                                            {
                                                name: 'password',
                                                status: false
                                            }
                                        ))}
                                    />
                                    :
                                    <BsEye
                                        className="form__icon-password"
                                        size={20} color="#000"
                                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                                            {
                                                name: 'password',
                                                status: true
                                            }
                                        ))}
                                    />
                            }
                            {errors.password
                                ? <span className="form__error">{errors.password.message}</span>
                                : isAuthError
                                    ? <span className="form__error">incorrect email or password</span> : <></>
                            }
                        </label>

                        <div className="form__terms">
                            <label className="form__label form__label--remember" htmlFor="remember" >
                                <input
                                    className="form__input form__input--checkbox"
                                    type="checkbox"
                                    id="remember"
                                    onClick={inputRememberHandler}
                                />
                                <span className="form__fake-checkbox"></span>
                                Remember me
                            </label>
                            <span className="form__restore">Forgot Password?</span>
                        </div>
                    </>
                    :
                    <>
                        <label className="form__label" htmlFor="fullName">
                            <span className="form__label-text">
                                FullName
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                className="form__input form__input--email"
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                {...register('fullName', {
                                    required: 'Field is required!',
                                    maxLength: {
                                        value: 10,
                                        message: 'Max length exceeded'
                                    }
                                })}
                            />
                            {errors.fullName && <span className="form__error">{errors.fullName.message}</span>}
                        </label>
                        <label className="form__label" htmlFor="email">
                            <span className="form__label-text">
                                Email Addres
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                id="email"
                                type="text"
                                className="form__input form__input--email"
                                placeholder="johndoe@gmail.com"
                                {...register('email', {
                                    required: 'Field is required!',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Entered value does not match email format'
                                    }
                                })}
                            />
                            {errors.email && <span className="form__error">{errors.email.message}</span>}
                        </label>
                        <label className="form__label" htmlFor="password">
                            <span className="form__label-text">
                                Password
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                id="password"
                                type={passwordStatuses.isPasswordVisible ? 'text' : 'password'}
                                className="form__input form__input--password"
                                {...register('password', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum length is should be 6 symbols'
                                    }
                                })}
                            />
                            {
                                passwordStatuses.isPasswordVisible
                                    ?
                                    <BsEyeSlash
                                        className="form__icon-password"
                                        size={20} color="#000"
                                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                                            {
                                                name: 'password',
                                                status: false
                                            }
                                        ))}
                                    />
                                    :
                                    <BsEye
                                        className="form__icon-password"
                                        size={20} color="#000"
                                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                                            {
                                                name: 'password',
                                                status: true
                                            }
                                        ))}
                                    />
                            }
                            {errors.password && <p className="form__error">{errors.password?.message}</p>}
                        </label>
                        <label className="form__label" htmlFor="confirm-password">
                            <span className="form__label-text">
                                Confirm Password
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                id="confirm-password"
                                type={passwordStatuses.isConfirmPasswordVisible ? 'text' : 'password'}
                                className="form__input form__input--password"
                                onPaste={(e) => {
                                    e.preventDefault();
                                    return false;
                                }}
                                {...register('confirmPassword', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum length is should be 6 symbols'
                                    },
                                    validate: (value) => value === passwordValue || 'The password do not match'
                                })}
                            />
                            {
                                passwordStatuses.isConfirmPasswordVisible
                                    ?
                                    <BsEyeSlash
                                        className="form__icon-password"
                                        size={20} color="#000"
                                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                                            {
                                                name: 'confirm-password',
                                                status: false
                                            }
                                        ))}
                                    />
                                    :
                                    <BsEye
                                        className="form__icon-password"
                                        size={20} color="#000"
                                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                                            {
                                                name: 'confirm-password',
                                                status: true
                                            }
                                        ))}
                                    />
                            }
                            {errors.confirmPassword && <p className="form__error">{errors.confirmPassword.message}</p>}
                        </label>

                        <label className="form__label form__label--terms" htmlFor="terms" >
                            <input
                                className="form__input form__input--checkbox"
                                type="checkbox"
                                id="terms"
                                onClick={inputTermsHandler}
                                {...register('termsCheckbox', {
                                    required: true
                                })}
                            />
                            <span className="form__fake-checkbox"></span>
                            <span className="form__terms-text"> I have read and agree to the{' '}
                                <a
                                    href="#"
                                    className="form__terms-link"
                                    onClick={linkTermsHandler}
                                >
                                    Terms of Service
                                </a>
                            </span>
                        </label>
                    </>
                }

                <button
                    className="form__button"
                    disabled={!isValid}
                >
                    {isAuthorisationPage ? 'Log in' : 'Get Started'}
                </button>

                <Modal
                    name={'terms-modal'}
                    title={'Terms modal!'}
                    status={modalStatus.isModalTermsVisible}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, laboriosam quod dolorem ab
                    quisquam ipsam aliquid tempora quia aliquam at consequatur saepe iusto perferendis magni inventore,
                    id, quam non fugit. Dsit amet consectetur adipisicing elit. Rerum, laboriosam quod dolorem ab
                    quisquam ipsam aliquid tempora quia aliquam at consequatur saepe iusto perferendis magni inventore,
                    id, quam non fugit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, laboriosam quod dolorem ab
                    quisquam ipsam aliquid tempora quia aliquam at consequatur saepe iusto perferendis magni inventore,
                    id, quam non fugit. Dsit amet consectetur adipisicing elit. Rerum, laboriosam quod dolorem ab
                    quisquam ipsam aliquid tempora quia aliquam at consequatur saepe iusto perferendis magni inventore,
                    id, quam non fugit.
                </Modal>
            </div>
        </form>
    );
};

export default Form;