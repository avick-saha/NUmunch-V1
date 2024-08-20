// import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import axios from 'axios';

// const EmailConfirmation = () => {
//   const [message, setMessage] = useState('');
//   const { token } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     const confirmEmail = async () => {
//       try {
//         const { data } = await axios.get(`/api/v1/confirm/${token}`);
//         setMessage(data.message);
//         setTimeout(() => history.push('/login'), 3000); // Redirect to login page after 3 seconds
//       } catch (error) {
//         setMessage(error.response.data.message);
//       }
//     };

//     confirmEmail();
//   }, [token, history]);

//   return (
//     <div>
//       <h2>Email Confirmation</h2>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default EmailConfirmation;


import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./EmailConfirmation.css";

const EmailConfirmation = () => {
  const [message, setMessage] = useState('Confirming your email...');
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const { data } = await axios.get(`/api/v1/confirm/${token}`);
        setMessage(data.message);
        setTimeout(() => history.push('/login'), 3000); // Redirect to login page after 3 seconds
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };

    confirmEmail();
  }, [token, history]);

  return (
    <div className="emailConfirmationContainer">
      <h2>Email Confirmation</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmailConfirmation;