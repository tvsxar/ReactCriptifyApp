// styles
import './Generator.scss';
import '../../theme.scss';

// hooks
import { useState, useRef } from 'react';

// components
import ConditionButton from '../ConditionButton/ConditionButton';

// images
import copyImg from '../../assets/copy.svg';
import refreshImg from '../../assets/refresh.svg';

// type
type buttonType = 'uppercase' | 'lowercase' | 'special' | 'numbers';
interface GeneratorProps {
    isLight: boolean
}

function Generator({isLight} : GeneratorProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [length, setLength] = useState<string>('');
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
        if(isCopying.current) return;

        isCopying.current = true;
        setIsLoading(true);
        const url : string = `https://api.genratr.com/?length=${Number(length)}${includeUppercase ? '&uppercase' : ''}${includeLowercase ? '&lowercase' : ''}${includeSpecial ? '&special' : ''}${includeNumbers ? '&numbers' : ''}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to generate password');

            const data = await response.json();
            setPassword(data.password);
        } catch(error) {
            console.error('Error generating password:', error);
        }

        setIsLoading(false);
        isCopying.current = false;
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
        if (isCopying.current) return;

        isCopying.current = true;
        navigator.clipboard.writeText(password);
        setCopyMessage(password ? 'Copied' : 'Nothing to copy');
        setShowCopyMessage(true);

        setTimeout(() => {
            setShowCopyMessage(false);
            isCopying.current = false;
        }, 2000);
    }

    function handleLengthChange({ target } : React.ChangeEvent<HTMLInputElement>) {
        if(Number(target.value.length) < 4 && Number(target.value.length) > 32) setLength('12');;
        setLength(target.value);
    }

    return (
        <div className={`generator ${isLight ? 'light' : ''}`}>
            <div className="output">
                <h2 className="output-title">Generate</h2>
                
                <form>
                    <input className={`${isLight ? 'light' : ''}`} readOnly value={password} placeholder='Generate the password' type="text" />
                    <div className="copy-container">
                        <button onClick={handleCopyButtonClick} className={`copy-btn btn ${isLight ? 'light' : ''}`}><img src={copyImg} alt="copyImg" /></button>
                        {showCopyMessage && <div className={`copy-message ${isLight ? 'light' : ''}`}>{copyMessage}</div>}
                    </div>
                    <button onClick={generatePassword} className="generate-btn">{
                    isLoading ? (
                        <div className="refresh"><img src={refreshImg} className='refresh-icon' /></div>
                    ) : (
                        <span>Generate</span>
                    )}</button>
                </form>
            </div>

            <div className="conditions">
                <h2 className="conditions-title">Conditions</h2>

                <div className="password-conditions">
                    <input className={`${isLight ? 'light' : ''}`} value={length} onChange={handleLengthChange} placeholder='Enter the length' />

                    <div className="condition-buttons">
                        <ConditionButton active={includeUppercase} isLight={isLight}
                        onClick={() => handleConditionButtonClick('uppercase')}>ABC</ConditionButton>
                        <ConditionButton active={includeLowercase} isLight={isLight}
                        onClick={() => handleConditionButtonClick('lowercase')}>abc</ConditionButton>
                        <ConditionButton active={includeNumbers} isLight={isLight}
                        onClick={() => handleConditionButtonClick('numbers')}>123</ConditionButton>
                        <ConditionButton active={includeSpecial} isLight={isLight}
                        onClick={() => handleConditionButtonClick('special')}>!#@</ConditionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generator;