// styles
import './ConditionButton.scss';
import '../../theme.scss';

//type
interface ConditionButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean
    isLight?: boolean
}

function ConditionButton({ children, active, onClick, isLight } : ConditionButtonProps) {
    return <button onClick={onClick} className={`condition-btn ${active ? 'active' : ''} ${isLight ? 'light' : ''}`}>{children}</button>
}

export default ConditionButton;