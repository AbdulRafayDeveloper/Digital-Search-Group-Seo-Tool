/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Button = ({ name, onClick }) => {
  return (
    <button
      className="text-white justify-end flex bg-gradient-to-r from-[#8253ff] to-[#6a98ff] hover:bg-gradient-to-br hover:from-[#6d4bd6] hover:to-[#6d4bd6] focus:ring-4 focus:ring-opacity-0 focus:outline-none outline-none border-none shadow-lg hover:shadow-purple-300/40 dark:shadow-lg font-medium  rounded-bl-xl rounded-tr-xl text-lg px-5 py-3 text-center items-center my-3"
      onClick={onClick} // Attach onClick event handler
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired, // Define PropTypes for 'name' prop
  onClick: PropTypes.func.isRequired, // Define PropTypes for 'onClick' prop
};

export default Button;
