import { useState, useEffect } from "react";

const useRecuperation = (url) => {

    const [quizData, setQuizData] = useState(null)// 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const aborteCont = new AbortController() // Stoper

        setTimeout(() => {
    
            fetch(url, { signal: aborteCont.signal })
                .then((response) => {
                    if (!response.ok) { 
                        throw Error('Désoler une erreur est survenu')
                    } 
                    return response.json();
                })
                .then((quizData) => {
                    setQuizData(quizData);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'Abort.Error') {
                        console.log('Fetch a été stope');
                    } else {
                        setError(err.message);
                        setIsLoading(false);
                    }
               })
        }, 2000)
        return () => aborteCont.abort(); 
    }, [url]) 

    return { quizData, isLoading, error}
}

export default useRecuperation;

