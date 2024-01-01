import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"

const ConfettiComponent = () => {
  //   useEffect(() => {
  //     if (active) {
  //       setShouldShowConfetti(true);

  //       // Reset the confetti state after a certain duration
  //       const timeout = setTimeout(() => {
  //         setShouldShowConfetti(false);
  //       }, 5000); // Change the duration as needed

  //       return () => clearTimeout(timeout);
  //     }
  //   }, [active]);

  return <Confetti />
}

export default ConfettiComponent
