import './ConditionButton.scss';

//type
type ConditionButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean
}

function ConditionButton({ children, active, onClick } : ConditionButtonProps) {
    return <button onClick={onClick} className={`condition-btn ${active ? 'active' : ''}`}>{children}</button>
}

export default ConditionButton;