import './Generator.scss';
import { useState, useRef } from 'react';
import ConditionButton from '../ConditionButton/ConditionButton';

// images
import copyImg from '../../assets/copy.svg';

// type
type buttonType = 'uppercase' | 'lowercase' | 'special' | 'numbers';

function Generator() {
    const [length, setLength] = useState<number>();
    const [password, setPassword] = useState<string>('');
    const [copyMessage, setCopyMessage] = useState<string>('Copied');
    const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);

    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeSpecial, setIncludeSpecial] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);

    const isCopying = useRef(false);

    async function generatePassword(e : React.FormEvent) {
        e.preventDefault();

        const url : string = `https://api.genratr.com/?length=${length}${includeUppercase ? '&uppercase' : ''}${includeLowercase ? '&lowercase' : ''}${includeSpecial ? '&special' : ''}${includeNumbers ? '&numbers' : ''}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to generate password');
            }

            const data = await response.json();
            setPassword(data.password);
            setLength(12);
        } catch(error) {
            console.error('Error generating password:', error);
        }
    }

    function handleConditionButtonClick(type : buttonType) {
        // if only one condition is active, don't allow to deactivate it
        const states = {
            lowercase: includeLowercase,
            uppercase: includeUppercase,
            numbers: includeNumbers,
            special: includeSpecial,
        };

        const activeCount = Object.values(states).filter(state => state).length;

        if(activeCount === 1 && states[type]) return;

        // toggle the condition

        switch(type) {
            case 'lowercase':
                setIncludeLowercase(prev => !prev);
                break;
            case 'uppercase':
                setIncludeUppercase(prev => !prev);
                break;
            case 'numbers':
                setIncludeNumbers(prev => !prev);
                break;
            case 'special':
                setIncludeSpecial(prev => !prev);
                break;
        }
    }

    function handleCopyButtonClick(e : React.FormEvent) {
        e.preventDefault();

        if (isCopying.current) {
            return; // if true - return
        }

        isCopying.current = true;

        // copy the password to the clipboard if password is true
        if(password) {
            navigator.clipboard.writeText(password);
            setCopyMessage('Copied')
        } else {
            setCopyMessage('Nothing to copy')
        }
       
        // show the message
        setShowCopyMessage(prev => !prev);
        setTimeout(() => {
            setShowCopyMessage(prev => !prev) // hide message after 2 seconds
            isCopying.current = false;
        }, 2000);
    }

    function handleLengthChange({ target } : React.ChangeEvent<HTMLInputElement>) {
        setLength(Number(target.value));
    }

    return (
        <div className="generator">
            <div className="output">
                <h2 className="output-title">Generate</h2>
                
                <form>
                    <input readOnly value={password} placeholder='Generate the password...' type="text" />
                    <div className="copy-container">
                        <button onClick={handleCopyButtonClick} className="copy-btn btn"><img src={copyImg} alt="copyImg" /></button>
                        {showCopyMessage && <div className='copy-message'>{copyMessage}</div>}
                    </div>
                    <button onClick={generatePassword} className="generate-btn">Generate</button>
                </form>
            </div>

            <div className="conditions">
                <h2 className="conditions-title">Conditions</h2>

                <div className="password-conditions">
                    <input value={length} onChange={handleLengthChange} placeholder='Enter the length...' />

                    <div className="condition-buttons">
                        <ConditionButton active={includeUppercase} onClick={() => handleConditionButtonClick('uppercase')}>ABC</ConditionButton>
                        <ConditionButton active={includeLowercase} onClick={() => handleConditionButtonClick('lowercase')}>abc</ConditionButton>
                        <ConditionButton active={includeNumbers} onClick={() => handleConditionButtonClick('numbers')}>123</ConditionButton>
                        <ConditionButton active={includeSpecial} onClick={() => handleConditionButtonClick('special')}>!#@</ConditionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generator;