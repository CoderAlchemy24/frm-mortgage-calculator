
import '../styles/ResultPage.css';

export default function ResultPage({calculated1, calculated2}) {



  return (

    ( calculated1 && calculated2 ) ? (
    <div className="results-container">
      <h2>Your Results</h2>  
      <p>Your results are shown below based on the information you provided. 
         To adjust the results, edit the form and click “calculate repayments” again.</p>
      <div className='result-boxes'>
         <div className="result-box-1">
           <h3>Your monthly repayments</h3>
           <p className='num1'>£{calculated1}</p>
         </div>
      
         <div className="result-box-2">
           <h3>Total you'll repay over the term</h3>
           <p className='num2'>£{calculated2}</p>
         </div>
     </div>
    </div>
    ) : (


    <div className="results-container-empty">
      <img src="./assets/images/illustration-empty.svg" alt="illustration" className="illustration"/>
      <h2 className="result-h2">Results shown here</h2>
      <p className="result-p">Complete the form and click “calculate repayments” to see what 
          your monthly repayments would be.</p>
    </div>
    )
  )
}