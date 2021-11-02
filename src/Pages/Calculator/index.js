import React, { useEffect, useState, useRef } from 'react';
import './Calculator.css'


export const Calculator = () => {
    const [bill, setBill] = useState(0)
    const [tipPercent, setTipPercent] = useState(0)
    const [persons, setPersons] = useState(1)
    const [tip, setTip] = useState(0)
    const [total, setTotal] = useState(0)
    const [buttonActive, setButtonActive] = useState('')
    const [inputActive, setInputActive] = useState('') 
    const [reset, setReset] = useState(false) 
    const [error, setError] = useState(false)


    const billInput = useRef(null)
    const percentInput = useRef(null)
    const personInput = useRef(null)


    useEffect(() => {
        personsError()
        if(reset) {
            console.log('res')
            return null
        } else {
            console.log('cal')
            totalForPerson()

        }
    },[bill, tipPercent, persons])

    const personsError = () => {
        if(persons == 0) {
            setError(true)
        } else {
            setError(false)
        }
    }

    const totalForPerson = (clean) => {
        if (clean) {
            clear()
            setReset(false)
        } else {
            if(persons == 0 || '') {
                return
            }
            const tipPercentResult = (bill * tipPercent) / 100
            const total = (parseFloat(bill) + tipPercentResult) / persons
            const tip = tipPercentResult / persons
            setTotal(total.toFixed(2))
            setTip(tip.toFixed(2))
        }
    }

    const buttonSelectTip = (tip, buttonName) => {
        setTipPercent(tip)
        setButtonActive(buttonName)
        setInputActive('')
    }

    const customSelectTip = (tip, buttonName) => {
        setTipPercent(tip)
        setButtonActive(buttonName)
    }

    const clear = () => {
        setReset(true)
        setBill(0)
        setTipPercent(0)
        setPersons(1)
        setTip(0)
        setTotal(0)
        setButtonActive('')
        billInput.current.value = ''
        percentInput.current.value = ''
        personInput.current.value = 1
        setError(false)
        
    }

    function onMouseUp(e) {
        const activeTextarea = document.activeElement;
        setInputActive(activeTextarea.id)
    }


  return (
    <div className="container">
        <div className="splitter-title">
            Spli<p>tter</p>
        </div>
        <div className="cards-container">
            <div className="card-calulate">
                <div>
                    <p className="title">Bill</p>
                    <div onMouseUp={onMouseUp} className={inputActive == 'bill-input' ? "input-div-active" : "input-div"}>
                        <i className="fa fa-usd icon" />
                        <input id="bill-input" ref={billInput} className="default-input" type="number" onChange={(ev) => setBill(ev?.target.value)} placeholder='0' /> 
                    </div>
                </div>
                <div className="section">
                    <p className="title">Select Tip %</p>
                    <div className="buttons-container">
                        <button className={buttonActive === '5%' ? 'percent-button-select' :'percent-button'} onClick={() => buttonSelectTip(5, '5%')}>5%</button>
                        <button className={buttonActive === '10%' ? 'percent-button-select' :'percent-button'} onClick={() => buttonSelectTip(10, '10%')}>10%</button>
                        <button className={buttonActive === '15%' ? 'percent-button-select' :'percent-button'} onClick={() => buttonSelectTip(15, '15%')}>15%</button>
                        <button className={buttonActive === '25%' ? 'percent-button-select' :'percent-button'} onClick={() => buttonSelectTip(25, '25%')}>25%</button>
                        <button className={buttonActive === '50%' ? 'percent-button-select' :'percent-button'} onClick={() => buttonSelectTip(50, '50%')}>50%</button>
                        <input onClick={() => setInputActive('')} ref={percentInput} className="custom-input" type="number" onChange={(ev) => customSelectTip(ev?.target.value, '')} placeholder="Custom" />
                    </div>
                </div>
                <div className="section">
                    <p className="title">Number of People {error && <span style={{color:'#ff6868'}}>Can't be zero</span>}</p>
                    <div onMouseUp={onMouseUp} className={error ? "input-div-error" : inputActive == 'persons-input' ? "input-div-active" : "input-div"} >
                        <i className="fa fa-user icon" />
                        <input id="persons-input" ref={personInput} className="default-input" type="numer" defaultValue={persons} onChange={(ev) => setPersons(ev?.target.value)} />
                    </div>
                </div>
            </div>
            <div className="card-result">
                <div className="tip-amount">
                    <div><p className="primary-text">Tip Amount</p><p className="secundary-text">/ person</p></div> <p className="tip-amount-total" ><span className="dolar">$</span>{tip}</p>
                </div>
                <div className="total-amount">
                    <div><p className="primary-text">Total</p><p className="secundary-text">/ person</p></div> <p className="tip-amount-total" ><span className="dolar">$</span>{total}</p>
                </div>
                <div className="reset-container">
                    <button disabled={total == 0} className="reset-button" onClick={() => totalForPerson(true)}>Reset</button>
                </div>
            </div>
            <div class="attribution-mobile">
                Challenge by&nbsp; <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
                Coded by&nbsp; <a href="https://www.linkedin.com/in/isabel-rodrigues-92b587155/"> Isabel Rodrigues</a>.
            </div>
        </div>
        <div class="attribution">
            Challenge by&nbsp; <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by&nbsp; <a href="https://www.linkedin.com/in/isabel-rodrigues-92b587155/"> Isabel Rodrigues</a>.
        </div>
    </div>
  );
}

