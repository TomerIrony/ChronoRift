const saveScoreToLocalStorage = (score: number) => {
  
    // Retrieve the existing score from local storage
    const existingScore = JSON.parse(localStorage.getItem('score') || 'null');
    
    // Check if the score doesn't exist or if the current score is higher
    if (existingScore === null || score > existingScore) {
      // Store the new score in local storage
      localStorage.setItem('score', score.toString());
    }
  };

  const getHighScoreFromLocalStorage = (): number => {
    // Retrieve the existing score from local storage
    const existingScore = JSON.parse(localStorage.getItem('score') || 'null');
  
    // Check if the score exists
    if (existingScore !== null) {
      return existingScore;
    }
  
    // Return 0 if the score doesn't exist
    return 0;
  };


export const localStorageService =  {
    saveScoreToLocalStorage,
    getHighScoreFromLocalStorage
}