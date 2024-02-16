import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Buttons.css'; // This imports the CSS styles


const solution = {
  1: 'P', 2: 'I', 3: 'P', 4: 'A', 5: 'R', 6: 'K', 7: 'A', 8: 'K', 9: 'U', 10: 'T',
  11: 'A', 12: 'S', 13: 'U', 14: 'T', 16: 'U', 17: 'L', 18: 'O', 19: 'K', 20: 'E',
  21: 'P', 22: 'O', 23: 'R', 24: 'O', 26: 'H', 27: 'A', 28: 'N', 29: 'K', 30: 'S',
  31: 'E', 32: 'T', 33: 'U', 34: 'M', 35: 'A', 36: 'A', 37: 'S', 38: 'T', 39: 'O', 40: 'T',
  41: 'R', 42: 'A', 43: 'T', 44: 'I', 47: 'A', 48: 'I', 49: 'N', 50: 'A',
  51: 'I', 56: 'E', 57: 'L', 58: 'K', 59: 'E', 60: 'T', 61: 'P', 62: 'E', 63: 'T', 64: 'O', 66: 'L',
  67: 'I', 68: 'I', 69: 'N', 70: 'A', 71: 'U', 72: 'T', 73: 'A', 74: 'H', 76: 'O',
  81: 'S', 82: 'U', 83: 'P', 84: 'E', 85: 'R', 86: 'V', 87: 'A', 88: 'L', 89: 'T', 90: 'A',
  91: 'S', 92: 'I', 93: 'I', 94: 'S', 96: 'E', 97: 'T', 98: 'U', 99: 'U', 100: 'S',
  101: 'I', 102: 'L', 103: 'O', 104: 'S', 105: 'A', 106: 'N', 107: 'O', 108: 'M', 109: 'A', 110: 'T',
  111: 'T', 112: 'U', 113: 'T', 114: 'A', 116: 'A', 117: 'N', 118: 'I', 119: 'T',120: 'A'
  // Add all other cell IDs and their correct letters
};

const ButtonContainer = ({ onEraseClick, gridContentRef, selectedItemId, showButtonPanel, toggleButtonPanel}) => {

    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

    const handleHelpClick = () => {
      setIsHelpModalVisible(true); // Show the help modal
    };
  
    const handleCloseHelpModal = () => {
      setIsHelpModalVisible(false); // Hide the help modal
    };

    const handleCheckClick = () => {
      // Assuming staticNumberMapping's order corresponds to the word "MITTAUS"
      // and that gridContentRef.current holds the current letters keyed by itemId
      const correctWord = "PUUROPATA";
      const letterPositions = [1, 16, 33, 41, 64, 83,109,111,116]; // Ids for "correctword"
      let formedWord = '';

      for (let pos of letterPositions) {
          formedWord += (gridContentRef.current[pos] || '');
      }

      if (formedWord.toUpperCase() === correctWord) {
          alert("Hienoa, vastaus on oikein"); // Using alert for simplicity
      } else {
          alert("Väärin, yritä uudestaan");
      }
  };

  const handleEraseClick = () => {
    if (onEraseClick) {
        onEraseClick(); // Call the function passed down from the parent component
    }
};

const handleSendClick = () => {
  // Replace 'https://www.companywebsite.com/form' with the actual URL you want users to go to
  // window.location.href = 'https://www.companywebsite.com/form';
};

  const handleKirjainClick = () => {
    if (!selectedItemId) {
      alert('Et ole valinnut ruutua.');
      return;
    }
  
    // Directly fetch the correct letter from the solution object
    const correctLetter = solution[selectedItemId];
  
    // Check if the solution has an entry for the selectedItemId
    if (correctLetter) {
      alert(`Tämän kohdan kirjain on ${correctLetter}`);
    } else {
      // This message can be shown if the selected grid item does not have a corresponding letter in the solution,
      // which could be the case for empty spaces or non-letter cells in the crossword.
      alert('This cell does not contain a letter in the solution.');
    }
  };

  const tarkistaRistikkoClick = () => {
    let correctCount = 0;
    let totalCount = Object.keys(solution).length;
  
    for (let itemId in solution) {
      if (solution[itemId] === (gridContentRef.current[itemId] || '').toUpperCase()) {
        correctCount++;
      }
    }
  
    let correctnessPercentage = Math.round((correctCount / totalCount) * 100);
alert(`Olet ratkaissut ristikosta ${correctnessPercentage} prosenttia.`);

  };


  const handleDownloadClick = () => {
    // Optionally lock the body width to prevent layout shifts
    const bodyWidth = document.body.offsetWidth;
    document.body.style.width = `${bodyWidth}px`;
  
    // Temporarily adjust styles for capture
    const originalStyles = {
      overflow: document.querySelector('.canvas').style.overflow,
      position: document.querySelector('.background').style.position,
      transform: document.querySelector('.background').style.transform
    };
    const buttonContainer = document.querySelector('.button-container');
    const originalVisibility = buttonContainer.style.visibility;
    buttonContainer.style.visibility = 'hidden'; // Hide buttons using visibility
  
    // Adjust styles for capture
    document.querySelector('.canvas').style.overflow = 'visible';
    document.querySelector('.background').style.position = 'static';
    document.querySelector('.background').style.transform = 'none';
  
    const crosswordContainerElement = document.querySelector('.canvas');
  
    // Use html2canvas to capture the crossword container
    html2canvas(crosswordContainerElement, {
      scale: 1,
    logging: true,
    onclone: (clonedDocument) => {
      const clonedGridContainer = clonedDocument.querySelector('.grid-container');
      // Apply a negative margin to the left or adjust the left property
      // This example assumes that the grid-container has a left CSS property set.
      // You need to adjust the '3.32vw' value to find the correct amount of shift needed.
      clonedGridContainer.style.left = `calc(53% - 0.2vw)`; // Adjust this value accordingly
    }
  }).then(capturedCanvas => {
      // Restore original styles after capture
      document.querySelector('.canvas').style.overflow = originalStyles.overflow;
      document.querySelector('.background').style.position = originalStyles.position;
      document.querySelector('.background').style.transform = originalStyles.transform;
      buttonContainer.style.visibility = originalVisibility; // Restore original visibility
      document.body.style.width = ''; // Unlock the body width
  
      const imgData = capturedCanvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
  
      // Add the captured canvas to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('download.pdf');
    }).catch(error => {
      console.error('Error generating PDF: ', error);
    });
  };
  
  const [isVisible, setIsVisible] = useState(false);
  return (
    
    <div className={`button-container ${showButtonPanel ? 'visible' : ''}`}>
    <div className="button-container">
      <button id="helpButton" className="help-button non-printable" onClick={handleHelpClick}>Ohjeet</button>
      <button className='check-word-button' onClick={handleCheckClick}>Tarkista ratkaisusana</button>
      <button className='check-crossword-button' onClick={tarkistaRistikkoClick}>Tarkista ristikko</button>
      {/* Add the download button */}
      <button className='give-letter-button' onClick={handleKirjainClick}>Anna Kirjain</button>
      <button id="eraseButton" className="erase-button non-printable" onClick={handleEraseClick}>Tyhjennä Ristikko</button>
      <button id="downloadButton" className="download-button non-printable" onClick={handleDownloadClick}>Lataa sivu</button>
      <button onClick={handleSendClick} className="send-info-button">Lähetä tiedot</button>
      {/* ... other buttons */}
      {/* Help Modal */}
      {isHelpModalVisible && (
        <div className="modal" onClick={handleCloseHelpModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseHelpModal}>&times;</span>
            <h2>Kirjoittaminen</h2>
    <p>Valitse ruutu ja kirjoitussuunta ja voit aloittaa kirjoittamisen. Kirjoitussuuntaa voit vaihtaa painamalla valittua ruutua. Kirjaimia voi poistaa peruutus(backspace) näppäimellä.</p>
    <h2>Ristikon tallennus</h2>
    <p>Ristikko tallentuu automaattisesti selaimen muistiin jokaisen muutoksen jälkeen. Kun ristikkoon palaa myöhemmin lataa se automaattisesti pelin siitä kohtaa johon se jäi. 
        Selaimen muistien tyhjennys voi hävittää kirjaimet ristikosta.
    </p>
    <h2>Ristikon ratkaisu</h2>
    <p>Kun olet täyttänyt ristikon voit tarkistaa "Tarkista ristikko" -napilla saitko ratkaistua ristikon oikein.
    </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ButtonContainer;