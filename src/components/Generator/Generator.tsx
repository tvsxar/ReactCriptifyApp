import './Generator.scss';
import { useState } from 'react';
import ConditionButton from '../ConditionButton/ConditionButton';

// images
import copyImg from '../../assets/copy.svg';

// type
type buttonType = 'uppercase' | 'lowercase' | 'special' | 'numbers';

function Generator() {
    const [length, setLength] = useState<number>();
    const [password, setPassword] = useState<string>('');

    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeSpecial, setIncludeSpecial] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);

    async function generatePassword(e : React.FormEvent) {
        e.preventDefault();

        const url : string = `https://api.genratr.com/?length=${length}${includeUppercase ? '&uppercase' : ''}${includeLowercase ? '&lowercase' : ''}${includeSpecial ? '&special' : ''}${includeNumbers ? '&numbers' : ''}`;

        console.log(url);
        console.log(includeUppercase);
        console.log(includeLowercase);
        console.log(includeSpecial);
        console.log(includeNumbers);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to generate password');
            }

            const data = await response.json();
            setPassword(data.password);
        } catch(error) {
            console.error('Error generating password:', error);
        }
    }

    function handleButtonClick(type : buttonType) {
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

    function handleLengthChange({ target } : React.ChangeEvent<HTMLInputElement>) {
        setLength(Number(target.value));
    }

    return (
        <div className="generator">
            <div className="output">
                <h2 className="output-title">Generate</h2>
                
                <form>
                    <input readOnly value={password} placeholder='Generate the password...' type="text" />
                    <button className="copy-btn btn"><img src={copyImg} alt="copyImg" /></button>
                    <button onClick={generatePassword} className="generate-btn">Generate</button>
                </form>
            </div>

            <div className="conditions">
                <h2 className="conditions-title">Conditions</h2>

                <div className="password-conditions">
                    <input value={length} onChange={handleLengthChange} placeholder='Enter the length...' />

                    <div className="condition-buttons">
                        <ConditionButton active={includeUppercase} onClick={() => handleButtonClick('uppercase')}>ABC</ConditionButton>
                        <ConditionButton active={includeLowercase} onClick={() => handleButtonClick('lowercase')}>abc</ConditionButton>
                        <ConditionButton active={includeNumbers} onClick={() => handleButtonClick('numbers')}>123</ConditionButton>
                        <ConditionButton active={includeSpecial} onClick={() => handleButtonClick('special')}>!#@</ConditionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generator;