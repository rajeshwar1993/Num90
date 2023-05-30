import {
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  unlink
} from 'firebase/auth';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, TextInput } from '../../../components';
import { auth } from '../../../firebase';

interface Props {}

let recaptchaVerifier: any = null;
let cr: any = null;
let timer: any = null;
let credential: any = null;

const PhoneVerificationForm: React.FC<Props> = ({}) => {
  const [smsButtonDisabled, toggleSmsButtonDisabled] = useState(true);
  const [showCodediv, toggleShowCodediv] = useState(false);
  const [timerVal, updateTimerVal] = useState(0);
  const [isLoading, toggleIsLoading] = useState(false);

  const currentUser = auth.currentUser;
  let hasPhoneAlready = false;

  currentUser?.providerData.forEach((pd: any) => {
    if (pd.providerId === 'phone') {
      hasPhoneAlready = true;
    }
  });

  const timerValRef: any = useRef(null);

  useEffect(() => {
    recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: function () {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          toggleSmsButtonDisabled(false);
        },
        'expired-callback': function () {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      },
      auth
    );
    recaptchaVerifier.render().then(function () {
      // recaptchaWidgetId = widgetId;
    });
  }, []);

  const handleSendOTP = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      phoneNumber: { value: string };
    };

    const phoneNumber = target.phoneNumber.value;
    sendVerificationCode(phoneNumber);
  };

  const handleOTPVerify = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      otp: { value: string };
    };

    const otp = target.otp.value;
    verifyPhone(otp);
  };

  const sendVerificationCode = (phoneNumber: string) => {
    toggleIsLoading(true);
    toggleSmsButtonDisabled(true);
    if (phoneNumber) {
      let appVerifier = recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).

          toggleShowCodediv(true);
          startResendTimer();
          toggleIsLoading(false);
          cr = confirmationResult;
          recaptchaVerifier.clear();
        })
        .catch(function (error) {
          // Error; SMS not sent
          // ...

          toggleIsLoading(false);
        });
    }
  };

  const startResendTimer = () => {
    timerValRef.current = 90;
    timer = setInterval(() => {
      let v = timerValRef.current - 1;
      if (v === 0) {
        clearInterval(timer);
        toggleSmsButtonDisabled(false);
      }
      updateTimerVal(v);
      timerValRef.current = v;
    }, 1000);
  };

  const unlinkPreviousPhoneAuth = (code: string) => {
    if (currentUser === null) {
      return;
    }

    toggleIsLoading(true);

    unlink(currentUser, 'phone')
      .then(function () {
        // Auth provider unlinked from account
        // ...
        verifyCodeAndLinkAccounts(code);
        // dispatch(show_message("success", "Unlinked!"));
      })
      .catch(function (e: any) {
        // An error happened
        // ...
      });
  };

  const verifyCodeAndLinkAccounts = (code: string) => {
    if (currentUser === null) {
      return;
    }

    toggleIsLoading(true);

    credential = PhoneAuthProvider.credential(cr.verificationId, code);

    linkWithCredential(currentUser, credential)
      .then(function () {
        toggleIsLoading(false);
      })
      .catch(function (e: any) {
        toggleIsLoading(false);
        toggleShowCodediv(false);
      });
  };

  const createAccountWithPhoneNumber = (code: string) => {
    cr.confirm(code).then(result => {
      console.log(result.user);
    });
  };

  const verifyPhone = (code: string) => {
    if (code) {
      if (hasPhoneAlready) {
        unlinkPreviousPhoneAuth(code);
      } else if (currentUser) {
        verifyCodeAndLinkAccounts(code);
      } else {
        createAccountWithPhoneNumber(code);
      }
    }
  };

  return (
    <div>
      <Form submitHandlerFunc={handleSendOTP}>
        <TextInput
          id='phoneNumber'
          name='phoneNumber'
          required
          label='Phone Number'
          defaultValue={currentUser?.phoneNumber ?? ''}
          placeholder='eg +91999999999'
          description={'Enter phone number prefixed by your country code.'}
        />
        <div id='recaptcha-container' className='p-5'></div>
        {timerVal !== 0 && (
          <div>
            <span>{`Resend SMS in: ${timerVal} seconds`} </span>
          </div>
        )}
        <Button
          type='submit'
          color='accent'
          solid={true}
          styleClasses='w-full'
          size='lg'
          loading={isLoading}
        >
          Send OTP
        </Button>
      </Form>
      {showCodediv && (
        <div className='mt-4'>
          <Form submitHandlerFunc={handleOTPVerify}>
            <TextInput
              id='otp'
              placeholder='OTP'
              name='otp'
              required
              label='Enter OTP'
            />
            <Button
              type='submit'
              color='accent'
              size='lg'
              solid={true}
              styleClasses='w-full mt-2'
              loading={isLoading}
            >
              Verify
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PhoneVerificationForm;
